import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCode, FaHeart, FaDownload, FaUsers } from "react-icons/fa";
import { useFavorites } from "../../contexts/FavoritesContext";

const WelcomeMessage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6 mb-8">
      <SignedOut>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center">
                <FaCode className="text-indigo-600 dark:text-indigo-400 text-xl" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                Welcome to AnimateHub! 🎉
              </h3>
              <p className="text-indigo-700 dark:text-indigo-300 text-sm mb-4">
                Explore thousands of free UI components and animations. No account required to browse and copy code snippets!
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <FaCode className="text-indigo-500 text-sm" />
                  <span className="text-xs text-indigo-700 dark:text-indigo-300">Free code snippets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaDownload className="text-indigo-500 text-sm" />
                  <span className="text-xs text-indigo-700 dark:text-indigo-300">Copy & paste ready</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Want to save favorites & unlock premium features?
                </p>
                <div className="flex space-x-2">
                  <Link
                    to="/sign-in"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-md transition duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs px-3 py-1 rounded-md transition duration-200"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SignedOut>

      <SignedIn>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                <FaHeart className="text-green-600 dark:text-green-400 text-xl" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Welcome back! 👋
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                You're all set! Enjoy premium features like saving favorites, creating collections, and more.
                {favorites.length > 0 && (
                  <span className="font-medium"> You have {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}.</span>
                )}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <FaHeart className="text-green-500 text-sm" />
                  <span className="text-xs text-green-700 dark:text-green-300">
                    {favorites.length} saved favorite{favorites.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-green-500 text-sm" />
                  <span className="text-xs text-green-700 dark:text-green-300">Join community</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaDownload className="text-green-500 text-sm" />
                  <span className="text-xs text-green-700 dark:text-green-300">Premium templates</span>
                </div>
              </div>
              {favorites.length > 0 && (
                <div className="mt-3">
                  <Link
                    to="/favorites"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium hover:underline"
                  >
                    View your favorites →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </SignedIn>
    </div>
  );
};

export default WelcomeMessage;
