import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCode, FaTrash, FaEye } from 'react-icons/fa';
import { useFavorites } from '../../contexts/FavoritesContext';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleShowCode = (snippet) => {
    setSelectedSnippet(snippet);
    setShowModal(true);
  };

  const handleRemoveFavorite = (snippetId) => {
    removeFromFavorites(snippetId);
  };

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === filter);

  const uniqueTypes = [...new Set(favorites.map(fav => fav.type))];

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-secondary-900 pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8">
              <FaHeart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Favorites Yet
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start exploring our components and add them to your favorites by clicking the heart icon.
              </p>
              <Link
                to="/explore"
                className="bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Explore Components
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FaHeart className="text-2xl text-red-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Favorites
              </h1>
              <span className="bg-primary-100 dark:bg-accent-900 text-primary-800 dark:text-accent-200 px-3 py-1 rounded-full text-sm font-medium">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          {/* Filter Tabs */}
          {uniqueTypes.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-600 dark:bg-accent-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All ({favorites.length})
              </button>
              {uniqueTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filter === type
                      ? 'bg-primary-600 dark:bg-accent-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {type} ({favorites.filter(fav => fav.type === type).length})
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Favorites Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFavorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {favorite.title}
                    </h3>
                    <span className="text-xs text-primary-600 dark:text-accent-400 font-medium capitalize">
                      {favorite.type}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Remove from favorites"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>

                {/* Preview */}
                <div className="mb-4 p-4 bg-gray-50 dark:bg-secondary-700 rounded-lg">
                  <StringToReactComponent>{favorite.jsxCode}</StringToReactComponent>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleShowCode(favorite)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FaCode className="text-xs" />
                    <span>View Code</span>
                  </button>
                </div>

                {/* Date Added */}
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Added {new Date(favorite.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State for Filtered Results */}
        {filteredFavorites.length === 0 && filter !== 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No {filter} components in your favorites yet.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="text-primary-600 dark:text-accent-400 hover:underline"
            >
              View all favorites
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal for viewing code */}
      {selectedSnippet && (
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          jsxCode={selectedSnippet.jsxCode}
          cssCode={selectedSnippet.cssCode}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
