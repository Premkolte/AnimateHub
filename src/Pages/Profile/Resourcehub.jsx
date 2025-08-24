import React from "react";
import { motion } from "framer-motion";

// List of resources to display in the hub
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
];

// Define colors for each category: background, border, and text
const categoryColors = {
  Animation: {
    bg: "bg-pink-100",
    border: "border-pink-600",
    text: "text-pink-600",
  },
  Icons: {
    bg: "bg-green-100",
    border: "border-green-600",
    text: "text-green-600",
  },
  UI: {
    bg: "bg-purple-100",
    border: "border-purple-600",
    text: "text-purple-600",
  },
  Tools: {
    bg: "bg-yellow-100",
    border: "border-yellow-600",
    text: "text-yellow-600",
  },
};

const Resourcehub = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Main heading with gradient text */}
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-800 mt-10 mb-6">
        ✨ Resources Hub ✨
      </h1>

      {/* Subheading / description */}
      <p className="text-center mb-12 text-gray-600 dark:text-gray-400 text-lg">
        A curated collection of animation, icon, UI libraries & tools for
        developers.
      </p>

      {/* Grid layout for resource cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.03 }} // Animate lift & scale on hover
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col justify-between hover:shadow-[0_4px_15px_rgba(79,70,229,0.3)]"
          >
            <div>
              {/* Resource name */}
              <h2 className="text-2xl font-semibold mb-3">{res.name}</h2>

              {/* Category badge with light bg, colored border and text */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 border ${
                  categoryColors[res.category].border
                } ${categoryColors[res.category].bg} ${
                  categoryColors[res.category].text
                }`}
              >
                {res.category}
              </span>

              {/* Resource description */}
              <p className="text-gray-600 dark:text-gray-300">
                {res.description}
              </p>
            </div>

            {/* Visit button with gradient background */}
            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block w-full text-center py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
            >
              Visit →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resourcehub;
