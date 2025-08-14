import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { radioSnippets } from "./Snippets/Radios";
import FavoriteButton from "../Favorites/FavoriteButton";

const RadioButtonSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-secondary-900 rounded-lg ">
      {radioSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-secondary-700 
  text-secondary-900 dark:text-white 
  rounded-lg 
  border border-gray-200 dark:border-[#a855f7]
  shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] "
        >
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "radio",
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

export default RadioButtonSnippets;
