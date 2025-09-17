import React from "react";
import { motion } from "framer-motion";

export default function BlogCard({
  blog,
  activeTag,
  bookmarks,
  likes,
  likedByMe,
  onToggleBookmark,
  onToggleLike,
  onCopyShareLink,
  onOpenModal,
  onSetActiveTag,
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.article
      id={`blog-${blog.id}`}
      className="blogCard group relative rounded-3xl overflow-hidden border-2 border-white/20 dark:border-slate-700/20 bg-gradient-to-br from-white/90 via-blue-50/60 to-purple-50/60 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-purple-900/20 shadow-xl hover:shadow-2xl backdrop-blur-xl flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ transform: 'translate(50%, -50%)' }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ transform: 'translate(-50%, 50%)' }}
        />
      </div>

      {/* Cover Image Section */}
      <div className="relative overflow-hidden">
        <motion.div
          variants={imageVariants}
          className="h-48 w-full"
        >
          <img
            src={blog.cover}
            alt={blog.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Bookmark Button */}
        <motion.button
          onClick={() => onToggleBookmark(blog.id)}
          className={`absolute top-4 right-4 rounded-full px-4 py-2 text-sm font-bold shadow-lg backdrop-blur-md transition-all duration-300 border border-white/20 ${
            bookmarks.has(blog.id)
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-yellow-500/25"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="flex items-center gap-1">
            <motion.span
              animate={bookmarks.has(blog.id) ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              🔖
            </motion.span>
            <span>{bookmarks.has(blog.id) ? "Saved" : "Save"}</span>
          </span>
        </motion.button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
            {blog.category}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 p-6 flex flex-col flex-1 space-y-4">
        {/* Author Info */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-10 h-10 rounded-full ring-2 ring-blue-200 dark:ring-blue-700 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              {blog.author.name}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-xs">
              {new Date(blog.date).toLocaleDateString()} • {blog.readTime} min read
            </span>
          </div>
        </motion.div>

        {/* Title and Excerpt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-xl line-clamp-2 mb-3 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {blog.tags.map((tag, index) => (
            <motion.button
              key={tag}
              onClick={() => onSetActiveTag(tag === activeTag ? "" : tag)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm transition-all duration-300 border ${
                activeTag === tag
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-blue-500/25"
                  : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex items-center gap-3 pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => onToggleLike(blog.id)}
            className={`group relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden border ${
              likedByMe.has(blog.id)
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 border-rose-500"
                : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/30 dark:hover:to-pink-900/30"
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="relative z-10 flex items-center gap-2">
              <motion.span
                animate={likedByMe.has(blog.id) ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-base"
              >
                ❤️
              </motion.span>
              <span className="text-sm">{likes[blog.id] || 0}</span>
            </span>
          </motion.button>

          <motion.button
            onClick={() => onCopyShareLink(blog.id)}
            className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-600"
            title="Copy share link"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="relative z-10 flex items-center gap-2">
              <motion.span 
                whileHover={{ rotate: 15 }}
                className="text-base"
              >
                🔗
              </motion.span>
              <span className="text-sm">Share</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Read More Button */}
        <motion.div 
          className="mt-auto pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => onOpenModal(blog)}
            className="group relative w-full px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
            style={{ 
              boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <motion.span 
                className="text-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📖
              </motion.span>
              <span>Read Article</span>
              <motion.span 
                className="group-hover:translate-x-1 transition-transform duration-300"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
    </motion.article>
  );
}