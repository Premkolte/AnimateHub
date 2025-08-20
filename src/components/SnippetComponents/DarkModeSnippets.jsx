import React, { useState } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { darkModeSnippets } from "./Snippets/DarkMode";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

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
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isDarkModeOn ? "dark" : ""
        }`}
    >
      <div
          className="
            p-8 pt-14 
          bg-[#dbeafe]
          dark:bg-secondary-800 
          text-secondary-900 dark:text-white 
            rounded-lg 
            border border-blue-300 dark:border-[#a855f7]
            shadow-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
            flex flex-col items-center justify-evenly gap-10 relative 
            text-sm
          "
        >
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
            className={`cursor-pointer relative w-12 h-6 rounded-full transition-colors duration-300 ${isDarkModeOn ? "bg-gray-700" : "bg-gray-300"
              }`}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isDarkModeOn ? "transform translate-x-full" : ""
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
        <FavoriteButton
          snippet={{
            type: "darkmode",
            index: isDarkModeOn ? 0 : 1,
            title: isDarkModeOn
              ? darkModeSnippets[0].title
              : darkModeSnippets[1].title,
            jsxCode: isDarkModeOn
              ? darkModeSnippets[0].jsxCode
              : darkModeSnippets[1].jsxCode,
            cssCode: isDarkModeOn
              ? darkModeSnippets[0].cssCode
              : darkModeSnippets[1].cssCode,
          }}
          size="md"
        />
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
