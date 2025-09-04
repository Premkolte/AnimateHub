import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';

const Contributors = () => {

  return (
    <section className="contributors-section mt-24 w-full flex justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl rounded-2xl p-10 md:p-14 
          bg-white/10 dark:bg-black/20 backdrop-blur-xl 
          border border-white/20 shadow-xl text-center"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-4 
            bg-gradient-to-r from-blue-600 to-indigo-600 
            dark:from-purple-400 dark:to-blue-400 
            bg-clip-text text-transparent"
        >
          Contributors
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-10 text-lg opacity-80"
        >
          Meet the talented developers, designers, and open-source
          contributors who made this platform possible. Join the crew and
          help shape the future 🚀
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link to="/contributors">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="px-8 py-3 rounded-full text-lg font-semibold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600 
                shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
            >
              View Contributors
            </motion.button>
          </Link>

          <Link to="/contributor-guide">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold
                bg-white/10 backdrop-blur-md border border-white/20 
                text-secondary-900 dark:text-white
                shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 cursor-pointer"
            >
              <BsGithub className="text-xl" />
              Become a Contributor
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contributors;
