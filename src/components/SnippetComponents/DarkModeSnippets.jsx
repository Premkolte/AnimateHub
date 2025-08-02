import React, { useState } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { darkModeSnippets } from './Snippets/DarkMode';

const DarkModeSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  const handleShowModal = (jsx, css) => {
    setShowModal(true);
  };

  const toggleDarkMode = () => {
    setIsDarkModeOn(!isDarkModeOn);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isDarkModeOn ? 'dark' : ''}`}>
      <div className="p-8 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg">
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
            className={`cursor-pointer relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isDarkModeOn ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                isDarkModeOn ? 'transform translate-x-full' : ''
              }`}
            ></div>
          </label>
        </div>

        <StringToReactComponent>
          {isDarkModeOn
            ? darkModeSnippets[0].jsxCode
            : darkModeSnippets[1].jsxCode}
        </StringToReactComponent>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 text-white text-md py-2 px-4 rounded-lg shadow focus:outline-none transition-all duration-200"
            onClick={() => handleShowModal()}
          >
            Show Code
          </button>
        </div>
      </div>

      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={
          isDarkModeOn
            ? darkModeSnippets[0].jsxCode
            : darkModeSnippets[1].jsxCode
        }
        cssCode={
          isDarkModeOn
            ? darkModeSnippets[0].cssCode
            : darkModeSnippets[1].cssCode
        }
      />
    </div>
  );
};

export default DarkModeSnippets;
