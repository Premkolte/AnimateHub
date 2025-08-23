import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // auto adds createdAt, updatedAt
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
