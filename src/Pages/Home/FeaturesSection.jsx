import React from "react";
import { motion } from "framer-motion";
import { Rocket, BookOpen, Heart, GitBranch, Users, Bookmark } from "lucide-react";

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

const features = [
  {
    icon: (
      <Rocket
        size={50}
        className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
      />
    ),
    title: "Ready-to-Use Components",
    description:
      "Copy, paste, and customize beautiful components with minimal setup. Get started in seconds.",
  },
  {
    icon: (
      <BookOpen
        size={50}
        className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
      />
    ),
    title: "Comprehensive Docs",
    description:
      "Detailed documentation with live examples and API references for every component.",
  },
  {
    icon: (
      <Heart
        size={50}
        className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
      />
    ),
    title: "Modern & Accessible",
    description:
      "Beautifully designed components that follow accessibility best practices.",
  },
  {
    icon: (
      <GitBranch
        size={50}
        className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
      />
    ),
    title: "Open Source",
    description:
      "Contribute to the project and see your components used by developers worldwide.",
  },
  {
    icon: (
      <Users
        size={50}
        className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
      />
    ),
    title: "Community Driven",
    description:
      "Vote on features and help shape the future of the library.",
  },
  {
    icon: (
      <Bookmark
        size={50}
        className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
      />
    ),
    title: "Save Favorites",
    description:
      "Bookmark your most-used components for quick access.",
  }
];

const FeaturesSection = () => {

  return (
    <section className="bg-secondary-50 dark:bg-secondary-900 w-full py-20 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 md:mb-20 text-primary-600 dark:text-accent-500 text-center"
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
          Why Choose AnimateHub?
        </motion.h2>

        {/* Features Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto"
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileTap="tap"
              className="bg-white dark:bg-secondary-900 
                text-secondary-800 dark:text-white 
                border border-secondary-200 dark:border-secondary-600 
                p-8 rounded-2xl shadow-lg 
                hover:shadow-xl
                transition-all duration-300 ease-in-out
                max-w-md mx-auto w-full
                flex flex-col items-center justify-center
                hover:shadow-[0_0_12px_2px_rgba(59,130,246,0.7)]
                h-full hover:border-primary-600 dark:hover:border-accent-600
                transform transition-all duration-700 hover:scale-105 
                dark:hover:shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]"
            >
              {/* Wrapper keeps icon + text block vertically centered */}
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-20 h-20 flex items-center justify-center rounded-2xl mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-secondary-900 dark:text-white text-center leading-tight">
                  {feature.title}
                </h3>

                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
