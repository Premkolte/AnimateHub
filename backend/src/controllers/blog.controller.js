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
