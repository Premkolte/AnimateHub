import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// LocalStorage keys
const LS_BLOGS = "ah_blogs_v1";
const LS_LIKES = "ah_likes_v1";          // { [id]: number }
const LS_LIKED_BY_ME = "ah_liked_by_me"; // Set of ids user liked
const LS_BOOKMARKS = "ah_bookmarks_v1";  // Set of ids
const LS_COMMENTS = "ah_comments_v1";    // { [id]: [{name,text,ts}] }

const seedBlogs = [
  {
    id: 1,
    title: "Mastering CSS Keyframe Animations",
    excerpt:
      "Learn how to craft smooth, performant CSS animations with keyframes, easing, and GPU-friendly tricks.",
    content:
      `CSS animations can be both elegant and efficient.\n\nIn this guide we’ll cover:\n- keyframes & timing functions\n- compositing & transform hacks\n- reducing layout thrash\n\nCode:\n\`\`\`css\n@keyframes float {\n  0% { transform: translateY(0); }\n  50% { transform: translateY(-8px); }\n  100% { transform: translateY(0); }\n}\n.card { animation: float 3s ease-in-out infinite; }\n\`\`\`\n\nPro tip: Prefer transform & opacity for 60fps.`,
    tags: ["CSS", "Tutorial", "Performance"],
    category: "CSS",
    author: { name: "Ava Motion", avatar: "https://i.pravatar.cc/80?img=12" },
    date: "2025-08-12",
    readTime: 6,
    cover:
      "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "GSAP Timeline Magic: Complex Sequences Made Simple",
    excerpt:
      "Build orchestrated motion using GSAP timelines: staggering, labels, and reusable sequences.",
    content:
      `GSAP Timelines let you coordinate complex motion with ease.\n\nHighlights:\n- timeline labels\n- nested timelines\n- scrubbed scroll triggers\n\nCode:\n\`\`\`js\nconst tl = gsap.timeline({ defaults: { ease: 'power2.out' }});\ntl.from('.hero', { y: 40, opacity: 0 })\n  .to('.badge', { scale: 1.1, yoyo: true, repeat: 1 }, '>-0.2')\n  .from('.card', { y: 24, opacity: 0, stagger: 0.06 }, '<');\n\`\`\`\n\nUse \`tl.addLabel('phase2')\` to jump around.`,
    tags: ["GSAP", "Timeline", "Tutorial"],
    category: "GSAP",
    author: { name: "Dev Ray", avatar: "https://i.pravatar.cc/80?img=5" },
    date: "2025-08-10",
    readTime: 7,
    cover:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Intro to Three.js: Orbiting Planets Scene",
    excerpt:
      "Get started with Three.js by building a tiny solar system with lights, textures and orbits.",
    content:
      `We’ll spin up a minimal scene with renderer, camera, and a few Meshes.\n\nChecklist:\n- WebGLRenderer + Canvas sizing\n- PerspectiveCamera + controls\n- Spheres with standard material\n- requestAnimationFrame loop\n\nRemember to always handle DPR for crisp rendering.`,
    tags: ["Three.js", "WebGL", "Beginner"],
    category: "Three.js",
    author: { name: "Luna Park", avatar: "https://i.pravatar.cc/80?img=7" },
    date: "2025-08-05",
    readTime: 9,
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Animation of the Week: Card Flip Showcase",
    excerpt:
      "A delightful card-flip effect using perspective, preserve-3d and backface-visibility.",
    content:
      `Use 3D transforms for a realistic flip.\n\nKey CSS:\n\`\`\`css\n.scene { perspective: 1000px; }\n.card { transform-style: preserve-3d; transition: transform .6s; }\n.card.is-flipped { transform: rotateY(180deg); }\n.card__face { backface-visibility: hidden; }\n.card__face--back { transform: rotateY(180deg); }\n\`\`\``,
    tags: ["CSS", "Showcase"],
    category: "Showcase",
    author: { name: "Kai Nova", avatar: "https://i.pravatar.cc/80?img=2" },
    date: "2025-07-28",
    readTime: 4,
    cover:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Scroll-Linked Animations: Best Practices",
    excerpt:
      "From parallax to pinned scenes — when (and when not) to animate on scroll.",
    content:
      `Scroll is powerful but easy to overdo.\n\nPrinciples:\n- Animate meaning, not everything\n- Keep motion density balanced\n- Provide reduced motion preferences\n\nUse IntersectionObserver for simple cases; GSAP ScrollTrigger for complex control.`,
    tags: ["UX", "Scroll", "Accessibility"],
    category: "Guides",
    author: { name: "Rhea Flux", avatar: "https://i.pravatar.cc/80?img=9" },
    date: "2025-08-02",
    readTime: 5,
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Staggered Lists that Feel Alive",
    excerpt:
      "Micro-interactions with stagger reveal add a delightful rhythm to content.",
    content:
      `Try small delays (60–120ms) and minimal movement (12–20px).\n\nFor accessibility, respect \`prefers-reduced-motion\` and provide instant mode.`,
    tags: ["Micro-interactions", "GSAP", "CSS"],
    category: "UX",
    author: { name: "Mina Flow", avatar: "https://i.pravatar.cc/80?img=14" },
    date: "2025-08-14",
    readTime: 3,
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Web Animations API vs CSS vs GSAP",
    excerpt:
      "Which tool when? A pragmatic comparison for teams shipping real products.",
    content:
      `Rule of thumb:\n- CSS: simple, declarative, high-perf\n- WAAPI: JS control, timelines, playback\n- GSAP: power + plugins + cross-browser sanity`,
    tags: ["WAAPI", "GSAP", "CSS"],
    category: "Guides",
    author: { name: "Ivo Trail", avatar: "https://i.pravatar.cc/80?img=22" },
    date: "2025-08-11",
    readTime: 8,
    cover:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Debugging Jank: A Field Guide",
    excerpt:
      "Identify paint storms, layout thrash, and overdraw using DevTools.",
    content:
      `Use the Performance panel to find long tasks; minimize layout reflows; throttle CPU to replicate real devices.`,
    tags: ["Performance", "DevTools"],
    category: "Performance",
    author: { name: "Zed Peaks", avatar: "https://i.pravatar.cc/80?img=18" },
    date: "2025-08-09",
    readTime: 6,
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
  },
];

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

