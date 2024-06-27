// AnimationSnippets.js

import React, { useState } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { animationSnippets } from './Snippets/Animation'; // Define animation snippets

const AnimationSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(0); // State to track selected snippet

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSnippetSelect = (index) => {
    setSelectedSnippet(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {animationSnippets.map((snippet, index) => (
        <div key={index} className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() => {
                handleSnippetSelect(index);
                handleShowModal();
              }}
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
