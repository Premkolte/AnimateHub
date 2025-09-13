import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LS_BLOGS = "ah_blogs_v1";

function getLS(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function AddBlogPage() {
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    category: "",
    author: "",
    cover: "",
  });

  const submitBlog = (e) => {
    e.preventDefault();
    const blogs = getLS(LS_BLOGS, []);
    const id = (blogs.reduce((m, b) => Math.max(m, b.id), 0) || 0) + 1;
    const now = new Date().toISOString().slice(0, 10);
    const tags = newBlog.tags.split(",").map(t => t.trim()).filter(Boolean);
    const authorName = newBlog.author.trim() || "Guest Author";
    const item = {
      id,
      title: newBlog.title.trim(),
      excerpt: newBlog.excerpt.trim(),
      content: newBlog.content.trim(),
      tags: tags.length ? tags : ["Community"],
      category: newBlog.category.trim() || "Community",
      author: {
        name: authorName,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(authorName)}`,
      },
      date: now,
      readTime: Math.max(2, Math.round(newBlog.content.split(/\s+/).length / 180)),
      cover:
        newBlog.cover.trim() ||
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1400&auto=format&fit=crop",
    };
    setLS(LS_BLOGS, [item, ...blogs]);
    navigate("/blogs");
  };

  return (
    <div className="min-h-screen w-full py-10 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 text-white relative overflow-hidden rounded-3xl shadow-2xl mb-6">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">✍️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Create a New Blog</h1>
              <p className="text-blue-100 text-sm">Share your knowledge with the community</p>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="ml-auto w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
              title="Back"
            >
              <span className="text-white text-base font-bold">×</span>
            </button>
          </div>
        </div>

        <form
          onSubmit={submitBlog}
          className="bg-gradient-to-br from-white/95 via-blue-50/50 to-purple-50/50 dark:from-slate-900/95 dark:via-slate-800/50 dark:to-purple-900/20 rounded-3xl shadow-2xl border-4 border-transparent backdrop-blur-xl overflow-hidden p-4 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Blog Title *
              </label>
              <input
                required
                placeholder="Enter your blog title..."
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Author Name
              </label>
              <input
                placeholder="Your name (optional)"
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Category
              </label>
              <input
                placeholder="e.g., CSS, GSAP, Three.js..."
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={newBlog.category}
                onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Tags
              </label>
              <input
                placeholder="css, animation, gsap"
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={newBlog.tags}
                onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Cover Image URL
            </label>
            <input
              placeholder="https://example.com/image.jpg (optional)"
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={newBlog.cover}
              onChange={(e) => setNewBlog({ ...newBlog, cover: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Short Excerpt *
            </label>
            <textarea
              required
              placeholder="Write a brief description of your blog..."
              rows={2}
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
              value={newBlog.excerpt}
              onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
            />
          </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                Blog Content *
              </label>
              <textarea
                required
                placeholder="Write your full blog content here... (Markdown supported)"
                rows={5}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              />
            </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              type="submit"
            >
              <span className="flex items-center gap-2">
                <span>🚀</span>
                <span>Publish Blog</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}