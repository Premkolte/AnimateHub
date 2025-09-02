import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsStarFill } from "react-icons/bs";

const LandPage = ({ currentUser }) => {
  const navigate = useNavigate();

  // State for hover effect on "Browse Components" button
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position inside button
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className="text-center max-w-3xl mx-auto px-4 mt-28"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-primary-600 dark:bg-accent-600 text-white px-4 py-1 rounded-full inline-block text-sm mb-6">
        100% OPEN-SOURCE
      </div>

      <motion.p
        className="text-4xl md:text-6xl mb-6 font-bold"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        Animation UI Library <br /> for Developers
      </motion.p>

      <p className="text-md mb-10">
        Open-sourced components made with
        <br />
        <span className="font-bold">HTML + CSS</span> &{" "}
        <span className="font-bold">React + Tailwind</span>.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        {/* Browse Components Button */}
        <motion.button
          style={{ position: "relative", overflow: "hidden" }}
          className="browse-components-button rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => navigate("/explore")}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-full"
            style={{
              background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 222, 105, 0.5), transparent 80%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <span className="relative z-10">Browse Components</span>
        </motion.button>

        {/* Fancy Secondary Button */}
        <motion.button
          className="get-started-button rounded-full border-2 border-blue-400 bg-transparent px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-400 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105"
          whileHover={{ scale: 1.035 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() =>
            window.open("https://github.com/Premkolte/AnimateHub", "_blank")
          }
        >
          Get Started
        </motion.button>

        {/* Favorites Button */}
        {currentUser ? (
          <motion.button
            className="flex items-center gap-2 rounded-full bg-gradient-to-br from-red-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-105"
            whileHover={{ scale: 1.035 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => navigate("/favorites")}
          >
            <FaHeart />
            My Favorites
          </motion.button>
        ) : (
          <motion.button
            className="flex items-center gap-2 rounded-full border-2 border-red-400 bg-transparent px-8 py-4 text-lg font-semibold text-red-600 hover:bg-red-400 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105"
            whileHover={{ scale: 1.035 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => navigate("/sign-in")}
          >
            <FaHeart />
            Sign In for Favorites
          </motion.button>
        )}
      </div>
      <section className="flex flex-col items-center space-y-6 mt-16">
        {/* Tech Icons */}
        <div className="flex space-x-6 justify-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML"
          >
            <FaHtml5 className="h-12 w-12 text-orange-600" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS"
          >
            <FaCss3Alt className="h-12 w-12 text-blue-600" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://react.dev/learn"
          >
            <FaReact className="h-12 w-12 text-sky-500" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://tailwindcss.com/"
          >
            <BiLogoTailwindCss className="h-12 w-12 text-teal-400" />
          </a>
        </div>

        {/* GitHub Star Button */}
        <motion.a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Premkolte/AnimateHub"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-3 px-6 py-3 h-12 rounded-xl bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out shadow-md"
        >
          <BsGithub color="white" size={22} />
          <span className="text-white font-medium text-base">
            Star on GitHub
          </span>
          <BsStarFill size={22} className="text-yellow-400" />
        </motion.a>
      </section>
    </motion.div>
  );
};

export default LandPage;
