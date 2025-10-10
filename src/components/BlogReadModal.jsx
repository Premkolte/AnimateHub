import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function normalizeTags(raw) {
  if (Array.isArray(raw))
    return raw.filter(t => typeof t === "string" && t.trim()).map(t => t.trim());
  if (typeof raw === "string") {
    try {
      if (/^\s*\[.*\]\s*$/.test(raw)) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return normalizeTags(parsed);
      }
    } catch { }
    return raw.split(",").map(t => t.trim()).filter(Boolean);
  }
  if (raw && typeof raw === "object") {
    return Object.values(raw)
      .filter(v => typeof v === "string")
      .map(v => v.trim())
      .filter(Boolean);
  }
  return [];
}

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

  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = () => setIsMaximized(prev => !prev);

  if (!blog) return null;
  const safeTags = normalizeTags(blog.tags);

  const renderContent = (content) => {
    const paragraphs = content.split("\n").filter(p => p.trim());

    return paragraphs.map((paragraph, index) => {
      if (paragraph.includes("```")) {
        const codeMatch = paragraph.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (codeMatch) {
          return (
            <motion.div
              key={index}
              className="my-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-4 border border-slate-700 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {codeMatch[1] || "Code"}
                  </span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(codeMatch[2])}
                    className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-sm text-green-400 font-mono overflow-x-auto">
                  <code>{codeMatch[2]}</code>
                </pre>
              </div>
            </motion.div>
          );
        }
      }

      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n").filter(item => item.startsWith("- "));
        return (
          <motion.ul
            key={index}
            className="my-4 space-y-2 pl-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-700 dark:text-slate-200"
              >
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="leading-relaxed">
                  {item.replace("- ", "")}
                </span>
              </li>
            ))}
          </motion.ul>
        );
      }

      if (paragraph.startsWith("#")) {
        const level = paragraph.match(/^#+/)[0].length;
        const text = paragraph.replace(/^#+\s*/, "");
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="my-6"
          >
            {level === 1 && (
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                {text}
              </h1>
            )}
            {level === 2 && (
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {text}
              </h2>
            )}
            {level === 3 && (
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
                {text}
              </h3>
            )}
          </motion.div>
        );
      }

      const formatText = (txt) => {
        txt = txt.replace(
          /`([^`]+)`/g,
          '<code class="bg-slate-200 dark:bg-slate-700 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-mono">$1</code>'
        );
        txt = txt.replace(
          /\*\*([^*]+)\*\*/g,
          '<strong class="font-bold text-slate-800 dark:text-slate-100">$1</strong>'
        );
        txt = txt.replace(
          /\*([^*]+)\*/g,
          '<em class="italic text-slate-600 dark:text-slate-300">$1</em>'
        );
        return txt;
      };

      return (
        <motion.p
          key={index}
          className={`text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200 mb-4 ${index === 0
            ? "first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 dark:first-letter:text-blue-400 first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:mt-1"
            : ""
            }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 + index * 0.1 }}
          dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
        />
      );
    });
  };

  return (
    <AnimatePresence>
      {blog && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            //animate={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: isMaximized ? 1.22 : 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="relative z-10 w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white/98 via-blue-50/80 to-purple-50/80 dark:from-slate-900/98 dark:via-slate-800/90 dark:to-purple-900/30 rounded-3xl overflow-hidden border-2 border-white/30 dark:border-slate-700/50 shadow-2xl backdrop-blur-2xl"
          >
            <motion.div
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 sm:p-5 text-white relative overflow-hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transform: "translate(50%, -50%)" }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full"
                  animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{ transform: "translate(-50%, 50%)" }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                {/* Left side: Icon + Title */}
                <motion.div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <motion.span
                      className="text-2xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📖
                    </motion.span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Blog Reader</h3>
                    <p className="text-blue-100 text-sm">Immersive reading experience</p>
                  </div>
                </motion.div>

                {/* Right side: Buttons */}
                <div className="flex items-center gap-2">
                  {/* Maximize/Minimize button */}
                  <motion.button
                    onClick={toggleMaximize}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20"
                    title={isMaximized ? "Minimize" : "Maximize"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMaximized ? "🗕" : "🗖"}
                  </motion.button>

                  {/* Close button */}
                  <motion.button
                    onClick={onClose} F
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20"
                    title="Close"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>
              </div>

            </motion.div>

            <div className="overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)] custom-scrollbar">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="h-40 sm:h-52 md:h-60 lg:h-72 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 text-white">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-10 h-10 rounded-full ring-2 ring-white/50"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-base">
                          {blog.author.name}
                        </div>
                        <div className="text-sm opacity-90">
                          {new Date(blog.date).toLocaleDateString()} •{" "}
                          {blog.readTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                <motion.div
                  className="space-y-6 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {safeTags.length ? (
                      safeTags.map((tag, index) => (
                        <motion.span
                          key={tag + index}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-700 text-sm backdrop-blur-sm shadow-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          #{tag}
                        </motion.span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">
                        No tags
                      </span>
                    )}
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-3 justify-center pt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button
                      onClick={() => toggleLike(blog.id)}
                      className={`group relative px-5 py-3 rounded-2xl font-semibold transition-all duration-300 overflow-hidden min-w-[120px] ${likedByMe.has(blog.id)
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25"
                        : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/50 dark:hover:to-pink-900/50"
                        }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <motion.span
                          animate={
                            likedByMe.has(blog.id)
                              ? { scale: [1, 1.3, 1] }
                              : {}
                          }
                          transition={{ duration: 0.3 }}
                        >
                          ❤️
                        </motion.span>
                        <span>{likes[blog.id] || 0} Likes</span>
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => toggleBookmark(blog.id)}
                      className={`group relative px-5 py-3 rounded-2xl font-semibold transition-all duration-300 overflow-hidden min-w-[120px] ${bookmarks.has(blog.id)
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                        : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-900/50 dark:hover:to-yellow-800/50"
                        }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <motion.span
                          animate={{
                            rotate: bookmarks.has(blog.id)
                              ? [0, 15, -15, 0]
                              : 0
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          🔖
                        </motion.span>
                        <span>
                          {bookmarks.has(blog.id) ? "Saved" : "Save"}
                        </span>
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => copyShareLink(blog.id)}
                      className="group relative px-5 py-3 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all duration-300 overflow-hidden min-w-[120px]"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <motion.span whileHover={{ rotate: 15 }}>
                          🔗
                        </motion.span>
                        <span>Share</span>
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>

                <motion.article
                  className="prose dark:prose-invert max-w-none"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm shadow-lg">
                    <div className="prose-lg prose-slate dark:prose-invert max-w-none">
                      {renderContent(blog.content)}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm ml-2">End of Article</span>
                      </div>
                    </div>
                  </div>
                </motion.article>

                <motion.div
                  className="pt-8 border-t-2 border-slate-200 dark:border-slate-700"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <span className="text-2xl">💬</span>
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100">
                        Discussion
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        {(comments[blog.id] || []).length} comment
                        {(comments[blog.id] || []).length !== 1 ? "s" : ""} •
                        Join the conversation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {(comments[blog.id] || []).map((comment, index) => (
                      <motion.div
                        key={comment.ts}
                        className="p-5 rounded-2xl bg-gradient-to-r from-white/90 to-blue-50/90 dark:from-slate-800/90 dark:to-slate-700/90 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        whileHover={{ y: -3 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                {comment.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800 dark:text-slate-100">
                                  {comment.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {new Date(comment.ts).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words leading-relaxed">
                              {comment.text}
                            </div>
                          </div>
                          <motion.button
                            onClick={() => deleteComment(blog.id, comment.ts)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 text-rose-700 dark:text-rose-300 hover:from-rose-200 hover:to-pink-200 dark:hover:from-rose-800/50 dark:hover:to-pink-800/50 transition-all duration-300 text-sm self-start shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            🗑️ Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}

                    {!((comments[blog.id] || []).length) && (
                      <motion.div
                        className="text-center py-16 text-slate-500 dark:text-slate-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        <motion.div
                          className="text-8xl mb-6"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          💭
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">
                          No comments yet
                        </h3>
                        <p className="text-lg">
                          Be the first to share your thoughts on this article!
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <motion.form
                    onSubmit={submitComment}
                    className="p-6 rounded-2xl bg-gradient-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-slate-700/90 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <h5 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span>✍️</span>
                      <span>Add Your Comment</span>
                    </h5>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.input
                          required
                          placeholder="Your name"
                          className="px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm font-medium"
                          value={newComment.name}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              name: e.target.value
                            })
                          }
                          whileFocus={{ scale: 1.02 }}
                        />
                        <motion.input
                          required
                          placeholder="Share your thoughts..."
                          className="px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                          value={newComment.text}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              text: e.target.value
                            })
                          }
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      <div className="flex justify-end">
                        <motion.button
                          type="submit"
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: [0, 15, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              🚀
                            </motion.span>
                            <span>Post Comment</span>
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}