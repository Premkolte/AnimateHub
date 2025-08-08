import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { templates } from "./AvailableTemplates";
import TemplateCard from "./TemplateCard";
import { Link } from "react-router-dom";

const TemplatesPage = () => {

  const features = [
    {
      title: "💡 Ready to Use",
      description:
        "Skip the boilerplate. Our templates are pre-built with animations and responsive design, ready to plug into your projects.",
    },
    {
      title: "🧩 Built with Modern Stack",
      description:
        "Powered by React, Tailwind CSS, and Framer Motion — you get best-in-class tools to work with.",
    },
    {
      title: "🌗 Light & Dark Mode",
      description:
        "Fully responsive and theme-aware. Your templates will look great in both light and dark environments.",
    },
    {
      title: "📦 Easily Customizable",
      description:
        "Tweak colors, layout, or motion effects effortlessly — built with utility-first classes and modular structure.",
    },
    {
      title: "🚀 Performance Focused",
      description:
        "Optimized for fast load times using Vite 5 and tree-shaken components. No unnecessary bloat.",
    },
    {
      title: "🤝 Open Source & Community Driven",
      description:
        "All templates are open source and community-powered. Contribute or fork with ease on GitHub.",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 pt-24 space-y-16 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white">

      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center"
      >
        <motion.p
          className="mb-6 text-4xl font-extrabold md:text-6xl"
        >
          Introducing Templates Handcrafted pages for your needs
        </motion.p>
        <p className="mb-4 text-md md:text-lg">
          Thoughtfully crafted components
        </p>

        <div className="inline-block px-4 py-1 font-semibold text-black bg-yellow-500 rounded-full text-md">
          All the templates are open source
        </div>

        <div className="flex justify-center mt-8 space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-lg"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="border-2 border-primary-600 dark:border-accent-600 text-primary-600 dark:text-accent-600 hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg get-started-button transition-all duration-200"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Contribute on GitHub
          </motion.button>
        </div>
      </motion.section>

      <div className="flex mt-12 space-x-6">
        <FaHtml5 className="w-12 h-12" />
        <FaCss3Alt className="w-12 h-12" />
        <FaReact className="w-12 h-12" />
        <BiLogoTailwindCss className="w-12 h-12" />
      </div>


      <section className="w-full py-20 px-4 md:px-8 text-secondary-900 dark:text-white">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Why Choose Our Templates?
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-xl border border-primary-200 dark:border-secondary-700 bg-primary-50 dark:bg-secondary-800 shadow-sm hover:shadow-md duration-300 hover:border-primary-500 dark:hover:border-accent-500 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-md text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="text-center space-y-8 py-12 px-4 md:px-0 md:w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-secondary-900 dark:text-white transition-colors">
          Create and Share Your Templates
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Contribute your own creative templates and be part of a growing community! Help others by sharing your ideas and discover inspiring animations.
        </p>

        <Link
          to="https://github.com/Premkolte/AnimateHub"
          target="_blank"
          className="inline-block px-6 py-3 text-sm sm:text-base md:text-lg font-semibold tracking-wide rounded-full text-white bg-gradient-to-br from-purple-600 to-pink-500 shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-100"
        >
          🚀 Get Started
        </Link>
      </section>




      <section className="py-16 space-y-8 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Available Templates
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {templates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TemplatesPage;
