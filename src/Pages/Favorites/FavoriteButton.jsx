import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const FavoriteButton = ({ snippet, className = "", size = "md" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [justToggled, setJustToggled] = useState(false);
  
  const isSnippetFavorite = isFavorite(snippet);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const result = toggleFavorite(snippet);
    console.log('Favorite toggled:', snippet, 'Result:', result); // Debug log
    
    // Provide visual feedback
    setJustToggled(true);
    setTimeout(() => setJustToggled(false), 300);
  };

  const handleSignInPromptClick = (e) => {
    e.stopPropagation();
    setShowSignInPrompt(true);
    setTimeout(() => setShowSignInPrompt(false), 3000);
  };

  const sizeClasses = {
    sm: "text-sm p-1",
    md: "text-base p-2", 
    lg: "text-lg p-3"
  };

  const iconSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className="relative">
      <SignedIn>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={justToggled ? { scale: [1, 1.3, 1] } : {}}
          onClick={handleFavoriteClick}
          className={`${sizeClasses[size]} ${className} rounded-full transition-all duration-200 ${
            isSnippetFavorite
              ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
          title={isSnippetFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <motion.div
            initial={false}
            animate={isSnippetFavorite ? { scale: 1 } : { scale: 1 }}
          >
            {isSnippetFavorite ? (
              <AiFillHeart className={`${iconSizes[size]} drop-shadow-sm`} />
            ) : (
              <AiOutlineHeart className={iconSizes[size]} />
            )}
          </motion.div>
        </motion.button>
      </SignedIn>

      <SignedOut>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSignInPromptClick}
          className={`${sizeClasses[size]} ${className} text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-200`}
          title="Sign in to add to favorites"
        >
          <AiOutlineHeart className={iconSizes[size]} />
        </motion.button>

        {/* Sign-in prompt tooltip */}
        <AnimatePresence>
          {showSignInPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3 min-w-max">
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 text-center">
                  Sign in to save favorites
                </div>
                <div className="flex space-x-2">
                  <Link
                    to="/sign-in"
                    className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-2 py-1 rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-xs px-2 py-1 rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Sign Up
                  </Link>
                </div>
                {/* Arrow pointing up */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white dark:border-b-gray-800"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SignedOut>
    </div>
  );
};
FavoriteButton.propTypes = {
  snippet: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default FavoriteButton;
