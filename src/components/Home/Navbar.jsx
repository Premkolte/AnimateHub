import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle'; // Adjust the import path as per your file structure

const Navbar = () => {
  return (
    <motion.nav
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-lg fixed top-0 left-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-lg md:text-xl lg:text-2xl font-bold" // Responsive font size
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AnimateHub
          </motion.div>
          <div className="flex space-x-4 md:space-x-6 items-center"> {/* Added items-center for vertical alignment */}
            <motion.div
              className="hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/">Home</Link>
            </motion.div>
            <motion.div
              className="hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/explore">Explore</Link>
            </motion.div>
            <motion.div
              className="hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/about">About</Link>
            </motion.div>
            <motion.div
              className="hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/contact">Contact</Link>
            </motion.div>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
