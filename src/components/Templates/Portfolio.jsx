import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHtml5, FaCss3Alt, FaReact, FaGithub } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

const Portfolio = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce platform with product listings, cart, and checkout functionality.",
      tech: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />, <FaReact key="react" />, <BiLogoTailwindCss key="tailwind" />]
    },
    {
      title: "Task Management App",
      description: "A productivity app for managing tasks with drag-and-drop functionality and due dates.",
      tech: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />, <FaReact key="react" />]
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website to showcase work and skills with smooth animations.",
      tech: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />, <BiLogoTailwindCss key="tailwind" />]
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Portfolio</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Explore our latest projects and creations showcased here.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors duration-200"
            onClick={() => navigate("/explore")}
          >
            Browse Components
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-primary-600 dark:border-accent-600 text-primary-600 dark:text-accent-600 hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-200"
          >
            <BsGithub className="text-xl" />
            View on GitHub
          </motion.a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="h-48 bg-gray-100 dark:bg-secondary-700 flex items-center justify-center">
              <div className="text-4xl text-gray-400">
                <FaGithub />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {project.tech.map((icon, i) => (
                    <span key={i} className="text-gray-700 dark:text-gray-400">
                      {icon}
                    </span>
                  ))}
                </div>
                <button className="text-primary-600 dark:text-accent-500 hover:text-primary-800 dark:hover:text-accent-400 font-medium transition-colors">
                  View Project →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Want to see your project featured here?
        </p>
        <motion.a
          href="https://github.com/Premkolte/AnimateHub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondary-800 dark:bg-secondary-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <BsGithub className="text-xl" />
          Contribute to AnimateHub
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Portfolio;
