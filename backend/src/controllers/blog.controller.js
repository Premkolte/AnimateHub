import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Blog from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";

/**
 * @desc Parse tags input into a clean array
 * @param {string|array} tags
 * @returns {string[]}
 */
const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    }
  }
  return [];
};

/**
 * @desc Helper to upload blog image to Cloudinary
 */
const uploadBlogImage = async (file) => {
  const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "animatehub/blog-images",
    width: 1200,
    height: 628,
    crop: "fill",
    format: "webp",
    quality: "auto",
    fetch_format: "auto",
  });
  return result.secure_url;
};

/**
 * @desc Create a new blog
 * @route POST /api/blogs
 * @access Private
 */
export const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, tags } = req.body;
  const userId = req.user._id;

  if (!title?.trim() || !excerpt?.trim() || !content?.trim() || !category?.trim()) {
    throw new ApiError(400, "Title, excerpt, content, and category are required");
  }

  if (!req.file) {
    throw new ApiError(400, "Blog image is required");
  }

  let imageUrl;
  try {
    imageUrl = await uploadBlogImage(req.file);
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
    tags: parseTags(tags).map((tag) => tag.trim()),
  });

  if (!newBlog) throw new ApiError(500, "Failed to create blog");

  return res.status(201).json(
    new ApiResponse(201, "Blog created successfully", newBlog)
  );
});

/**
 * @desc Get a blog by ID
 * @route GET /api/blogs/:id
 * @access Public
 */
export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", "name email avatarUrl");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Blog fetched successfully", blog)
  );
});

/**
 * @desc Delete a blog
 * @route DELETE /api/blogs/:id
 * @access Private
 */
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog");
  }

  await blog.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, "Blog deleted successfully")
  );
});

/**
 * @desc Get blogs authored by the current user
 * @route GET /api/blogs/user
 * @access Private
 */
export const getUserBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });

  if (!blogs?.length) {
    throw new ApiError(404, "No blogs found for this user");
  }

  return res.status(200).json(
    new ApiResponse(200, "User blogs fetched successfully", blogs)
  );
});

/**
 * @desc Update a blog by ID
 * @route PATCH /api/blogs/:id
 * @access Private
 */
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
  if (tags) updateData.tags = parseTags(tags).map((tag) => tag.trim());

  if (req.file) {
    try {
      // Delete old image if exists
      if (blog.imageUrl) {
        const match = blog.imageUrl.match(/\/([^/]+)\.webp$/);
        if (match) {
          await cloudinary.uploader.destroy(`animatehub/blog-images/${match[1]}`);
        }
      }
      updateData.imageUrl = await uploadBlogImage(req.file);
    } catch (error) {
      console.error("Error handling blog image:", error);
      throw new ApiError(500, "Error handling blog image");
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(
    new ApiResponse(200, "Blog updated successfully", updatedBlog)
  );
});

/**
 * @desc Get all blogs with filters, pagination, and sorting
 * @route GET /api/blogs
 * @access Public
 */
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

  // Build filters
  const filter = {};
  if (category && category !== "all") {
    filter.category = { $regex: new RegExp(category, "i") };
  }
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(",");
    filter.tags = { $in: tagArray.map((tag) => new RegExp(tag.trim(), "i")) };
  }
  if (search?.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filter.$or = [
      { title: searchRegex },
      { excerpt: searchRegex },
      { content: searchRegex },
      { tags: { $in: [searchRegex] } },
    ];
  }
  if (author) filter.author = author;

  // Sorting
  const sortObject = {
    oldest: { createdAt: 1 },
    likes: { likes: -1, createdAt: -1 },
    title: { title: 1 },
    newest: { createdAt: -1 },
  }[sort] || { createdAt: -1 };

  // Pagination
  const pageNumber = Math.max(1, parseInt(page));
  const pageSize = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNumber - 1) * pageSize;

  try {
    const [blogs, totalBlogs, categories, popularTags] = await Promise.all([
      Blog.find(filter)
        .populate("author", "name username email avatarUrl")
        .select("-content")
        .sort(sortObject)
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Blog.countDocuments(filter),
      Blog.distinct("category"),
      Blog.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
        { $project: { tag: "$_id", count: 1, _id: 0 } },
      ]),
    ]);

    const totalPages = Math.ceil(totalBlogs / pageSize);

    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      author: {
        _id: blog.author._id,
        name: blog.author.name || blog.author.username,
        username: blog.author.username,
        email: blog.author.email,
        avatarUrl:
          blog.author.avatarUrl ||
          `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
            blog.author.name || blog.author.username || "User"
          )}`,
      },
      imageUrl: blog.imageUrl,
      date: blog.date || blog.createdAt,
      readTime:
        blog.readTime ||
        `${Math.max(
          2,
          Math.round((blog.content || "").split(/\s+/).filter(Boolean).length / 200)
        )} min read`,
      category: blog.category,
      tags: blog.tags || [],
      likesCount: blog.likes?.length || 0,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    return res.status(200).json(
      new ApiResponse(200, "Blogs fetched successfully", {
        blogs: formattedBlogs,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalBlogs,
          pageSize,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
          nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
          prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        },
        filters: {
          categories: categories.filter(Boolean).sort(),
          popularTags: popularTags.map((item) => item.tag).filter(Boolean),
          appliedFilters: {
            category: category || null,
            tags: tags ? (Array.isArray(tags) ? tags : tags.split(",")) : [],
            search: search || null,
            sort,
            author: author || null,
          },
        },
        meta: {
          totalResults: totalBlogs,
          resultsOnThisPage: formattedBlogs.length,
          searchQuery: search || null,
          hasFilters: !!(category || tags || search || author),
        },
      })
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new ApiError(500, "Error fetching blogs");
  }
});

/**
 * @desc Get blog statistics
 * @route GET /api/blogs/stats
 * @access Public/Admin
 */
export const getBlogStats = asyncHandler(async (req, res) => {
  try {
    const [totalBlogs, totalAuthors, categoriesWithCount, tagsWithCount] = await Promise.all([
      Blog.countDocuments(),
      Blog.distinct("author").then((authors) => authors.length),
      Blog.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { category: "$_id", count: 1, _id: 0 } },
      ]),
      Blog.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 30 },
        { $project: { tag: "$_id", count: 1, _id: 0 } },
      ]),
    ]);

    const stats = {
      totalBlogs,
      totalAuthors,
      totalCategories: categoriesWithCount.length,
      totalTags: tagsWithCount.length,
      categories: categoriesWithCount,
      popularTags: tagsWithCount,
    };

    return res.status(200).json(
      new ApiResponse(200, "Blog statistics fetched successfully", stats)
    );
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    throw new ApiError(500, "Error fetching blog statistics");
  }
});
