import React, { useState } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { animationSnippets } from './Snippets/Animation';
import FavoriteButton from '../Favorites/FavoriteButton';

const AnimationSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(0);

  const handleSnippetSelect = (index) => {
    setSelectedSnippet(index);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {animationSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-xl shadow transition-all duration-200 relative"
        >
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              snippet={{
                type: 'animation',
                index: index,
                title: snippet.title,
                jsxCode: snippet.jsxCode,
                cssCode: snippet.cssCode,
              }}
              size="md"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4 pr-8">{snippet.title}</h2>

          <div className="mb-4">
            <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
            <style>{snippet.cssCode}</style>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors"
              onClick={() => handleSnippetSelect(index)}
            >
              Show Code
            </button>
          </div>
        </div>
      ))}

      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={animationSnippets[selectedSnippet].jsxCode}
        cssCode={animationSnippets[selectedSnippet].cssCode}
      />
    </div>
  );
};

export default AnimationSnippets;
