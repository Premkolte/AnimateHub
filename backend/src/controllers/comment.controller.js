
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";

// Helper: check blog existence
const ensureBlogExists = async (blogId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");
  return blog;
};

// Helper: check comment existence (scoped to blog)
const ensureCommentExists = async (commentId, blogId) => {
  const comment = await Comment.findOne({ _id: commentId, blog: blogId });
  if (!comment) throw new ApiError(404, "Comment not found");
  return comment;
};

export const addComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  if (!text?.trim()) throw new ApiError(400, "Comment text is required");

  await ensureBlogExists(blogId);

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

  const [comment, blog] = await Promise.all([
    ensureCommentExists(commentId, blogId),
    ensureBlogExists(blogId),
  ]);

  // Only owner of comment OR author of blog can delete
  const isOwner = comment.user.toString() === userId.toString();
  const isBlogAuthor = blog.author.toString() === userId.toString();
  if (!isOwner && !isBlogAuthor) {
    throw new ApiError(403, "You are not authorized to delete this comment");
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

  if (!text?.trim()) throw new ApiError(400, "Updated text is required");

  await ensureBlogExists(blogId);
  const comment = await ensureCommentExists(commentId, blogId);

  // Only owner of comment can update
  if (comment.user.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  comment.text = text.trim();
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", comment));
});

export const getAllCommentsOnPost = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);

  await ensureBlogExists(blogId);

  const totalComments = await Comment.countDocuments({ blog: blogId });

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "username avatarUrl")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(200, "Comments fetched successfully", {
      comments,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: page,
    })
  );
});
