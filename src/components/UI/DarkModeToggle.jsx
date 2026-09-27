import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme]);

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      aria-label="Toggle dark mode (Ctrl+K)"
      title="Toggle dark mode (Ctrl+K)"
      role="switch"
      aria-checked={theme === 'dark'}
    >
      <motion.div
        className="bg-white rounded-full w-6 h-6 shadow-md flex items-center justify-center relative"
        initial={false}
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
