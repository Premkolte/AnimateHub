// DarkModeSnippets.js

import React, { useState } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { darkModeSnippets } from './Snippets/DarkMode'; // Assuming you have dark mode snippets defined

const DarkModeSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(false); // State to track dark mode

  const handleShowModal = (jsx, css) => {
    setShowModal(true);
  };

  const toggleDarkMode = () => {
    setIsDarkModeOn(!isDarkModeOn);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isDarkModeOn ? 'dark' : ''}`}>
      <div className={`p-8 bg-white rounded-lg shadow-lg ${isDarkModeOn ? 'dark:bg-gray-800' : ''}`}>
        <h2 className="text-xl font-bold mb-4">Dark Mode Toggle</h2>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            className="sr-only"
            checked={isDarkModeOn}
            onChange={toggleDarkMode}
          />
          <label
            htmlFor="dark-mode-toggle"
            className={`cursor-pointer relative w-12 h-6 bg-gray-400 rounded-full shadow-inner ${isDarkModeOn ? 'bg-gray-900' : 'bg-gray-400'}`}
          >
            <div
              className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${isDarkModeOn ? 'transform translate-x-full' : ''}`}
            ></div>
          </label>
        </div>
        <StringToReactComponent>{isDarkModeOn ? darkModeSnippets[0].jsxCode : darkModeSnippets[1].jsxCode}</StringToReactComponent>
        <div className="mt-4 flex justify-end">
          <button
            className={`text-white text-md py-3 px-2 rounded-lg shadow-md bg-gradient-to-r ${isDarkModeOn ? 'from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-1000' : 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} hover:shadow-xl focus:outline-none`}
            onClick={() => handleShowModal()}
          >
            Show Code
          </button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={isDarkModeOn ? darkModeSnippets[0].jsxCode : darkModeSnippets[1].jsxCode} // Adjust to show current mode
        cssCode={isDarkModeOn ? darkModeSnippets[0].cssCode : darkModeSnippets[1].cssCode} // Adjust to show current mode
      />
    </div>
  );
};

export default DarkModeSnippets;
