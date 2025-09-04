import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LayoutTemplate, Plus } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
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
    description: "Beautiful, conversion-focused landing page templates for your next project.",
    link: "/",
    icon: <LayoutTemplate size={40} className="text-primary-600 dark:text-accent-500" />
  },
  {
    name: "Dashboards",
    description: "Powerful dashboard templates with various layouts and components.",
    link: "/",
    icon: <LayoutTemplate size={40} className="text-primary-600 dark:text-accent-500" />
  },
  {
    name: "Authentication",
    description: "Secure and modern authentication flows ready to implement.",
    link: "/",
    icon: <LayoutTemplate size={40} className="text-primary-600 dark:text-accent-500" />
  }
]





const TemplatesSection = () => {
  return (
    <section className="w-full py-20 overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-600 dark:text-accent-500">
            Ready-to-Use Templates
          </h2>
          <p className="max-w-2xl mx-auto text-secondary-600 dark:text-secondary-300 text-lg">
            Jumpstart your projects with our collection of professionally designed templates.
          </p>
        </motion.div>

        {/* Template Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto mb-16"
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

          {/* Templates Cards */}
          {templates.map((template) => (
            <motion.div
              key={template.name}
              variants={item}
              className="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg border border-secondary-200 dark:border-secondary-600 hover:shadow-xl hover:border-primary-600 dark:hover:border-accent-600 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl mb-6">
                {template.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary-900 dark:text-white">
                {template.name}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                {template.description}
              </p>
              <Link
                to={template.link}
                className="text-primary-600 dark:text-accent-500 font-medium hover:underline"
              >
                Explore Templates →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          variants={item}
        >
          <Link to="/templates">
            <motion.button
              className="px-8 py-3.5 text-lg font-semibold text-white
              bg-primary-600 hover:bg-primary-700 dark:bg-accent-500 dark:hover:bg-accent-600
              rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Templates
            </motion.button>
          </Link>

          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 text-lg font-semibold
            bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600
            text-secondary-900 dark:text-white
            rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            border border-secondary-200 dark:border-secondary-600"
          >
            <Plus size={20} />
            Submit a Template
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TemplatesSection;
