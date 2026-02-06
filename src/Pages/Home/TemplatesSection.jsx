import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LayoutTemplate, Plus, Layers, Lock, ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  tap: {
    scale: 0.98
  }
};

const templates = [
  {
    name: "Landing Pages",
    description:
      "Beautiful, conversion-focused landing page templates for your next project.",
    link: "/templates",
    icon: LayoutTemplate,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    bgGlow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
  },
  {
    name: "Dashboards",
    description:
      "Powerful dashboard templates with various layouts and components.",
    link: "/templates",
    icon: Layers,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgGlow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]",
  },
  {
    name: "Authentication",
    description: "Secure and modern authentication flows ready to implement.",
    link: "/templates",
    icon: Lock,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    bgGlow: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]",
  },
];


const TemplatesSection = () => {
  return (
    <section className="w-full py-4 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
              }
            }
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-pink-500 dark:from-primary-400 dark:via-accent-400 dark:to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Ready-to-Use Templates
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-secondary-600 dark:text-secondary-300">
            Jumpstart your projects with our collection of professionally designed templates.
          </p>
        </motion.div>

        {/* Template Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto mb-16"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {templates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -12, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                whileTap="tap"
                className={`group relative bg-white dark:bg-secondary-800/90 p-8 rounded-3xl 
                  border border-secondary-200/50 dark:border-secondary-700/50
                  flex flex-col items-center text-center
                  transition-all duration-500 ease-out cursor-pointer overflow-hidden
                  ${template.bgGlow} dark:group-hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]`}
              >
                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${template.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]`}>
                  <div className="w-full h-full bg-white dark:bg-secondary-800 rounded-3xl" />
                </div>

                {/* Content container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon with gradient background */}
                  <motion.div 
                    className={`relative w-20 h-20 flex items-center justify-center rounded-2xl mb-6 bg-gradient-to-br ${template.gradient} shadow-lg`}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent size={36} className="text-white" />
                    {/* Glow effect behind icon */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${template.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300`} />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-secondary-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {template.name}
                  </h3>
                  
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6 group-hover:text-secondary-700 dark:group-hover:text-secondary-200 transition-colors duration-300">
                    {template.description}
                  </p>
                  
                  <Link
                    to={template.link}
                    className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${template.gradient} bg-clip-text text-transparent group-hover:gap-4 transition-all duration-300`}
                  >
                    <span>Explore Templates</span>
                    <ArrowRight size={18} className={`text-primary-600 dark:text-accent-500 group-hover:translate-x-1 transition-transform duration-300`} />
                  </Link>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-500" />
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-500 animation-delay-300" />
                <div className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-500 animation-delay-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          variants={item}
        >
          <Link to="/templates">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 text-lg font-semibold text-white
                rounded-xl overflow-hidden shadow-lg"
            >
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-pink-600 bg-[length:200%_auto] animate-gradient" />
              {/* Hover glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500 via-accent-500 to-pink-500 blur-xl" />
              <span className="relative z-10 flex items-center gap-2">
                View All Templates
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>

          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-2 px-8 py-4 text-lg font-semibold
              bg-white dark:bg-secondary-800/90 backdrop-blur-sm
              text-secondary-900 dark:text-white
              rounded-xl shadow-lg overflow-hidden
              border-2 border-transparent hover:border-primary-500 dark:hover:border-accent-500 transition-all duration-300"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-100/50 dark:via-accent-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Submit a Template</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TemplatesSection;
