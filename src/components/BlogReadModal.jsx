import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogReadModal({
  blog,
  onClose,
  likes,
  likedByMe,
  bookmarks,
  comments,
  newComment,
  setNewComment,
  toggleLike,
  toggleBookmark,
  copyShareLink,
  submitComment,
  deleteComment,
}) {
  return (
    <AnimatePresence>
      {blog && (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -20, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] bg-gradient-to-br from-white/95 via-blue-50/50 to-purple-50/50 dark:from-slate-900/95 dark:via-slate-800/50 dark:to-purple-900/20 rounded-3xl overflow-hidden border-4 border-transparent shadow-2xl backdrop-blur-xl"
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">📖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Blog Post</h3>
                    <p className="text-blue-100 text-sm">Reading experience</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  title="Close"
                >
                  <span className="text-white text-base font-bold">×</span>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(85vh-120px)]">
              <div className="relative">
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="h-48 sm:h-56 md:h-64 w-full object-cover"
                  style={{ borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }}
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-10 h-10 rounded-full ring-2 ring-blue-200 dark:ring-blue-700"
                    />
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {blog.author.name}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {new Date(blog.date).toLocaleDateString()} • {blog.readTime} min read
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleLike(blog.id)}
                      className={`group relative px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden ${
                        likedByMe.has(blog.id)
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-rose-500/25"
                          : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900 dark:hover:to-pink-900"
                      }`}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <span className="relative z-10 flex items-center gap-1">
                        <span
                          className={`transition-transform duration-300 ${
                            likedByMe.has(blog.id)
                              ? "group-hover:scale-125"
                              : "group-hover:scale-110"
                          }`}
                        >
                          ❤️
                        </span>
                        <span className="font-semibold">{likes[blog.id] || 0}</span>
                      </span>
                    </button>
                    <button
                      onClick={() => toggleBookmark(blog.id)}
                      className={`group relative px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden ${
                        bookmarks.has(blog.id)
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg hover:shadow-yellow-500/25"
                          : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-900 dark:hover:to-yellow-800"
                      }`}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <span className="relative z-10 flex items-center gap-1">
                        <span className="group-hover:rotate-12 transition-transform duration-300">
                          🔖
                        </span>
                        <span>{bookmarks.has(blog.id) ? "Saved" : "Save"}</span>
                      </span>
                    </button>
                    <button
                      onClick={() => copyShareLink(blog.id)}
                      className="group relative px-3 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-300 hover:scale-105 overflow-hidden"
                      title="Copy share link"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <span className="relative z-10 flex items-center gap-1">
                        <span className="group-hover:rotate-12 transition-transform duration-300">
                          🔗
                        </span>
                        <span>Share</span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    {blog.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-700"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <article className="prose dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed">
                  {blog.content.split("\n").map((p, i) => (
                    <p key={i} className="mb-4 text-slate-700 dark:text-slate-200">
                      {p}
                    </p>
                  ))}
                </article>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    Comments
                  </h4>
                  <div className="space-y-4 mb-6">
                    {(comments[blog.id] || []).map((c) => (
                      <div
                        key={c.ts}
                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {c.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap mt-1">
                            {c.text}
                          </div>
                          <div className="text-xs text-slate-500 mt-2">
                            {new Date(c.ts).toLocaleString()}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteComment(blog.id, c.ts)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 text-rose-700 dark:text-rose-300 hover:from-rose-200 hover:to-pink-200 dark:hover:from-rose-800 dark:hover:to-pink-800 transition-all duration-300 self-start sm:self-auto"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {!((comments[blog.id] || []).length) && (
                      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <div className="text-4xl mb-2">💭</div>
                        <p className="text-sm">No comments yet — be first!</p>
                      </div>
                    )}
                  </div>
                  <form
                    onSubmit={submitComment}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600"
                  >
                    <input
                      required
                      placeholder="Your name"
                      className="sm:col-span-2 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Write a comment…"
                      className="sm:col-span-3 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                      value={newComment.text}
                      onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    />
                    <div className="sm:col-span-5 flex justify-end">
                      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <span className="flex items-center gap-2">
                          <span>📝</span>
                          <span>Post Comment</span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}