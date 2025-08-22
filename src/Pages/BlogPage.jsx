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
        {/* Header */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4"
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

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tutorials, tags, authors…"
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 focus:ring-2 focus:ring-blue-500"
            />
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
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"
            >
              <option value="newest">Newest</option>
              <option value="likes">Most Liked</option>
            </select>
            <button
              onClick={() => {
                setQuery("");
                setCategory("");
                setActiveTag("");
                setSort("newest");
              }}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-slate-700"
            >
              Reset
            </button>
            <button
              onClick={() => setShowAdd((s) => !s)}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 shadow"
            >
              {showAdd ? "Close" : "➕ Add Blog"}
            </button>
          </div>
        </motion.section>

        {/* Add Blog Panel */}
        <AnimatePresence>
          {showAdd && (
            <motion.form
              onSubmit={submitBlog}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4"
            >
              <h3 className="text-xl font-semibold">Create a New Blog</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Title"
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
                <input
                  placeholder="Author (optional)"
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                />
                <input
                  placeholder="Category (e.g., CSS, GSAP, Three.js)"
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                />
                <input
                  placeholder="Tags (comma separated)"
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700"
                  value={newBlog.tags}
                  onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                />
                <input
                  placeholder="Cover Image URL (optional)"
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700 md:col-span-2"
                  value={newBlog.cover}
                  onChange={(e) => setNewBlog({ ...newBlog, cover: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Short excerpt"
                  rows={2}
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700 md:col-span-2"
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Full content (Markdown allowed)"
                  rows={6}
                  className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-700 md:col-span-2"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500"
                  type="submit"
                >
                  Save Blog
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Main Grid */}
        <section className="grid lg:grid-cols-12 gap-8">
          {/* Blog Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleBlogs.map((b) => (
              <motion.article
                key={b.id}
                id={`blog-${b.id}`}
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 shadow hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={b.cover}
                    alt={b.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleBookmark(b.id)}
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-sm backdrop-blur ${
                      bookmarks.has(b.id)
                        ? "bg-yellow-400 text-black"
                        : "bg-white/70 dark:bg-slate-900/60"
                    }`}
                  >
                    {bookmarks.has(b.id) ? "🔖 Saved" : "🔖 Save"}
                  </button>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.author.avatar}
                      alt={b.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <div className="font-medium text-slate-700 dark:text-slate-200">
                        {b.author.name}
                      </div>
                      <div>
                        {new Date(b.date).toLocaleDateString()} • {b.readTime} min read
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg line-clamp-2">{b.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {b.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {b.tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveTag(t === activeTag ? "" : t)}
                        className={`text-xs px-2 py-1 rounded-full border ${
                          activeTag === t
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        #{t}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(b.id)}
                        className={`text-sm px-2 py-1 rounded-lg ${
                          likedByMe.has(b.id)
                            ? "bg-rose-500 text-white"
                            : "bg-slate-100 dark:bg-slate-700"
                        }`}
                      >
                        ❤️ {likes[b.id] || 0}
                      </button>
                      <button
                        onClick={() => copyShareLink(b.id)}
                        className="text-sm px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700"
                        title="Copy share link"
                      >
                        🔗 Share
                      </button>
                    </div>

                    <button
                      onClick={() => openModal(b)}
                      className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                    >
                      Read More
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

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 bg-white/80 dark:bg-slate-800/80">
              <h4 className="font-semibold mb-3">📈 Top Liked</h4>
              <ul className="space-y-3">
                {topLiked.map((b) => (
                  <li key={b.id} className="text-sm flex items-start gap-2">
                    <span>❤️ {likes[b.id] || 0}</span>
                    <button
                      className="text-left hover:underline"
                      onClick={() => openModal(b)}
                    >
                      {b.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 bg-white/80 dark:bg-slate-800/80">
              <h4 className="font-semibold mb-3">🔥 Trending Tags</h4>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(([t, n]) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t === activeTag ? "" : t)}
                    className={`text-xs px-3 py-1.5 rounded-full border ${
                      activeTag === t
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                    title={`${n} post(s)`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 bg-white/80 dark:bg-slate-800/80">
              <h4 className="font-semibold mb-3">🔖 My Bookmarks</h4>
              {blogs.filter((b) => bookmarks.has(b.id)).length ? (
                <ul className="space-y-3">
                  {blogs
                    .filter((b) => bookmarks.has(b.id))
                    .map((b) => (
                      <li key={b.id} className="flex items-center justify-between gap-2">
                        <button
                          className="text-left text-sm hover:underline"
                          onClick={() => openModal(b)}
                        >
                          {b.title}
                        </button>
                        <button
                          onClick={() => toggleBookmark(b.id)}
                          className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No bookmarks yet. Save your favorite posts!
                </p>
              )}
            </div>
          </aside>
        </section>
      </div>

      {/* Read More Modal */}
      <AnimatePresence>
        {modalBlog && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative z-10 max-w-4xl mx-auto my-10 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl"
            >
              <img
                src={modalBlog.cover}
                alt={modalBlog.title}
                className="h-60 w-full object-cover"
              />
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={modalBlog.author.avatar}
                      alt={modalBlog.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {modalBlog.author.name}
                      </div>
                      <div>
                        {new Date(modalBlog.date).toLocaleDateString()} • {modalBlog.readTime} min
                        read
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleLike(modalBlog.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        likedByMe.has(modalBlog.id)
                          ? "bg-rose-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700"
                      }`}
                    >
                      ❤️ {likes[modalBlog.id] || 0}
                    </button>
                    <button
                      onClick={() => toggleBookmark(modalBlog.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        bookmarks.has(modalBlog.id)
                          ? "bg-yellow-400 text-black"
                          : "bg-slate-100 dark:bg-slate-700"
                      }`}
                    >
                      🔖 {bookmarks.has(modalBlog.id) ? "Saved" : "Save"}
                    </button>
                    <button
                      onClick={() => copyShareLink(modalBlog.id)}
                      className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 dark:bg-slate-700"
                    >
                      🔗 Copy Link
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 dark:bg-slate-700"
                    >
                      ✖
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl font-bold">{modalBlog.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {modalBlog.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <article className="prose dark:prose-invert max-w-none">
                  {modalBlog.content.split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </article>

                {/* Comments */}
                <div className="pt-2">
                  <h4 className="font-semibold mb-3">Comments</h4>
                  <div className="space-y-3 mb-4">
                    {(comments[modalBlog.id] || []).map((c) => (
                      <div
                        key={c.ts}
                        className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
                      >
                        <div>
                          <div className="text-sm font-semibold">{c.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                            {c.text}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {new Date(c.ts).toLocaleString()}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteComment(modalBlog.id, c.ts)}
                          className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {!((comments[modalBlog.id] || []).length) && (
                      <div className="text-sm text-slate-500">No comments yet — be first!</div>
                    )}
                  </div>

                  <form onSubmit={submitComment} className="grid sm:grid-cols-5 gap-3">
                    <input
                      required
                      placeholder="Your name"
                      className="sm:col-span-2 px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-800"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    />
                    <input
                      required
                      placeholder="Write a comment…"
                      className="sm:col-span-3 px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-800"
                      value={newComment.text}
                      onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    />
                    <div className="sm:col-span-5 flex justify-end">
                      <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500">
                        Post Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
