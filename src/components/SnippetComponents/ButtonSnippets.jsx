import React, { useState } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { buttonSnippets } from "./Snippets/Buttons";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900/50 rounded-lg ">
      {buttonSnippets.map((buttonObject, index) => (
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
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              snippet={{
                type: "button",
                index: index,
                title: buttonObject.title,
                jsxCode: buttonObject.jsxCode,
                cssCode: buttonObject.cssCode,
              }}
              size="md"
            />
          </div>

          <StringToReactComponent>
            {`(props) => (${buttonObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full bg-blue-500 text-white text-md py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() =>
                handleShowModal(buttonObject.jsxCode, buttonObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="w-full text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-md py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
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
