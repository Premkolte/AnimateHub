import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsStarFill } from "react-icons/bs";

const LandPage = ({ currentUser }) => {
  const navigate = useNavigate();

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
        <button
          className="rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:scale-105 transition-transform"
          onClick={() => navigate("/explore")}
        >
          Browse Components
        </button>

        <button
          className="rounded-full border-2 border-blue-400 bg-transparent px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-400 hover:text-white shadow-sm hover:shadow-md transition-all hover:scale-105"
          onClick={() => window.open("https://github.com/Premkolte/AnimateHub", "_blank")}
        >
          Get Started
        </button>

        {currentUser ? (
          <button
            className="flex items-center gap-2 rounded-full bg-gradient-to-br from-red-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-md hover:scale-105 transition-transform"
            onClick={() => navigate("/favorites")}
          >
            <FaHeart />
            My Favorites
          </button>
        ) : (
          <button
            className="flex items-center gap-2 rounded-full border-2 border-red-400 bg-transparent px-8 py-4 text-lg font-semibold text-red-600 hover:bg-red-400 hover:text-white shadow-sm hover:shadow-md hover:scale-105 transition-all"
            onClick={() => navigate("/sign-in")}
          >
            <FaHeart />
            Sign In for Favorites
          </button>
        )}
      </div>
      <section className="flex flex-col items-center space-y-6 mt-16">
        <div className="flex space-x-6 justify-center">
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">
            <FaHtml5 className="h-12 w-12 text-orange-600 hover:scale-110 transition-transform" />
          </a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">
            <FaCss3Alt className="h-12 w-12 text-blue-600 hover:scale-110 transition-transform" />
          </a>
          <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer">
            <FaReact className="h-12 w-12 text-sky-500 hover:scale-110 transition-transform" />
          </a>
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
            <BiLogoTailwindCss className="h-12 w-12 text-teal-400 hover:scale-110 transition-transform" />
          </a>
        </div>

        <a
          href="https://github.com/Premkolte/AnimateHub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-6 py-3 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium shadow-md hover:scale-105 transition-transform"
        >
          <BsGithub size={22} />
          <span>Star on GitHub</span>
          <BsStarFill size={22} className="text-yellow-400" />
        </a>
      </section>
    </motion.div>
  );
};

export default LandPage;
