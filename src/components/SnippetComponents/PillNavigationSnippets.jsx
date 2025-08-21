import React, { useState } from "react";
import Modal from "../UI/Modal";
// Remove StringToReactComponent import if not used
// import StringToReactComponent from "string-to-react-component";
import { pillNavigationSnippets } from "./Snippets/PillNavigation";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

function PillNavigationSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [activePills, setActivePills] = useState(
    pillNavigationSnippets.map(() => 0)
  );

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const handlePillClick = (snippetIndex) => {
    const newActivePills = [...activePills];
    newActivePills[snippetIndex] = (newActivePills[snippetIndex] + 1) % 3;
    setActivePills(newActivePills);
  };

  const renderPills = (jsxCode, cssCode, snippetIndex) => {
    const pills = ['Item 1', 'Item 2', 'Item 3'];
    return (
      <div className="flex list-none p-0">
        {pills.map((pill, i) => (
          <button
            key={i}
            className={`pill-link py-2 px-4 m-1 rounded-full transition-colors duration-200 ${
              activePills[snippetIndex] === i
                ? "bg-primary-600 text-white dark:bg-accent-600"
                : "border border-primary-600 text-primary-600 dark:border-accent-500 dark:text-accent-500 hover:bg-primary-100 dark:hover:bg-secondary-700"
            }`}
            onClick={() => handlePillClick(snippetIndex)}
          >
            {pill}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900/50 rounded-lg">
      {pillNavigationSnippets.map((pillObject, index) => (
        <div
          key={index}
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
          <div className="flex items-center justify-center">
            {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, tabIndex) => (
              <button
                key={tabIndex}
                className={`py-2 px-4 mx-1 rounded-full transition-colors duration-200 ${
                  activePills[index] === tabIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                }`}
                onClick={() => {
                  const newActivePills = [...activePills];
                  newActivePills[index] = tabIndex;
                  setActivePills(newActivePills);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderPills(pillObject.jsxCode, pillObject.cssCode, index)}
          <div className="flex flex-col gap-4 w-full">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 transition-all duration-200"
              onClick={() =>
                handleShowModal(pillObject.jsxCode, pillObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-blue-600 dark:text-purple-400 border border-blue-600 dark:border-purple-400 text-md py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-200"
              onClick={() =>
                handleShowModal(pillObject.jsxCode, pillObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "pillNavigation",
              index: index,
              title: pillObject.title,
              jsxCode: pillObject.jsxCode,
              cssCode: pillObject.cssCode,
            }}
            size="md"
          />
        </div>
      ))}
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={jsxCode}
        cssCode={cssCode}
      />
    </div>
  );
}

export default PillNavigationSnippets;