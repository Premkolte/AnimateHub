import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import BlogReadModal from "../components/BlogReadModal";
import BlogCard from "../components/BlogCard";
import axios from "axios";

// --- Demo Seed Data (as provided in your reference) ---
const seedBlogsData = [
  {
    id: "seed-1",
    title: "Mastering CSS Keyframe Animations",
    excerpt: "Learn how to craft smooth, performant CSS animations with keyframes, easing, and GPU-friendly tricks.",
    content: "CSS animations can be both elegant and efficient...",
    tags: ["CSS", "Tutorial", "Performance"],
    category: "CSS",
    author: { name: "Ava Motion", avatar: "https://i.pravatar.cc/80?img=12" },
    date: "2025-08-12",
    readTime: 6,
    cover: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "seed-2",
    title: "GSAP Timeline Magic: Complex Sequences Made Simple",
    excerpt: "Build orchestrated motion using GSAP timelines: staggering, labels, and reusable sequences.",
    content: "GSAP Timelines let you coordinate complex motion with ease...",
    tags: ["GSAP", "Timeline", "Tutorial"],
    category: "GSAP",
    author: { name: "Dev Ray", avatar: "https://i.pravatar.cc/80?img=5" },
    date: "2025-08-10",
    readTime: 7,
    cover: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "seed-3",
    title: "Intro to Three.js: Orbiting Planets Scene",
    excerpt: "Get started with Three.js by building a tiny solar system with lights, textures and orbits.",
    content: "We’ll spin up a minimal scene with renderer, camera, and a few Meshes...",
    tags: ["Three.js", "WebGL", "Beginner"],
    category: "Three.js",
    author: { name: "Luna Park", avatar: "https://i.pravatar.cc/80?img=7" },
    date: "2025-08-05",
    readTime: 9,
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "seed-4",
    title: "Animation of the Week: Card Flip Showcase",
    excerpt: "A delightful card-flip effect using perspective, preserve-3d and backface-visibility.",
    content: "Use 3D transforms for a realistic flip...",
    tags: ["CSS", "Showcase"],
    category: "Showcase",
    author: { name: "Kai Nova", avatar: "https://i.pravatar.cc/80?img=2" },
    date: "2025-07-28",
    readTime: 4,
    cover: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "seed-5",
    title: "Scroll-Linked Animations: Best Practices",
    excerpt: "From parallax to pinned scenes — when (and when not) to animate on scroll.",
    content: "Scroll is powerful but easy to overdo...",
    tags: ["UX", "Scroll", "Accessibility"],
    category: "Guides",
    author: { name: "Rhea Flux", avatar: "https://i.pravatar.cc/80?img=9" },
    date: "2025-08-02",
    readTime: 5,
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
  },
];

// --- Initial State for Widgets ---
const initialLikes = { "seed-1": 42, "seed-2": 108, "seed-3": 76, "seed-4": 55, "seed-5": 91 };
const initialLikedByMe = new Set(["seed-2", "seed-5"]);
const initialBookmarks = new Set(["seed-1", "seed-3"]);
const initialComments = {
  "seed-1": [{ name: "Alex", text: "This was a fantastic tutorial, thank you!", ts: Date.now() - 86400000 }],
};
const emptyComment = { name: "", text: "" };

// Helper Functions
function normalizeTags(raw) {
  if (Array.isArray(raw)) return raw.filter((t) => typeof t === "string" && t.trim()).map((t) => t.trim());
  if (typeof raw === "string") return raw.split(",").map((t) => t.trim()).filter(Boolean);
  if (raw && typeof raw === "object") {
    const vals = Object.values(raw).filter((v) => typeof v === "string");
    return vals.map((v) => v.trim()).filter(Boolean);
  }
  return [];
}

function buildApi(path) {
  const base = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
  if (/\/api$/i.test(base)) return `${base}${path.startsWith("/") ? path : "/" + path}`;
  return `${base}/api${path.startsWith("/") ? path : "/" + path}`;
}

