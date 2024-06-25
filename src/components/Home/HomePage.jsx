import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4">
      <motion.h2
        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to AnimateHub
      </motion.h2>
      <motion.p
        className="text-base md:text-lg lg:text-xl mb-8 max-w-screen-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Explore various animated components and more! AnimateHub is an open-source project where you can find and contribute to a collection of animated UI components built with React and other modern web technologies.
      </motion.p>
      <motion.button
        className="text-white text-sm md:text-md lg:text-lg py-2 px-8 rounded-full shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-300"
        onClick={handleExploreClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Explore
      </motion.button>
    </div>
  );
};

export default HomePage;
