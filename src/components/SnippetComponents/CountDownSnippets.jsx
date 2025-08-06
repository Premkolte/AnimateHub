import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { countdownTimeSnippets } from "./Snippets/CountDown";
import FavoriteButton from "../Favorites/FavoriteButton";

const CountdownTimeSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {countdownTimeSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-4 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg"
        >
          <h2 className="text-lg font-bold mb-2">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-sm py-2 px-4 rounded-lg shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-lg focus:outline-none transition-all duration-200"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
            </button>
          </div>
          <FavoriteButton
                snippet={{
                  type: 'countdown',
                  index: index,
                  title: snippet.title,
                  jsxCode: snippet.jsxCode,
                  cssCode: snippet.cssCode,
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
};

export default CountdownTimeSnippets;
