import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontWeight: 600, fontSize: '7rem' }} // Adjusted font weight and size
      >
        Welcome to AnimateHub
      </motion.h1>
      <motion.p
        className="text-lg mb-8 max-w-2xl text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Explore various animated components and more! AnimateHub is an open-source project where you can find and contribute to a collection of animated UI components built with React and other modern web technologies.
      </motion.p>
      <motion.button
        className="text-white text-md py-2 px-8 rounded-full shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-300"
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
