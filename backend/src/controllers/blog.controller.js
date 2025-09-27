import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Blog from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      // Fallback for comma-separated strings if JSON parsing fails
      return tags.split(",").map(tag => tag.trim()).filter(Boolean);
    }
  }
  return [];
};

export const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, tags } = req.body;
  const userId = req.user._id;

  if (!title?.trim() || !excerpt?.trim() || !content?.trim() || !category?.trim()) {
    throw new ApiError(400, "Title, excerpt, content, and category are required");
  }
  if (!req.file) throw new ApiError(400, "Blog image is required");

  let imageUrl;
  try {
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "animatehub/blog-images",
      width: 1200,
      height: 628,
      crop: "fill",
      format: "webp",
      quality: "auto",
      fetch_format: "auto",
    });
    imageUrl = result.secure_url;
  } catch (error) {
    console.error("Error uploading blog image:", error);
    throw new ApiError(500, "Error uploading blog image");
  }

  const newBlog = await Blog.create({
    title: title.trim(),
    excerpt: excerpt.trim(),
    content: content.trim(),
    author: userId,
    imageUrl,
    category: category.trim(),
    tags: parseTags(tags).map(tag => tag.trim()),
  });

  if (!newBlog) throw new ApiError(500, "Failed to create blog");

  return res
    .status(201)
    .json(new ApiResponse(201, "Blog created successfully", newBlog));
});

export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", "name email avatarUrl");

  if (!blog) throw new ApiError(404, "Blog not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog fetched successfully", blog));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) throw new ApiError(404, "Blog not found");
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog");
  }

  await blog.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog deleted successfully"));
});

export const getUserBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });

  if (!blogs?.length) throw new ApiError(404, "No blogs found for this user");

  return res
    .status(200)
    .json(new ApiResponse(200, "User blogs fetched successfully", blogs));
});

export const updateBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, category, tags } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, "Blog not found");
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this blog");
  }

  const updateData = {};
  if (title) updateData.title = title.trim();
  if (excerpt) updateData.excerpt = excerpt.trim();
  if (content) updateData.content = content.trim();
  if (category) updateData.category = category.trim();
  if (tags) updateData.tags = tags.map(tag => tag.trim());

  if (req.file) {
    try {
      if (blog.imageUrl) {
        const publicIdMatch = blog.imageUrl.match(/\/([^/]+)\.webp$/);
        if (publicIdMatch) {
          await cloudinary.uploader.destroy(`animatehub/blog-images/${publicIdMatch[1]}`);
        }
      }
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "animatehub/blog-images",
        width: 1200,
        height: 628,
        crop: "fill",
        format: "webp",
        quality: "auto",
        fetch_format: "auto",
      });
      updateData.imageUrl = result.secure_url;
    } catch (error) {
      console.error("Error uploading/deleting blog image:", error);
      throw new ApiError(500, "Error handling blog image");
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog updated successfully", updatedBlog));
});

// Add this new controller function
export const getBlogs = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 9,
    category,
    tags,
    search,
    sort = "newest",
    author
  } = req.query;

  // Build filter object
  const filter = {};

  // Category filter
  if (category && category !== "all") {
    filter.category = { $regex: new RegExp(category, "i") };
  }

  // Tags filter - support multiple tags
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(",");
    filter.tags = { $in: tagArray.map(tag => new RegExp(tag.trim(), "i")) };
  }

  // Search filter - search in title, excerpt, content
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filter.$or = [
      { title: searchRegex },
      { excerpt: searchRegex },
      { content: searchRegex },
      { tags: { $in: [searchRegex] } }
    ];
  }

  // Author filter
  if (author) {
    filter.author = author;
  }

  // Build sort object
  let sortObject = {};
  switch (sort) {
    case "oldest":
      sortObject = { createdAt: 1 };
      break;
    case "likes":
      sortObject = { likes: -1, createdAt: -1 };
      break;
    case "title":
      sortObject = { title: 1 };
      break;
    case "newest":
    default:
      sortObject = { createdAt: -1 };
      break;
  }

  // Calculate pagination
  const pageNumber = Math.max(1, parseInt(page));
  const pageSize = Math.min(50, Math.max(1, parseInt(limit))); // Max 50 items per page
  const skip = (pageNumber - 1) * pageSize;

  try {
    // Execute queries in parallel
    const [blogs, totalBlogs, categories, popularTags] = await Promise.all([
      // Get paginated blogs
      Blog.find(filter)
        .populate("author", "name username email avatarUrl")
        .select("-content") // Exclude full content for feed view
        .sort(sortObject)
        .skip(skip)
        .limit(pageSize)
        .lean(),
      
      // Get total count for pagination
      Blog.countDocuments(filter),
      
      // Get all categories for filters
      Blog.distinct("category"),
      
      // Get popular tags
      Blog.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
        { $project: { tag: "$_id", count: 1, _id: 0 } }
      ])
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalBlogs / pageSize);
    const hasNextPage = pageNumber < totalPages;
    const hasPrevPage = pageNumber > 1;

    // Format blogs data
    const formattedBlogs = blogs.map(blog => ({
      _id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      author: {
        _id: blog.author._id,
        name: blog.author.name || blog.author.username,
        username: blog.author.username,
        email: blog.author.email,
        avatarUrl: blog.author.avatarUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(blog.author.name || blog.author.username || "User")}`
      },
      imageUrl: blog.imageUrl,
      date: blog.date || blog.createdAt,
      readTime: blog.readTime || `${Math.max(2, Math.round((blog.content || "").split(/\s+/).filter(Boolean).length / 200))} min read`,
      category: blog.category,
      tags: blog.tags || [],
      likesCount: blog.likes?.length || 0,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt
    }));

    const responseData = {
      blogs: formattedBlogs,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalBlogs,
        pageSize,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? pageNumber + 1 : null,
        prevPage: hasPrevPage ? pageNumber - 1 : null
      },
      filters: {
        categories: categories.filter(Boolean).sort(),
        popularTags: popularTags.map(item => item.tag).filter(Boolean),
        appliedFilters: {
          category: category || null,
          tags: tags ? (Array.isArray(tags) ? tags : tags.split(",")) : [],
          search: search || null,
          sort,
          author: author || null
        }
      },
      meta: {
        totalResults: totalBlogs,
        resultsOnThisPage: formattedBlogs.length,
        searchQuery: search || null,
        hasFilters: !!(category || tags || search || author)
      }
    };

    return res.status(200).json(
      new ApiResponse(200, "Blogs fetched successfully", responseData)
    );

  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new ApiError(500, "Error fetching blogs");
  }
});

// Add this controller to get blog statistics
export const getBlogStats = asyncHandler(async (req, res) => {
  try {
    const [totalBlogs, totalAuthors, categoriesWithCount, tagsWithCount] = await Promise.all([
      Blog.countDocuments(),
      Blog.distinct("author").then(authors => authors.length),
      Blog.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { category: "$_id", count: 1, _id: 0 } }
      ]),
      Blog.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 30 },
        { $project: { tag: "$_id", count: 1, _id: 0 } }
      ])
    ]);

    const stats = {
      totalBlogs,
      totalAuthors,
      totalCategories: categoriesWithCount.length,
      totalTags: tagsWithCount.length,
      categories: categoriesWithCount,
      popularTags: tagsWithCount
    };

    return res.status(200).json(
      new ApiResponse(200, "Blog statistics fetched successfully", stats)
    );

  } catch (error) {
    console.error("Error fetching blog stats:", error);
    throw new ApiError(500, "Error fetching blog statistics");
  }
});