const emptyComment = { name: "", text: "" };

export default function BlogHub() {
  // Data state
  const [blogs, setBlogs] = useState(() => getLS(LS_BLOGS, seedBlogs));
  const [likes, setLikes] = useState(() => getLS(LS_LIKES, {}));
  const [likedByMe, setLikedByMe] = useState(() => new Set(getLS(LS_LIKED_BY_ME, [])));
  const [bookmarks, setBookmarks] = useState(() => new Set(getLS(LS_BOOKMARKS, [])));
  const [comments, setComments] = useState(() => getLS(LS_COMMENTS, {}));

  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [sort, setSort] = useState("newest");
  const [showAdd, setShowAdd] = useState(false);
  const [modalBlog, setModalBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    category: "",
    author: "",
    cover: "",
  });
  const [newComment, setNewComment] = useState(emptyComment);

  // Persist
  useEffect(() => setLS(LS_BLOGS, blogs), [blogs]);
  useEffect(() => setLS(LS_LIKES, likes), [likes]);
  useEffect(() => setLS(LS_LIKED_BY_ME, Array.from(likedByMe)), [likedByMe]);
  useEffect(() => setLS(LS_BOOKMARKS, Array.from(bookmarks)), [bookmarks]);
  useEffect(() => setLS(LS_COMMENTS, comments), [comments]);

  // Derived sets
  const allCategories = useMemo(
    () => Array.from(new Set(blogs.map(b => b.category))).sort(),
    [blogs]
  );
  const allTags = useMemo(
    () => Array.from(new Set(blogs.flatMap(b => b.tags))).sort(),
    [blogs]
  );

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
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.category.toLowerCase().includes(q)
      );
    }
    if (category) list = list.filter((b) => b.category === category);
    if (activeTag) list = list.filter((b) => b.tags.includes(activeTag));

    list.sort((a, b) => {
      if (sort === "likes") {
        const la = likes[a.id] || 0;
        const lb = likes[b.id] || 0;
        if (lb !== la) return lb - la;
      }
      // newest
      return new Date(b.date) - new Date(a.date);
    });

    return list;
  }, [blogs, query, category, activeTag, sort, likes]);

  // Widgets
  const trendingTags = useMemo(() => {
    const freq = new Map();
    blogs.forEach((b) => b.tags.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1)));
    return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [blogs]);

  const topLiked = useMemo(() => {
    return blogs
      .slice()
      .sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0))
      .slice(0, 5);
  }, [blogs, likes]);

  // Actions
  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + (likedByMe.has(id) ? -1 : 1) }));
    setLikedByMe((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const copyShareLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${id}`;
    navigator.clipboard?.writeText(url);
  };

  const openModal = (blog) => setModalBlog(blog);
  const closeModal = () => {
    setModalBlog(null);
    setNewComment(emptyComment);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!modalBlog || !newComment.name.trim() || !newComment.text.trim()) return;
    setComments((prev) => {
      const list = prev[modalBlog.id] ? prev[modalBlog.id].slice() : [];
      list.push({ ...newComment, ts: Date.now() });
      return { ...prev, [modalBlog.id]: list };
    });
    setNewComment(emptyComment);
  };

  const deleteComment = (blogId, ts) => {
    setComments((prev) => {
      const list = (prev[blogId] || []).filter((c) => c.ts !== ts);
      return { ...prev, [blogId]: list };
    });
  };

  const submitBlog = (e) => {
    e.preventDefault();
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
      content: newBlog.content.trim(),
      tags: tags.length ? tags : ["Community"],
      category: newBlog.category.trim() || "Community",
      author: {
        name: authorName,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
          authorName
        )}`,
      },
      date: now,
      readTime: Math.max(2, Math.round(newBlog.content.split(/\s+/).length / 180)),
      cover:
        newBlog.cover.trim() ||
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1400&auto=format&fit=crop",
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
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full py-10 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Add Blog Button Container - Top Right */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowAdd(true)}
            // Mobile sizing
            // Tablet sizing
            // Desktop sizing
            // Large screen sizing
            className="group bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 overflow-hidden border-2 border-white/20
            px-4 py-2.5 text-sm
            sm:px-5 sm:py-3 sm:text-base
            md:px-6 md:py-3 md:text-base
            lg:px-6 lg:py-3"
            style={{ boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)" }}
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
              <span className="group-hover:rotate-12 transition-transform duration-300 text-sm sm:text-base">➕</span>
              <span>Add Blog</span>
            </span>
          </button>
        </div>

        {/* Header */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4 relative"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-2 shadow-lg">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AnimateHub — Knowledge Hub
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Tutorials, showcases, and behind-the-scenes stories from the animation community.
          </p>

          {/* Search & Reset Row */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-center mt-4">
            <div className="relative w-96">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tutorials, tags, authors…"
                className="w-full px-4 py-2 pr-20 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 focus:ring-2 focus:ring-blue-500 flex-shrink"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("");
                  setActiveTag("");
                  setSort("newest");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="Reset all filters"
              >
                ✗
              </button>
            </div>
          </div>

          {/* Filter Selects Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center mt-3 max-w-md mx-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"
            >
              <option value="">All Categories</option>
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"
            >
              <option value="">All Tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 col-span-2 sm:col-span-1"
            >
              <option value="sort">Sort By</option>
              <option value="newest">Newest</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </motion.section>

        {/* Enhanced Sidebar Widgets Row */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mt-8">
          {/* Top Liked */}
          <div className="flex-1 min-w-[260px] rounded-3xl border-2 border-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-700 to-blue-600 bg-gradient-to-br from-white/90 via-blue-50/50 to-white/90 dark:from-slate-900/90 dark:via-blue-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">Top Liked</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Most popular posts</p>
                </div>
              </div>
              
              <ul className="space-y-4 flex-1">
                {topLiked.map((b, index) => (
                  <li key={b.id} className="group">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 dark:border-slate-700/20">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                          index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                          index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                          'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <button
                          className="text-left hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-2"
                          onClick={() => openModal(b)}
                        >
                          {b.title}
                        </button>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                          ❤️ {likes[b.id] || 0}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="flex-1 min-w-[260px] rounded-3xl border-2 border-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-700 to-purple-600 bg-gradient-to-br from-white/90 via-purple-50/50 to-white/90 dark:from-slate-900/90 dark:via-purple-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-0 left-0 w-28 h-28 bg-purple-400 rounded-full -translate-y-14 -translate-x-14"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-300 rounded-full translate-y-10 translate-x-10"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">Trending Tags</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Hot topics now</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 flex-1">
                {trendingTags.map(([t, n]) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t === activeTag ? "" : t)}
                    className={`group relative px-4 py-2.5 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-110 border-2 ${
                      activeTag === t
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-600 shadow-purple-500/25"
                        : "bg-gradient-to-r from-white/80 to-purple-50/80 dark:from-slate-800/80 dark:to-purple-900/20 text-slate-700 dark:text-slate-200 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-purple-500/20"
                    }`}
                    title={`${n} post(s)`}
                  >
                    <span className="relative z-10">#{t}</span>
                    {activeTag === t && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl animate-pulse"></div>
                    )}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      {n}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* My Bookmarks */}
          <div className="flex-1 min-w-[260px] rounded-3xl border-2 border-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-700 to-yellow-600 bg-gradient-to-br from-white/90 via-yellow-50/50 to-white/90 dark:from-slate-900/90 dark:via-yellow-900/20 dark:to-slate-900/90 shadow-2xl backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300 rounded-full translate-y-16 -translate-x-16"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🔖</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">My Bookmarks</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Saved for later</p>
                </div>
              </div>
              
              {blogs.filter((b) => bookmarks.has(b.id)).length ? (
                <ul className="space-y-4 flex-1">
                  {blogs
                    .filter((b) => bookmarks.has(b.id))
                    .map((b) => (
                      <li key={b.id} className="group">
                        <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 dark:border-slate-700/20">
                          <div className="flex-1 min-w-0">
                            <button
                              className="text-left text-sm hover:underline hover:text-yellow-600 dark:hover:text-yellow-400 transition font-medium text-slate-700 dark:text-slate-200 line-clamp-2"
                              onClick={() => openModal(b)}
                            >
                              {b.title}
                            </button>
                          </div>
                          <button
                            onClick={() => toggleBookmark(b.id)}
                            className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group-hover:shadow-yellow-500/25"
                            title="Remove bookmark"
                          >
                            <span className="text-sm">×</span>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-3xl">📚</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">
                    No bookmarks yet
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Save your favorite posts to read later!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Separator */}
        <div className="flex items-center justify-center my-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          </div>
        </div>

        {/* Blogs Section Heading */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mt-20 mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">📚</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Discover Amazing Content
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our curated collection of tutorials, showcases, and insights from the animation community
          </p>
        </motion.section>

        {/* Main Grid */}
        <section className="grid lg:grid-cols-12 gap-8 mt-8">
          {/* Blog Grid */}
          <div className="lg:col-span-12 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleBlogs.map((b) => (
              <motion.article
                key={b.id}
                id={`blog-${b.id}`}
                whileHover={{ y: -6, scale: 1.03, boxShadow: "0 8px 32px rgba(60,60,120,0.12)" }}
                className="group rounded-3xl overflow-hidden border border-transparent hover:border-r-4 hover:border-r-blue-500 dark:hover:border-r-blue-400 bg-gradient-to-br from-white/80 to-blue-50 dark:from-slate-900/80 dark:to-slate-800/80 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-lg flex flex-col h-full relative"
              >
                                 <div className="relative">
                   <img
                     src={b.cover}
                     alt={b.title}
                     className="h-44 w-full object-cover"
                     loading="lazy"
                     style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}
                   />
                   <button
                     onClick={() => toggleBookmark(b.id)}
                     className={`absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-semibold shadow backdrop-blur-lg transition ${
                       bookmarks.has(b.id)
                         ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-black"
                         : "bg-white/80 dark:bg-slate-900/70"
                     }`}
                   >
                     {bookmarks.has(b.id) ? "🔖 Saved" : "🔖 Save"}
                   </button>
                 </div>
                 <div className="p-5 flex flex-col flex-1 space-y-4">
                  {/* Author and Meta */}
                  <div className="flex items-center gap-3">
                    <img
                      src={b.author.avatar}
                      alt={b.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-200">{b.author.name}</span>
                      <span>
                        {new Date(b.date).toLocaleDateString()} • {b.readTime} min read
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div>
                    <h3 className="font-bold text-lg line-clamp-2 mb-1">{b.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{b.excerpt}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {b.tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveTag(t === activeTag ? "" : t)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold shadow transition ${
                          activeTag === t
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-slate-100 dark:bg-slate-700"
                        }`}
                      >
                        #{t}
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 justify-start">
                    <button
                      onClick={() => toggleLike(b.id)}
                      className={`group relative px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden ${
                        likedByMe.has(b.id)
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-rose-500/25"
                          : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900 dark:hover:to-pink-900"
                      }`}
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      <span className="relative z-10 flex items-center gap-1">
                        <span className={`transition-transform duration-300 ${likedByMe.has(b.id) ? 'group-hover:scale-125' : 'group-hover:scale-110'}`}>
                          ❤️
                        </span>
                        <span className="font-semibold">{likes[b.id] || 0}</span>
                      </span>
                    </button>
                    
                    <button
                      onClick={() => copyShareLink(b.id)}
                      className="group relative px-3 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-300 hover:scale-105 overflow-hidden"
                      title="Copy share link"
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      <span className="relative z-10 flex items-center gap-1">
                        <span className="group-hover:rotate-12 transition-transform duration-300">🔗</span>
                        <span>Share</span>
                      </span>
                    </button>
                  </div>

                  {/* Read More Button - centered and styled */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => openModal(b)}
                      className="group relative px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden"
                      style={{ boxShadow: "0 4px 24px rgba(60,60,120,0.15)" }}
                    >
                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      {/* Button Content */}
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="group-hover:rotate-12 transition-transform duration-300">📖</span>
                        <span>Read More</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}

            {!visibleBlogs.length && (
              <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
                No blogs match your filters.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Add Blog Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAdd(false)}
            />
            <motion.form
              onSubmit={submitBlog}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] my-8 bg-gradient-to-br from-white/95 via-blue-50/50 to-purple-50/50 dark:from-slate-900/95 dark:via-slate-800/50 dark:to-purple-900/20 rounded-3xl shadow-2xl border-4 border-transparent backdrop-blur-xl overflow-hidden"
            >
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">✍️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Create a New Blog</h3>
                    <p className="text-blue-100 text-sm">Share your knowledge with the community</p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 z-20"
                  title="Close"
                >
                  <span className="text-white text-base font-bold">×</span>
                </button>
              </div>

              {/* Enhanced Form Content */}
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(85vh-120px)]">
                {/* Title and Author Row */}
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

                {/* Category and Tags Row */}
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
                      placeholder="Comma separated tags..."
                      className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      value={newBlog.tags}
                      onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                    />
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

      {/* Read More Modal */}
      <AnimatePresence>
        {modalBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -20, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] bg-gradient-to-br from-white/95 via-blue-50/50 to-purple-50/50 dark:from-slate-900/95 dark:via-slate-800/50 dark:to-purple-900/20 rounded-3xl overflow-hidden border-4 border-transparent shadow-2xl backdrop-blur-xl"
            >
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                {/* Header Content */}
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
                  
                  {/* Enhanced Close Button */}
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    title="Close"
                  >
                    <span className="text-white text-base font-bold">×</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(85vh-120px)]">
                {/* Responsive Image */}
                <div className="relative">
                  <img
                    src={modalBlog.cover}
                    alt={modalBlog.title}
                    className="h-48 sm:h-56 md:h-64 w-full object-cover"
                    style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}
                  />
                </div>

                {/* Enhanced Content Section */}
                <div className="p-4 sm:p-6 md:p-8 space-y-6">
                  {/* Enhanced Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={modalBlog.author.avatar}
                        alt={modalBlog.author.name}
                        className="w-10 h-10 rounded-full ring-2 ring-blue-200 dark:ring-blue-700"
                      />
                      <div className="text-sm text-slate-700 dark:text-slate-200">
                        <div className="font-semibold text-slate-800 dark:text-slate-100">
                          {modalBlog.author.name}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {new Date(modalBlog.date).toLocaleDateString()} • {modalBlog.readTime} min read
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => toggleLike(modalBlog.id)}
                        className={`group relative px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden ${
                          likedByMe.has(modalBlog.id)
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-rose-500/25"
                            : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900 dark:hover:to-pink-900"
                        }`}
                      >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        
                        <span className="relative z-10 flex items-center gap-1">
                          <span className={`transition-transform duration-300 ${likedByMe.has(modalBlog.id) ? 'group-hover:scale-125' : 'group-hover:scale-110'}`}>
                            ❤️
                          </span>
                          <span className="font-semibold">{likes[modalBlog.id] || 0}</span>
                        </span>
                      </button>
                      
                      <button
                        onClick={() => toggleBookmark(modalBlog.id)}
                        className={`group relative px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden ${
                          bookmarks.has(modalBlog.id)
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg hover:shadow-yellow-500/25"
                            : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-900 dark:hover:to-yellow-800"
                        }`}
                      >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        
                        <span className="relative z-10 flex items-center gap-1">
                          <span className="group-hover:rotate-12 transition-transform duration-300">🔖</span>
                          <span>{bookmarks.has(modalBlog.id) ? "Saved" : "Save"}</span>
                        </span>
                      </button>
                      
                      <button
                        onClick={() => copyShareLink(modalBlog.id)}
                        className="group relative px-3 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-300 hover:scale-105 overflow-hidden"
                        title="Copy share link"
                      >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        
                        <span className="relative z-10 flex items-center gap-1">
                          <span className="group-hover:rotate-12 transition-transform duration-300">🔗</span>
                          <span>Share</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Title and Tags */}
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      {modalBlog.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {modalBlog.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-700"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Article Content */}
                  <article className="prose dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed">
                    {modalBlog.content.split("\n").map((p, i) => (
                      <p key={i} className="mb-4 text-slate-700 dark:text-slate-200">{p}</p>
                    ))}
                  </article>

                  {/* Enhanced Comments Section */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      Comments
                    </h4>
                    <div className="space-y-4 mb-6">
                      {(comments[modalBlog.id] || []).map((c) => (
                        <div
                          key={c.ts}
                          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{c.name}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap mt-1">
                              {c.text}
                            </div>
                            <div className="text-xs text-slate-500 mt-2">
                              {new Date(c.ts).toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteComment(modalBlog.id, c.ts)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 text-rose-700 dark:text-rose-300 hover:from-rose-200 hover:to-pink-200 dark:hover:from-rose-800 dark:hover:to-pink-800 transition-all duration-300 self-start sm:self-auto"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      {!((comments[modalBlog.id] || []).length) && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                          <div className="text-4xl mb-2">💭</div>
                          <p className="text-sm">No comments yet — be first!</p>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Comment Form */}
                    <form onSubmit={submitComment} className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
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
    </motion.div>
  );
}
