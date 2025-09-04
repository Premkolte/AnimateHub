import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';

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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const Contributors = () => {
  return (
    <section className="w-full py-20 overflow-hidden bg-secondary-50 dark:bg-secondary-900/30">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-primary-600 dark:text-accent-500 text-center"
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
          Our Amazing Contributors
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="max-w-2xl mx-auto mb-12 text-center text-secondary-600 dark:text-secondary-300 text-lg"
          variants={item}
        >
          Meet the talented developers, designers, and open-source contributors
          who made this platform possible. Join the crew and help shape the future 🚀
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          variants={item}
        >
          <Link to="/contributors" className="group">
            <motion.button
              className="px-8 py-3 rounded-lg text-base font-medium text-white
                bg-primary-600 dark:bg-accent-600 group-hover:bg-primary-700 dark:group-hover:bg-accent-700 
                shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300"
            >
              View Contributors
            </motion.button>
          </Link>

          <Link to="/contributor-guide" className="group">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-base font-medium
                bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-600
                text-secondary-900 dark:text-white group-hover:bg-secondary-100 dark:group-hover:bg-secondary-700
                shadow group-hover:shadow-md transition-all duration-300"
            >
              <BsGithub className="text-lg" />
              Become a Contributor
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contributors;
