import React, { useState } from "react";
import Modal from "../Modal";
import { ExpandingSearchBarSnippets } from "./Snippets/ExpandingSearchBarSnippets";
import FavoriteButton from "../Favorites/FavoriteButton";

const ExpandingSearchBar = () => {
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
      {ExpandingSearchBarSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-secondary-800 rounded-lg shadow-lg text-black dark:text-white"
        >
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: snippet.jsxCode }} />
          <style>{snippet.cssCode}</style>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
            </button>
          </div>
          <FavoriteButton
                      snippet={{
                        type: 'expandingSearchBar',
                        index: index,
                        title: snippet.title,
                        jsxCode: snippet.jsxCode,
                        cssCode: snippet.cssCode,
                      }}
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

export default ExpandingSearchBar;
