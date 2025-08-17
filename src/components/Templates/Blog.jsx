import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill, BsArrowRight, BsCalendar3, BsClock, BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Understanding React Hooks",
      excerpt: "Learn how React Hooks can transform your functional components with state and lifecycle features.",
      content: "React Hooks provide a powerful way to use state and other React features without writing a class. Introduced in React 16.8, Hooks have revolutionized the way developers build React applications.",
      author: "Jane Smith",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-10-15",
      readTime: "5 min read",
      category: "React",
      tags: ["react", "hooks", "frontend"]
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "Unlock the power of utility-first CSS with Tailwind to build modern, responsive designs faster.",
      content: "Tailwind CSS is a utility-first framework that provides low-level utility classes to build custom designs directly in your markup. Unlike traditional CSS frameworks, Tailwind doesn't impose design decisions, allowing you to create unique, responsive UIs without ever leaving your HTML. With features like JIT mode, dark mode support, and extensive customization options, Tailwind streamlines the development process while maintaining complete design flexibility.",
      author: "David Brown",
      imageUrl: "https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-10-10",
      readTime: "6 min read",
      category: "CSS",
      tags: ["tailwind", "css", "frontend", "styling"]
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      excerpt: "Master the modern JavaScript features that will make your code cleaner and more efficient.",
      content: "ECMAScript 6 (ES6) introduced several new features that make JavaScript development more efficient and enjoyable, including arrow functions, template literals, and destructuring.",
      author: "Alex Johnson",
      imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-10-05",
      readTime: "6 min read",
      category: "JavaScript",
      tags: ["javascript", "es6", "web"]
    },
    {
      id: 4,
      title: "The Benefits of TypeScript",
      excerpt: "How TypeScript can improve your JavaScript development experience and catch errors early.",
      content: "TypeScript, a superset of JavaScript, offers static type checking, which helps in catching errors early in the development process, enhancing code quality and developer productivity.",
      author: "Emily Davis",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      date: "2023-09-28",
      readTime: "7 min read",
      category: "TypeScript",
      tags: ["typescript", "javascript", "web"]
    },
    {
      id: 5,
      title: "Responsive Design with CSS Grid",
      excerpt: "Create flexible layouts with CSS Grid and make your websites look great on any device.",
      content: "CSS Grid Layout provides a two-dimensional grid-based layout system, making it easier to design web pages without having to use floats and positioning. It's a game-changer for responsive design.",
      author: "Michael Lee",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-09-20",
      readTime: "5 min read",
      category: "CSS",
      tags: ["css", "grid", "responsive"]
    },
    {
      id: 6,
      title: "Next.js for Server-Side Rendering",
      excerpt: "Leverage the power of Next.js to build fast, SEO-friendly React applications.",
      content: "Next.js is a powerful React framework that enables server-side rendering, static site generation, and more, making it a great choice for building modern web applications with excellent performance and SEO benefits.",
      author: "Samantha Green",
      imageUrl: "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-09-15",
      readTime: "8 min read",
      category: "React",
      tags: ["nextjs", "react", "ssr"]
    },
    {
      id: 7,
      title: "State Management in 2024: Beyond Redux",
      excerpt: "Explore modern state management solutions that are challenging Redux's dominance in the React ecosystem.",
      content: "The state management landscape has evolved significantly, with new libraries and patterns emerging to address Redux's verbosity. Solutions like Zustand, Jotai, and Recoil offer more intuitive APIs and better developer experience. This post compares these modern approaches, their use cases, and when you might choose them over traditional Redux. We'll also explore React's built-in state management capabilities and the future of state management in React 19.",
      author: "Michael Chen",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-09-10",
      readTime: "8 min read",
      category: "React",
      tags: ["react", "state", "frontend", "redux"]
    },
    {
      id: 8,
      title: "Building Accessible Web Applications",
      excerpt: "A comprehensive guide to implementing web accessibility (a11y) best practices in modern web applications.",
      content: "Web accessibility is no longer optional - it's a necessity. This post dives into the Web Content Accessibility Guidelines (WCAG) and shows how to implement them in your projects. Learn about semantic HTML, ARIA roles, keyboard navigation, color contrast, and screen reader compatibility. We'll also cover automated testing tools and how to conduct accessibility audits. Whether you're building a small personal site or a large-scale application, these practices will help you create more inclusive web experiences.",
      author: "Sarah Johnson",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-09-05",
      readTime: "10 min read",
      category: "Web Development",
      tags: ["accessibility", "a11y", "web", "frontend"]
    },
    {
      id: 9,
      title: "The Future of WebAssembly",
      excerpt: "How WebAssembly is revolutionizing web performance and what it means for the future of web development.",
      content: "WebAssembly (Wasm) is changing what's possible on the web by enabling near-native performance in the browser. This post explores real-world use cases, from gaming and video editing to scientific computing. We'll look at how major companies are using WebAssembly, the current state of the ecosystem, and what the future holds. Learn how to get started with WebAssembly using Rust, AssemblyScript, or C++, and see how it can work alongside your existing JavaScript codebase to deliver unprecedented performance.",
      author: "Carlos Mendez",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2023-08-28",
      readTime: "9 min read",
      category: "Web Development",
      tags: ["webassembly", "wasm", "performance", "web"]
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    imageUrl: "",
    category: "",
    tags: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "React", "JavaScript", "CSS", "TypeScript", "Web Development"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result);
      setNewPost(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlogPost = {
      ...newPost,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      readTime: newPost.content ? `${Math.ceil(newPost.content.split(' ').length / 200)} min read` : "2 min read",
      tags: newPost.tags.length ? newPost.tags : ['general'],
      description: newPost.excerpt || newPost.content.substring(0, 150) + '...'
    };

    setPosts([newBlogPost, ...posts]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      imageUrl: "",
      category: "",
      tags: []
    });
    setImageFile(null);
    setIsFormOpen(false);
  };

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The AnimateHub Blog
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Latest articles, tutorials, and insights on web development, design, and technology.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 transition-colors"
              onClick={() => setIsFormOpen(true)}
            >
              Write a Post <FiExternalLink className="text-lg" />
            </motion.button>
            <motion.a
              href="https://github.com/Premkolte/AnimateHub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <BsGithub className="text-xl" /> Contribute
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-gray-300 dark:hover:bg-secondary-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group bg-white dark:bg-secondary-800 rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 dark:border-secondary-700 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                layout
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <BsCalendar3 className="mr-1" />
                      <span>{post.date}</span>
                      <BsClock className="ml-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-secondary-700">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-secondary-600 overflow-hidden mr-3">
                        <BsFillPersonFill className="h-full w-full p-1.5 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <button
                      className="text-primary-600 dark:text-accent-500 hover:text-primary-800 dark:hover:text-accent-400 text-sm font-medium flex items-center transition-colors"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Read more
                      <BsArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-secondary-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h2>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newPost.title}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-900 text-gray-900 dark:text-white"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Excerpt (Short summary)
                    </label>
                    <input
                      type="text"
                      name="excerpt"
                      value={newPost.excerpt}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-900 text-gray-900 dark:text-white"
                      placeholder="A short summary of your post"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={newPost.content}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-3 border border-gray-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-900 text-gray-900 dark:text-white"
                      placeholder="Write your post content here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={newPost.author}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-900 text-gray-900 dark:text-white"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={newPost.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-900 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.filter(cat => cat !== 'All').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Featured Image
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="cursor-pointer bg-white dark:bg-secondary-900 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Upload an image</span>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="sr-only"
                          accept="image/*"
                          required={!newPost.imageUrl}
                        />
                      </label>
                      <p className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                        {imageFile ? 'Image selected' : 'PNG, JPG up to 5MB'}
                      </p>
                    </div>
                    {imageFile && (
                      <div className="mt-2">
                        <img
                          src={imageFile}
                          alt="Preview"
                          className="h-32 w-full object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-secondary-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Publish Post
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;





//               className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