export default function BlogHub() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  // Data state initialized with demo data
  const [blogs, setBlogs] = useState(seedBlogsData);
  const [likes, setLikes] = useState(initialLikes);
  const [likedByMe, setLikedByMe] = useState(initialLikedByMe);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [comments, setComments] = useState(initialComments);

  // UI state
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [sort, setSort] = useState("newest");
  const [modalBlog, setModalBlog] = useState(null);
  const [newComment, setNewComment] = useState(emptyComment);

  // Fetch live data from API and merge with seed data
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = buildApi(currentUser ? "/blogs/user" : "/blogs");
      const response = await axios.get(endpoint, { withCredentials: !!currentUser });
      const list = response.data?.data || response.data?.blogs || [];
      const apiBlogs = list.map((blog) => ({
        id: blog._id,
        _id: blog._id,
        title: blog.title || "Untitled",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        tags: normalizeTags(blog.tags),
        category: blog.category || "General",
        author: {
          name: blog.author?.name || blog.author?.username || "User",
          avatar: blog.author?.avatarUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(blog.author?.name || "User")}`,
        },
        date: blog.date ? new Date(blog.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        readTime: blog.readTime || Math.max(2, Math.round((blog.content || "").split(/\s+/).filter(Boolean).length / 180)),
        cover: blog.imageUrl || blog.cover || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1400&auto=format&fit=crop",
      }));

      const combinedBlogs = [...seedBlogsData];
      const seedIds = new Set(seedBlogsData.map(b => b.id));
      apiBlogs.forEach(apiBlog => {
        if (!seedIds.has(apiBlog.id)) combinedBlogs.push(apiBlog);
      });
      setBlogs(combinedBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs(seedBlogsData); // Fallback to seed data on API error
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Derived sets
  const allCategories = useMemo(() => Array.from(new Set(blogs.map((b) => b.category))).sort(), [blogs]);
  const allTags = useMemo(() => Array.from(new Set(blogs.flatMap((b) => b.tags))).sort(), [blogs]);

  // Filtering + sorting
  const visibleBlogs = useMemo(() => {
    let list = blogs.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q) ||
          (b.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          b.category.toLowerCase().includes(q)
      );
    }
    if (category) list = list.filter((b) => b.category === category);
    if (activeTag) list = list.filter((b) => (b.tags || []).includes(activeTag));
    list.sort((a, b) => {
      if (sort === "likes") {
        const la = likes[a.id] || 0;
        const lb = likes[b.id] || 0;
        if (lb !== la) return lb - la;
      }
      return new Date(b.date) - new Date(a.date);
    });
    return list;
  }, [blogs, query, category, activeTag, sort, likes]);

  // Widgets
  const trendingTags = useMemo(() => {
    const freq = new Map();
    blogs.forEach((b) => (b.tags || []).forEach((t) => freq.set(t, (freq.get(t) || 0) + 1)));
    return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [blogs]);

  const topLiked = useMemo(() => blogs.slice().sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0)).slice(0, 5), [blogs, likes]);

  // Actions
  const toggleLike = useCallback((id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + (likedByMe.has(id) ? -1 : 1) }));
    setLikedByMe((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }, [likedByMe]);

  const toggleBookmark = useCallback((id) => {
    setBookmarks((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }, []);

  const copyShareLink = useCallback((id) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${id}`;
    navigator.clipboard?.writeText(url);
    alert("Link copied to clipboard!");
  }, []);

  const openModal = useCallback((blog) => setModalBlog(blog), []);
  const closeModal = useCallback(() => {
    setModalBlog(null);
    setNewComment(emptyComment);
  }, []);

  const submitComment = useCallback((e) => {
    e.preventDefault();
    if (!modalBlog || !newComment.name.trim() || !newComment.text.trim()) return;
    setComments((prev) => {
      const list = prev[modalBlog.id] ? [...prev[modalBlog.id]] : [];
      list.push({ ...newComment, ts: Date.now() });
      return { ...prev, [modalBlog.id]: list };
    });
    setNewComment(emptyComment);
  }, [modalBlog, newComment]);

  const deleteComment = useCallback((blogId, ts) => {
    setComments((prev) => {
      const list = (prev[blogId] || []).filter((c) => c.ts !== ts);
      return { ...prev, [blogId]: list };
    });
  // useEffect for initialization (from main)
  useEffect(() => {
    // Any setup or fetch logic can go here
  }, []);

  // submitBlog function (from feature/blogPost)
  const submitBlog = (e) => {
    e.preventDefault();

    const minChars = 4; 
    const content = newBlog.content.trim(); 

    const requiredFields = [
      { name: "Title", value: newBlog.title.trim() },
      { name: "Excerpt", value: newBlog.excerpt.trim() },
      { name: "Content", value: content },
      { name: "Author Name", value: newBlog.author.trim() },
    ];

    for (const field of requiredFields) {
      if (field.value.length < minChars) {
        alert(`${field.name} must be at least ${minChars} characters long to publish.`);
        return; 
      }
    }

    const id = (blogs.reduce((m, b) => Math.max(m, b.id), 0) || 0) + 1;
    const now = new Date().toISOString().slice(0, 10);
    const tags = newBlog.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const authorName = newBlog.author.trim() || "Guest Author";
    const item = {
      id,
      title: newBlog.title.trim(),
      excerpt: newBlog.excerpt.trim(),
      content: content, 
      tags: tags.length ? tags : ["Community"],
      category: newBlog.category.trim() || "Community",
      author: {
        name: authorName,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
          authorName
        )}`,
      },
      date: now,
      readTime: Math.max(2, Math.round(content.split(/\s+/).length / 180)), 
    };
    
    setBlogs((prev) => [item, ...prev]);
    setShowAdd(false);
    setNewBlog({
      title: "",
      excerpt: "",
      content: "",
      tags: "",
      category: "",
      author: "",
      cover: "",
    });
  };

  // Anim
  const fadeUp = useMemo(() => ({
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }), []);

  const bounceHover = useMemo(() => ({
    onMouseEnter: (e) => (e.currentTarget.style.transform = "scale(1.07)"),
    onMouseLeave: (e) => (e.currentTarget.style.transform = "scale(1)"),
    style: { transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)" },
  }), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full py-10 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          {currentUser && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Welcome back,{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {currentUser.username}
              </span>
            </div>
          )}
          <button
            onClick={() => navigate("/blogs/add")}
            className="group bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 overflow-hidden border-2 border-white/20
            px-4 py-2.5 text-sm sm:px-5 sm:py-3
            md:px-6 md:py-3 ml-auto"
            style={{ boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
              <span className="group-hover:rotate-12 transition-transform duration-300 text-sm sm:text-base">➕</span>
              <span>Add Blog</span>
            </span>
          </button>
        </div>

        <motion.section variants={fadeUp} initial="hidden" animate="visible" className="text-center space-y-4 relative py-10">
          <div {...bounceHover} className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-2 shadow-lg">
            <span className="text-3xl">📝</span>
          </div>
          <h1 {...bounceHover} className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AnimateHub — Knowledge Hub
          </h1>
          <p {...bounceHover} className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Tutorials, showcases, and behind-the-scenes stories from the animation community.
          </p>
          <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-center mt-4">
            <div className="relative w-96">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tutorials, tags, authors…"
                className="w-full px-4 py-2 pr-20 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 focus:ring-2 focus:ring-blue-500 flex-shrink"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-12 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Clear search">
                  ✕
                </button>
              )}
              <button onClick={() => { setQuery(""); setCategory(""); setActiveTag(""); setSort("newest"); }} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Reset all filters">
                ✗
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center mt-3 max-w-md mx-auto">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80">
              <option value="">All Categories</option>
              {allCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <select value={activeTag} onChange={(e) => setActiveTag(e.target.value)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80">
              <option value="">All Tags</option>
              {allTags.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 col-span-2 sm:col-span-1">
              <option value="newest">Newest</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </motion.section>

        {loading && blogs.length <= seedBlogsData.length ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading Live Blogs...</p>
          </div>
        ) : (
          <>
            <div className="pt-6">
              <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-10 text-2xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Explore Widgets
              </motion.h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mt-8">
                {/* Top Liked */}
                {/* <div className="flex-1 min-w-[260px] rounded-3xl bg-gradient-to-br from-white/90 via-blue-50/50 to-white/90 dark:from-slate-900/90 dark:via-blue-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6" {...bounceHover}>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"><span className="text-2xl">📈</span></div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">Top Liked</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Most popular posts</p>
                      </div>
                    </div>
                    <ul className="space-y-4 flex-1">
                      {topLiked.map((b, index) => (
                        <li key={b.id} className="group">
                          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 dark:border-slate-700/20">
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : index === 1 ? "bg-gradient-to-r from-gray-300 to-gray-400" : index === 2 ? "bg-gradient-to-r from-amber-600 to-amber-700" : "bg-gradient-to-r from-blue-500 to-blue-600"}`}>{index + 1}</div>
                            <div className="flex-1 min-w-0"><button className="text-left hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-2" onClick={() => openModal(b)}>{b.title}</button></div>
                            <div className="flex-shrink-0"><span className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-lg">❤️ {likes[b.id] || 0}</span></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}

                {/*Top Liked */}
                <div className="flex-1 min-w-[280px] rounded-3xl bg-gradient-to-br from-white/90 via-blue-50/50 to-white/90 dark:from-slate-900/90 dark:via-blue-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6" {...bounceHover}>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">📈</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">Top Liked</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Most popular posts</p>
                      </div>
                    </div>

                    {/* Posts */}
                    <ul className="space-y-4 flex-1">
                      {topLiked.map((b, index) => (
                        <li key={b.id} className="group relative">
                          <div className={`flex items-center gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer`} onClick={() => openModal(b)}>
                            {/* Rank Badge */}
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg flex-shrink-0 ${index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg" :
                              index === 1 ? "bg-gradient-to-r from-gray-300 to-gray-400 shadow-md" :
                                index === 2 ? "bg-gradient-to-r from-amber-600 to-amber-700 shadow-md" :
                                  "bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"
                              }`}>{index + 1}</div>

                            {/* Post Info */}
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:underline group-hover:transition-all duration-200 cursor-pointer">
                                {b.title}
                              </h5>
                              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                <img src={b.author.avatar} alt={b.author.name} className="w-4 h-4 rounded-full object-cover" />
                                <span>{b.author.name}</span>
                                <span>· {b.readTime} min read</span>
                              </div>
                            </div>


                            {/* Likes */}
                            <div className="flex-shrink-0 flex items-center gap-1">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pink-600/80 text-white text-xs font-bold shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <span className="bg-white text-pink-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">❤️</span>
                                {likes[b.id] || 0}
                              </span>
                            </div>
                          </div>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-blue-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cover Image */}
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

                {/* Excerpt */}
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

                {/* Content */}
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Word count: {newBlog.content.trim().split(/\s+/).filter(word => word.length > 0).length} / 50
                  </p>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-3 border-t border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="px-5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                    type="submit"
                  >
                    <span className="flex items-center gap-2">
                      <span>🚀</span>
                      <span>Publish Blog</span>
                    </span>
                  </button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>


                {/* Trending Tags */}
                <div className="flex-1 min-w-[260px] rounded-3xl bg-gradient-to-br from-white/90 via-purple-50/50 to-white/90 dark:from-slate-900/90 dark:via-purple-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6" {...bounceHover}>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"><span className="text-2xl">🔥</span></div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">Trending Tags</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Hot topics now</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 flex-1">
                      {trendingTags.map(([t, n]) => (
                        <button key={t} onClick={() => setActiveTag(t === activeTag ? "" : t)} className={`group relative px-4 py-2.5 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-110 border-2 ${activeTag === t ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-600 shadow-purple-500/25" : "bg-gradient-to-r from-white/80 to-purple-50/80 dark:from-slate-800/80 dark:to-purple-900/20 text-slate-700 dark:text-slate-200 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-purple-500/20"}`} title={`${n} post(s)`}>
                          <span className="relative z-10">#{t}</span>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg">{n}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bookmarks
                <div className="flex-1 min-w-[260px] rounded-3xl bg-gradient-to-br from-white/90 via-yellow-50/50 to-white/90 dark:from-slate-900/90 dark:via-yellow-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6" {...bounceHover}>
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg"><span className="text-2xl">🔖</span></div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">My Bookmarks</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Saved for later</p>
                      </div>
                    </div>
                    {blogs.filter((b) => bookmarks.has(b.id)).length ? (
                      <ul className="space-y-4 flex-1">
                        {blogs.filter((b) => bookmarks.has(b.id)).map((b) => (
                          <li key={b.id} className="group">
                            <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 dark:border-slate-700/20">
                              <div className="flex-1 min-w-0"><button className="text-left text-sm hover:underline hover:text-yellow-600 dark:hover:text-yellow-400 transition font-medium text-slate-700 dark:text-slate-200 line-clamp-2" onClick={() => openModal(b)}>{b.title}</button></div>
                              <button onClick={() => toggleBookmark(b.id)} className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group-hover:shadow-yellow-500/25" title="Remove bookmark"><span className="text-sm">×</span></button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg"><span className="text-3xl">📚</span></div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">No bookmarks yet</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Save your favorite posts to read later!</p>
                      </div>
                    )}
                  </div>
                </div> */}

                {/* My Bookmarks */}
                <div className="flex-1 min-w-[280px] rounded-3xl bg-gradient-to-br from-white/90 via-yellow-50/50 to-white/90 
                dark:from-slate-900/90 dark:via-yellow-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6" {...bounceHover}>
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🔖</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">My Bookmarks</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Saved for later</p>
                      </div>
                    </div>

                    {/* Bookmarked Posts */}
                    {blogs.filter((b) => bookmarks.has(b.id)).length ? (
                      <ul className="space-y-4 flex-1">
                        {blogs.filter((b) => bookmarks.has(b.id)).map((b, index) => (
                          <li key={b.id} className="group relative">
                            <div
                              className={`flex items-center gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70
                          hover:bg-white/90 dark:hover:bg-slate-700/70 transition-all duration-300
                          shadow-md hover:shadow-xl cursor-pointer`}
                              onClick={() => openModal(b)}
                            >
                              {/* Rank Badge */}
                              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg flex-shrink-0
                              ${index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg" :
                                  index === 1 ? "bg-gradient-to-r from-gray-300 to-gray-400 shadow-md" :
                                    index === 2 ? "bg-gradient-to-r from-amber-600 to-amber-700 shadow-md" :
                                      "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-sm"}`}>
                                {index + 1}
                              </div>

                              {/* Post Info */}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 
                               line-clamp-2 transition-all duration-300 group-hover:underline">
                                  {b.title}
                                </h5>
                                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  <img src={b.author.avatar} alt={b.author.name} className="w-4 h-4 rounded-full object-cover" />
                                  <span>{b.author.name}</span>
                                  <span>· {b.readTime} min read</span>
                                </div>
                              </div>

                              {/* Remove Bookmark Button */}
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleBookmark(b.id); }}
                                className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
                           text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group-hover:shadow-yellow-500/25"
                                title="Remove bookmark"
                              >
                                <span className="text-sm">×</span>
                              </button>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                          <span className="text-3xl">📚</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">No bookmarks yet</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Save your favorite posts to read later!</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-center my-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
              </div>
            </div>

            <section className="grid lg:grid-cols-12 gap-8 mt-8">
              <div className="lg:col-span-12">
                <motion.div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  {visibleBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      activeTag={activeTag}
                      bookmarks={bookmarks}
                      likes={likes}
                      likedByMe={likedByMe}
                      onToggleBookmark={toggleBookmark}
                      onToggleLike={toggleLike}
                      onCopyShareLink={copyShareLink}
                      onOpenModal={openModal}
                      onSetActiveTag={setActiveTag}
                    />
                  ))}
                </motion.div>
                {!visibleBlogs.length && (
                  <div className="col-span-full text-center text-slate-500 dark:text-slate-400 py-20">
                    No blogs match your filters.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      <BlogReadModal
        blog={modalBlog}
        onClose={closeModal}
        likes={likes}
        likedByMe={likedByMe}
        bookmarks={bookmarks}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
        copyShareLink={copyShareLink}
        submitComment={submitComment}
        deleteComment={deleteComment}
      />
    </motion.div>
  );
}