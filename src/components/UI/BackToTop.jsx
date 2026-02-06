import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 205);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="fixed bottom-6 right-6 z-[999] w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-accent-500 dark:to-accent-600 text-white shadow-lg cursor-pointer overflow-hidden group"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
          
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="white"
            viewBox="0 0 24 24"
            className="relative z-10"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5.5l-6.5 6.5 1.4 1.4L12 8.3l5.1 5.1 1.4-1.4L12 5.5z" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
