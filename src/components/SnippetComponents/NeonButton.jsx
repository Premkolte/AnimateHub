import React, { useState } from "react";
import Modal from "../Modal";
import { NeonButtonSnippets } from "./Snippets/NeonButtonSnippets";
import FavoriteButton from "../Favorites/FavoriteButton";

const NeonButton = () => {
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
      {NeonButtonSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-secondary-700 
  text-secondary-900 dark:text-white 
  rounded-lg 
  border border-gray-200 dark:border-[#a855f7]
  shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]  text-black dark:text-white rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: snippet.jsxCode }} />
          <style>{snippet.cssCode}</style>
          <div className="mt-4 flex justify-between">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "neonbutton",
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

export default NeonButton;
