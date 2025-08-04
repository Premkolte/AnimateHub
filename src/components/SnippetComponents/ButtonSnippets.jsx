import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { buttonSnippets } from "./Snippets/Buttons";
import FavoriteButton from "../Favorites/FavoriteButton";

function ButtonSnippets() {
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
      {buttonSnippets.map((buttonObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
        >
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              snippet={{
                type: 'button',
                index: index,
                title: `Button ${index + 1}`,
                jsxCode: buttonObject.jsxCode,
                cssCode: buttonObject.cssCode,
              }}
              size="md"
            />
          </div>

          <StringToReactComponent>
            {`(props) => (${buttonObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(buttonObject.jsxCode, buttonObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-md py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() =>
                handleShowModal(buttonObject.jsxCode, buttonObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
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

export default ButtonSnippets;
