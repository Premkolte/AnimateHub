import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Blog from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, tags } = req.body;
  const userId = req.user._id;

 
  if (!title?.trim() || !excerpt?.trim() || !content?.trim() || !category?.trim()) {
    throw new ApiError(400, "Title, excerpt, content, and category are required");
  }

  if (!req.file) {
    throw new ApiError(400, "Blog image is required");
  }

  let imageUrl = "";

  try {
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
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
    tags: tags?.map((tag) => tag.trim()) || [],
  });

  if (!newBlog) {
    throw new ApiError(500, "Failed to create blog");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Blog created successfully", newBlog));
});

export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate("author", "name email avatarUrl ");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog fetched successfully", blog));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  // Author check (sirf jisne create kiya, wahi delete kar sake)
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog");
  }

  await blog.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog deleted successfully"));
});

export const getUserBlogs = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });

  if (!blogs || blogs.length === 0) {
    throw new ApiError(404, "No blogs found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User blogs fetched successfully", blogs));
});

export const updateBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, category, tags } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, "Blog not found");

  // Author check
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this blog");
  }

  const updateData = {};
  if (title) updateData.title = title.trim();
  if (excerpt) updateData.excerpt = excerpt.trim();
  if (content) updateData.content = content.trim();
  if (category) updateData.category = category.trim();
  if (tags) updateData.tags = tags.map(tag => tag.trim());

  // Optional image update
  if (req.file) {
    try {
      // Delete old image from Cloudinary if exists
      if (blog.imageUrl) {
        const publicIdMatch = blog.imageUrl.match(/\/([^/]+)\.webp$/);
        if (publicIdMatch) {
          const publicId = `animatehub/blog-images/${publicIdMatch[1]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // 2️ Upload new image
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
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
