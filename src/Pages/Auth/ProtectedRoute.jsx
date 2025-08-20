
import React from "react";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthStore();

  if (currentUser) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-secondary-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center border border-primary-100 dark:border-secondary-700"
      >
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-primary-100 dark:bg-accent-900/30 rounded-full">
            <FaLock className="h-10 w-10 text-primary-600 dark:text-accent-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-3">
          Authentication Required
        </h2>
        
        <p className="text-secondary-600 dark:text-secondary-300 mb-8">
          Sign in to access this feature and unlock the full potential of AnimateHub.
        </p>
        
        <div className="space-y-4 flex flex-col">
          <Link to="/sign-in">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </motion.button>
          </Link>
          
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white dark:bg-secondary-700 text-primary-600 dark:text-accent-400 hover:bg-gray-50 dark:hover:bg-secondary-600 font-semibold py-3 px-6 rounded-xl border-2 border-primary-200 dark:border-secondary-600 transition-all duration-200"
            >
              Create Account
            </motion.button>
          </Link>
          
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center text-primary-600 dark:text-accent-400 hover:text-primary-700 dark:hover:text-accent-300 font-medium transition-colors duration-200 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
              <span className="ml-1">Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProtectedRoute;
