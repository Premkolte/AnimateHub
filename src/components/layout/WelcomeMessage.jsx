import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCode, FaHeart, FaDownload, FaUsers, FaStar, FaRocket } from "react-icons/fa";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuthStore } from "../../store/authStore";

const WelcomeMessage = () => {
  const { favorites } = useFavorites();
  const { currentUser } = useAuthStore();

  return (
    <div className="my-6">
      {currentUser ?
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
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
            </div>
          </motion.div>
        </>
        :
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 rounded-xl p-6 shadow-lg shadow-indigo-100/30 dark:shadow-indigo-900/10">

              {/* Subtle decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Left content */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <FaRocket className="text-white text-lg" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome to AnimateHub! ✨
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Explore free UI components • No signup required to browse
                    </p>
                  </div>
                </div>

                {/* Right actions */}
                <div className="gap-2 flex items-center flex-col">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Want to save favorites & unlock premium features?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-shrink-0">
                    <Link
                      to="/sign-in"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-center text-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-white/80 dark:bg-gray-800/80 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-600 text-center text-sm backdrop-blur-sm"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom features */}
              <div className="mt-4 pt-4 border-t border-indigo-200/30 dark:border-indigo-700/30">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FaCode className="text-indigo-500 text-xs" />
                    <span>1000+ components</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-indigo-500 text-xs" />
                    <span>Copy & paste ready</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Always free</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      }
    </div>
  );
};

export default WelcomeMessage;