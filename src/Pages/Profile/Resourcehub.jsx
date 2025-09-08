import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
import Fuse from "fuse.js"; // For fuzzy search
import {
  Zap,
  Heart,
  Sparkles,
  Hash,
  Star,
  Eye,
  Package,
  Layout,
  Layers,
  Grid,
  Component,
  Image,
  Play,
  Wand2,
  Shapes,
  Paintbrush,
  Camera,
  Download,
  Wind,
  FormInput,
  Search,
} from "lucide-react";

// Icon mapping for each resource
const resourceIcons = {
  "Framer Motion": Zap,
  GSAP: Heart,
  "React Spring": Sparkles,
  "Motion One": Play,
  "Lucide Icons": Hash,
  Heroicons: Star,
  "Phosphor Icons": Eye,
  "React Icons": Package,
  "shadcn/ui": Layout,
  "Radix UI": Layers,
  "Chakra UI": Grid,
  "Material UI": Component,
  LottieFiles: Image,
  Animista: Wand2,
  Haikei: Shapes,
  "SVG Repo": Download,
  "Tailwind CSS": Wind,
  "React Hook Form": FormInput,
  Figma: Paintbrush,
  Unsplash: Camera,
};

// List of resources
const resources = [
  // Animation Libraries
  {
    name: "Framer Motion",
    category: "Animation",
    description: "A production-ready motion library for React.",
    url: "https://www.framer.com/motion/",
  },
  {
    name: "GSAP",
    category: "Animation",
    description: "The GreenSock Animation Platform for powerful animations.",
    url: "https://greensock.com/gsap/",
  },
  {
    name: "React Spring",
    category: "Animation",
    description: "Physics-based animation library for React.",
    url: "https://react-spring.dev/",
  },
  {
    name: "Motion One",
    category: "Animation",
    description: "A tiny, fast animation library for the web.",
    url: "https://motion.dev/",
  },
  // Icon Libraries
  {
    name: "Lucide Icons",
    category: "Icons",
    description: "Beautiful & consistent icon toolkit.",
    url: "https://lucide.dev/",
  },
  {
    name: "Heroicons",
    category: "Icons",
    description: "Free MIT-licensed SVG icons by Tailwind CSS creators.",
    url: "https://heroicons.com/",
  },
  {
    name: "Phosphor Icons",
    category: "Icons",
    description: "A flexible icon family for interfaces.",
    url: "https://phosphoricons.com/",
  },
  {
    name: "React Icons",
    category: "Icons",
    description: "Popular icons as React components.",
    url: "https://react-icons.github.io/react-icons/",
  },
  // UI Libraries
  {
    name: "shadcn/ui",
    category: "UI",
    description: "Beautifully designed components built with Radix & Tailwind.",
    url: "https://ui.shadcn.com/",
  },
  {
    name: "Radix UI",
    category: "UI",
    description: "Primitives for building accessible design systems.",
    url: "https://www.radix-ui.com/",
  },
  {
    name: "Chakra UI",
    category: "UI",
    description: "Simple, modular & accessible component library.",
    url: "https://chakra-ui.com/",
  },
  {
    name: "Material UI",
    category: "UI",
    description: "React components for faster web development.",
    url: "https://mui.com/",
  },
  {
    name: "Tailwind CSS",
    category: "UI",
    description: "A utility-first CSS framework for rapid UI development.",
    url: "https://tailwindcss.com/",
  },
  // Tools
  {
    name: "LottieFiles",
    category: "Tools",
    description: "Free animations for web & apps in JSON format.",
    url: "https://lottiefiles.com/",
  },
  {
    name: "Animista",
    category: "Tools",
    description: "Play with ready-made CSS animations.",
    url: "https://animista.net/",
  },
  {
    name: "Haikei",
    category: "Tools",
    description: "Generate unique SVG shapes, blobs & patterns.",
    url: "https://haikei.app/",
  },
  {
    name: "SVG Repo",
    category: "Tools",
    description: "Thousands of free SVG icons & illustrations.",
    url: "https://www.svgrepo.com/",
  },
  {
    name: "React Hook Form",
    category: "Tools",
    description: "Performant, flexible forms with easy validation.",
    url: "https://react-hook-form.com/",
  },
  {
    name: "Figma",
    category: "Tools",
    description: "Collaborative interface design tool.",
    url: "https://www.figma.com/",
  },
  {
    name: "Unsplash",
    category: "Tools",
    description: "High-quality photos for your projects.",
    url: "https://unsplash.com/",
  },
];

// Card color scheme
const cardColors = {
  gradient:
    "from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000",
  border: "border-blue-200 dark:border-gray-700",
  badgeGradient: "from-blue-500 to-indigo-500",
  iconColor: "text-blue-600 dark:text-blue-400",
};

const Resourcehub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const cardsRef = useRef([]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(resources, {
        keys: ["name", "category", "description"],
        threshold: 0.3,
      }),
    []
  );

  // Filter resources with fuzzy search and highlight matches
  const filteredResources = useMemo(() => {
    if (!searchTerm) return resources;
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [searchTerm, fuse]);

  // GSAP scroll trigger animation for cards
  useGSAP(() => {
    if (!cardsRef.current) return;
    cardsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 80%",
            scrub:2
          },
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [filteredResources]);

  // Function to highlight matched search terms
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 dark:bg-yellow-600">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {/* Main heading with Framer Motion */}
      <motion.h1
        className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-800 mt-10 mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        ✨ Resources Hub ✨
      </motion.h1>

      {/* Subheading with Framer Motion */}
      <motion.p
        className="text-center mb-8 text-gray-600 dark:text-gray-400 text-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        A curated collection of animation, icon, UI libraries & tools for developers.
      </motion.p>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-2 border-blue-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res, index) => {
          const IconComponent = resourceIcons[res.name];

          return (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              ref={el => (cardsRef.current[index] = el)}
              className={`relative flex flex-col bg-gradient-to-br ${cardColors.gradient} backdrop-blur-xl border-2 ${cardColors.border} p-6 sm:p-8 rounded-3xl w-full min-h-[280px] transition-all duration-500 ease-out group overflow-hidden shadow-lg hover:shadow-2xl`}
            >
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon and category badge */}
                <div className="flex items-center justify-between mb-4">
                  {IconComponent && (
                    <div
                      className={`p-3 rounded-2xl bg-white/50 dark:bg-black/20 ${cardColors.iconColor}`}
                    >
                      <IconComponent size={24} />
                    </div>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${cardColors.badgeGradient} shadow-md`}
                  >
                    {highlightText(res.category, searchTerm)}
                  </span>
                </div>

                {/* Resource name */}
                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {highlightText(res.name, searchTerm)}
                </h2>

                {/* Resource description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                  {highlightText(res.description, searchTerm)}
                </p>

                {/* Visit button */}
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-purple-600 hover:to-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Visit</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Resourcehub;
