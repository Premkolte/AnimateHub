import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

// Normalize tags to array<string>
function normalizeTags(raw) {
  if (Array.isArray(raw))
    return raw.filter((t) => typeof t === "string" && t.trim()).map((t) => t.trim());
  if (typeof raw === "string")
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  if (raw && typeof raw === "object") {
    const vals = Object.values(raw).filter((v) => typeof v === "string");
    return vals.map((v) => v.trim()).filter(Boolean);
  }
  return [];
}

// Build API endpoint ensuring no double /api or slashes
function buildApi(path) {
  const base = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
  if (/\/api$/i.test(base)) {
    return `${base}${path.startsWith("/") ? path : "/" + path}`;
  }
  return `${base}/api${path.startsWith("/") ? path : "/" + path}`;
}

export default function AddBlogPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    category: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert("Image must be under 4MB.");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to create a blog post");
      navigate("/sign-in");
      return;
    }
    if (!imageFile) {
      alert("Please select a blog image");
      return;
    }

    const title = newBlog.title.trim();
    const excerpt = newBlog.excerpt.trim();
    const content = newBlog.content.trim();
    const category = newBlog.category.trim() || "Community";
    let tagsArray = normalizeTags(newBlog.tags);
    if (!tagsArray.length) tagsArray = ["Community"];

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("blog-image", imageFile);

      const endpoint = buildApi("/blogs/create");
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        alert("Blog created successfully!");
        navigate("/blogs");
      } else {
        throw new Error(response.data.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to create blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-10 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 text-white relative overflow-hidden rounded-3xl shadow-2xl mb-6">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">✍️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Create a New Blog</h1>
              <p className="text-blue-100 text-sm">
                Share your knowledge with the community
              </p>
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
          <div className="space-y-1">
            <label className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Blog Title *
            </label>
            <input
              required
              placeholder="Enter your blog title..."
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Short Excerpt *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Brief description..."
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all resize-none"
              value={newBlog.excerpt}
              onChange={(e) =>
                setNewBlog({ ...newBlog, excerpt: e.target.value })
              }
            />
          </div>

            <div className="space-y-1">
            <label className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full" />
              Blog Content *
            </label>
            <textarea
              required
              rows={8}
              placeholder="Write your full blog content (Markdown supported)..."
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 transition-all resize-none"
              value={newBlog.content}
              onChange={(e) =>
                setNewBlog({ ...newBlog, content: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Category
              </label>
              <input
                placeholder="e.g., CSS, GSAP, Three.js..."
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all"
                value={newBlog.category}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                Tags
              </label>
              <input
                placeholder="css, animation, gsap"
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                value={newBlog.tags}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, tags: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full" />
              Blog Image *
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border-2 border-slate-200 dark:border-slate-600"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                <span>🚀</span>
                <span>{loading ? "Publishing..." : "Publish Blog"}</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}