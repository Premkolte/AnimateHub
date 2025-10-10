import React, { useState } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { cardSnippets } from "./Snippets/Cards";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

function CardSnippets() {
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
      {cardSnippets.map((cardObject, index) => (
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
                type: "card",
                index: index,
                title: cardObject.title,
                jsxCode: cardObject.jsxCode,
                cssCode: cardObject.cssCode,
              }}
              size="md"
            />
          </div>

          <StringToReactComponent>
            {`(props) => (${cardObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full text-white text-md py-3 px-6 rounded-full shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none transition-all duration-200"
               onClick={() =>
               handleShowModal(cardObject.jsxCode, cardObject.cssCode)
             }
            >
              Show CSS
            </button>
            <button
              className="w-full text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-md py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() =>
                handleShowModal(cardObject.jsxCode, cardObject.cssCode)
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

export default CardSnippets;
