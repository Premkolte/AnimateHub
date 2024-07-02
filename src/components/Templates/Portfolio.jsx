import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import TemplateNavBar from "./TemplateNavBar";

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <>
      <TemplateNavBar templateName="Portfolio" />

      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 space-y-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <motion.p
            className="text-4xl md:text-6xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.p>
          <p className="text-md mb-10">
            Explore our latest projects and creations showcased here.
          </p>

          <div className="flex space-x-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Browse Components
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-white text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => {
                window.location.href = "https://github.com/Premkolte/AnimateHub";
              }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
          {/* Project 1 */}
          <motion.div
            className="bg-slate-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-extrabold text-2xl mb-2">Project 1</h2>
            <p className="opacity-80 mb-4">
              A description of the project or a brief overview.
            </p>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
                View Project
              </button>
              <div className="flex items-center space-x-2">
                <FaHtml5 className="h-6 w-6" />
                <FaCss3Alt className="h-6 w-6" />
                <FaReact className="h-6 w-6" />
                <BiLogoTailwindCss className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            className="bg-slate-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-extrabold text-2xl mb-2">Project 2</h2>
            <p className="opacity-80 mb-4">
              Another description of a different project.
            </p>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
                View Project
              </button>
              <div className="flex items-center space-x-2">
                <FaHtml5 className="h-6 w-6" />
                <FaCss3Alt className="h-6 w-6" />
                <FaReact className="h-6 w-6" />
                <BiLogoTailwindCss className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div
            className="bg-slate-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-extrabold text-2xl mb-2">Project 3</h2>
            <p className="opacity-80 mb-4">
              Yet another project description goes here.
            </p>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
                View Project
              </button>
              <div className="flex items-center space-x-2">
                <FaHtml5 className="h-6 w-6" />
                <FaCss3Alt className="h-6 w-6" />
                <FaReact className="h-6 w-6" />
                <BiLogoTailwindCss className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
