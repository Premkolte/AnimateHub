import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FontAwesome (fa)
import {
  FaGithub,
  FaHeart,
  FaUsers,
  FaStar,
  FaPuzzlePiece,
  FaPalette,
  FaHtml5,
  FaCss3Alt,
  FaReact,
} from "react-icons/fa";

// Bootstrap icons (bs)
import { BsGithub, BsStarFill } from "react-icons/bs";

// Simple Icons (si)
import { SiTailwindcss } from "react-icons/si";

const featureButtons = [
  {
    name: "Components",
    icon: <FaPuzzlePiece />,
    color: "from-purple-600 to-indigo-600",
  },
  { name: "Community", icon: <FaUsers />, color: "from-green-400 to-teal-500" },
  { name: "GitHub", icon: <FaGithub />, color: "from-gray-700 to-black" },
  {
    name: "Leaderboard",
    icon: <FaStar />,
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "ResourceHub",
    icon: <FaPalette />,
    color: "from-pink-500 to-red-500",
  },
  { name: "Playgrounds", icon: <FaHeart />, color: "from-red-400 to-pink-500" },
];

const carouselTexts = [
  "Welcome!",
  "Explore Components!",
  "Join the Community!",
  "Build with AnimateHub!",
];
const words = [
  "Open-Source.",
  "Beautiful.",
  "Animated.",
  "Developer-Friendly.",
];

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);

  // cycle words every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-between 
  px-6 md:px-16 pt-0 pb-10 gap-10 bg-transparent"
    >
      {/* Left Side: Title, Tagline, Buttons */}
      <div className="flex-1 flex flex-col items-start justify-center space-y-8">
        <motion.div
          className="px-5 py-2 rounded-full text-sm font-semibold text-white shadow-lg cursor-pointer"
          style={{
            background:
              "linear-gradient(270deg, #6b5bff, #ff6ec7, #42d9ff, #6b5bff)",
            backgroundSize: "600% 600%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(107, 91, 255, 0.7)",
          }}
        >
          100% OPEN-SOURCE
        </motion.div>

        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight 
        text-transparent bg-clip-text  
        bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.3 }}
          >
            AnimateHub
          </motion.h1>

          <motion.p
            className="mt-4 text-2xl font-semibold text-left text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            UI Library for Developers
          </motion.p>
        </div>

        <motion.p
          className="mt-4 text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Build with{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWord}
              className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {words[currentWord]}
            </motion.span>
          </AnimatePresence>
        </motion.p>
        <section className="flex flex-col items-center space-y-10 mt-8 relative">
  {/* Tech Icons Row */}
  <div className="flex space-x-8">
    <motion.a
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      href="https://developer.mozilla.org/en-US/docs/Web/HTML"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 shadow-md hover:shadow-xl transition"
    >
      <FaHtml5 className="h-12 w-12 text-orange-500" />
    </motion.a>

    <motion.a
      whileHover={{ scale: 1.2, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      href="https://developer.mozilla.org/en-US/docs/Web/CSS"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 shadow-md hover:shadow-xl transition"
    >
      <FaCss3Alt className="h-12 w-12 text-blue-500" />
    </motion.a>

    <motion.a
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      href="https://react.dev/learn"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 shadow-md hover:shadow-xl transition"
    >
      <FaReact className="h-12 w-12 text-cyan-400" />
    </motion.a>

    <motion.a
      whileHover={{ scale: 1.2, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      href="https://tailwindcss.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/20 shadow-md hover:shadow-xl transition"
    >
      <SiTailwindcss className="h-12 w-12 text-sky-400" />
    </motion.a>
  </div>

  {/* GitHub Button */}
  <motion.a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/Premkolte/AnimateHub"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-4 px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
  >
    <BsGithub className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
    <span className="text-white">Star on GitHub</span>
    <BsStarFill className="text-yellow-400 text-2xl group-hover:scale-125 transition-transform duration-300" />
  </motion.a>
</section>

      </div>

      {/* Right Side: Wider Tablet Mockup with black screen & animated carousel */}
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-[400px] h-[520px] md:w-[460px] md:h-[500px] bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-secondary-800 dark:to-secondary-700 rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-600 dark:border-gray-600">
          {/* Screen Content */}
          <div
            className="absolute inset-4 rounded-2xl flex flex-col items-center justify-start p-4 shadow-inner overflow-hidden space-y-4"
            style={{
              background:
                "linear-gradient(270deg, #6b5bff, #a66effff, #51c8ffff, #6b5bff)",
              backgroundSize: "600% 600%",
              animation: "gradientMove 15s ease infinite",
            }}
          >
            {/* Carousel */}
            <div className="w-full h-28 flex items-center justify-center relative overflow-hidden mb-12">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-white text-center"
                >
                  {carouselTexts[currentSlide]}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Feature Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-8 w-full">
              {featureButtons.map((btn, idx) => (
                <motion.button
                  key={idx}
                  className={`flex items-center justify-center gap-2 px-3 py-4 rounded-xl text-white font-medium shadow-md bg-gradient-to-r ${btn.color}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  {btn.icon} {btn.name}
                </motion.button>
              ))}
            </div>
          </div>
          <style>
            {`
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}
          </style>

          {/* Tablet Buttons/Decorations */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
