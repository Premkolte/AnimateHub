import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";

export const addComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  if (!text?.trim()) {
    throw new ApiError(400, "Comment text is required");
  }

  // check blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  const comment = await Comment.create({
    blog: blogId,
    user: userId,
    text: text.trim(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Comment added successfully", comment));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { blogId, commentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findOne({ _id: commentId, blog: blogId });
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  // only owner of comment OR author of blog can delete
  if (
    comment.user.toString() !== userId.toString() &&
    blog.author.toString() !== userId.toString()
  ) {
    throw new ApiError(
      403,
      "You are not authorized to delete this comment"
    );
  }

  await comment.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});


export const updateComment = asyncHandler(async (req, res) => {
  const { blogId, commentId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  if (!text?.trim()) {
    throw new ApiError(400, "Updated text is required");
  }

  // check blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const comment = await Comment.findOne({ _id: commentId, blog: blogId });
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // only owner of comment can update
  if (comment.user.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  comment.text = text.trim();
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", comment));
});

//Get All Comments on a Blog Post
export const getAllCommentsOnPost = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  // check blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const totalComments = await Comment.countDocuments({ blog: blogId });

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "username avatarUrl")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return res.status(200).json(
    new ApiResponse(200, "Comments fetched successfully", {
      comments,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: Number(page),
    })
  );
});
