import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { templates } from "./AvailableTemplates";
import TemplateCard from "./TemplateCard";
import { Link } from "react-router-dom";

const TemplatesPage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
  ];

  // Parallax background elements
  const ParallaxBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary-200/10 dark:bg-accent-500/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
        className="absolute top-1/3 -right-1/4 w-80 h-80 bg-primary-300/10 dark:bg-accent-400/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-100/15 dark:bg-accent-600/5 rounded-full blur-3xl"
      />
    </div>
  );

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-6 pt-24 space-y-16 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white overflow-hidden">
      <ParallaxBackground />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl text-center space-y-6"
      >
        <motion.p
          className="mb-6 text-4xl font-extrabold md:text-6xl"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(45deg, #3B82F6, #8B5CF6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
            transition={{ duration: 0.3 }}
          >
            Introducing Templates
          </motion.span>{" "}
          <motion.span
            className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Handcrafted pages for your needs
          </motion.span>
        </motion.p>

        <motion.p
          className="mb-4 text-md md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Thoughtfully crafted components
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="inline-block px-4 py-1 font-semibold text-black bg-yellow-500 rounded-full text-md shadow-lg"
        >
          All the templates are open source
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgb(37 99 235)",
              color: "white"
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary-600 dark:border-accent-600 text-primary-600 dark:text-accent-600 hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg get-started-button transition-all duration-200"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Contribute on GitHub
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Tech Stack Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 flex mt-12 space-x-6"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <FaHtml5 className="w-12 h-12 text-orange-500 hover:drop-shadow-lg" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <FaCss3Alt className="w-12 h-12 text-blue-500 hover:drop-shadow-lg" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <FaReact className="w-12 h-12 text-cyan-500 hover:drop-shadow-lg" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <BiLogoTailwindCss className="w-12 h-12 text-teal-500 hover:drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section 
        className="relative z-10 w-full py-20 px-4 md:px-8 text-secondary-900 dark:text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why Choose Our Templates?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl shadow-sm hover:shadow-2xl duration-300 hover:border-primary-500 dark:hover:border-accent-500 transition-all relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-accent-100/20 dark:from-secondary-700/20 dark:to-accent-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
                
                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl font-semibold mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-md text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary-500/50 dark:border-accent-500/50 rounded-xl opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section 
        className="relative z-10 text-center space-y-8 py-12 px-4 md:px-0 md:w-[800px] mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary-200 dark:border-secondary-600 shadow-lg"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight text-secondary-900 dark:text-white transition-colors mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Create and Share Your Templates
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Contribute your own creative templates and be part of a growing community! Help others by sharing your ideas and discover inspiring animations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="https://github.com/Premkolte/AnimateHub"
              target="_blank"
              className="inline-block"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary-600 dark:bg-accent-500 text-white rounded-full font-medium text-sm sm:text-base transition hover:bg-primary-700 dark:hover:bg-accent-600 shadow-md transform active:scale-100 duration-300 hover:shadow-xl"
              >
                🚀 Get Started
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Templates Section */}
      <motion.section 
        className="relative z-10 py-16 space-y-8 text-center w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold md:text-5xl mb-4">
            Available Templates
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto rounded-full" />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3 px-4 md:px-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.03,
                rotateY: 5,
                rotateX: 5,
                transition: { 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }
              }}
              className="group relative transform-gpu"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Animated shadow/glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Floating particles effect on hover */}
              <motion.div
                className="absolute -top-2 -left-2 w-4 h-4 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -top-1 -right-3 w-3 h-3 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, -15, 0],
                  x: [0, -8, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-2 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, -8, 0],
                  x: [0, -3, 0],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Enhanced border animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Card wrapper with enhanced animations */}
              <motion.div
                className="relative z-10 bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden"
                whileHover={{
                  boxShadow: [
                    "0 10px 30px rgba(0,0,0,0.1)",
                    "0 20px 60px rgba(59, 130, 246, 0.15)",
                    "0 30px 90px rgba(139, 92, 246, 0.2)"
                  ],
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Shimmer effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ 
                    x: "200%",
                    transition: { 
                      duration: 1.5,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                <TemplateCard template={template} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default TemplatesPage;