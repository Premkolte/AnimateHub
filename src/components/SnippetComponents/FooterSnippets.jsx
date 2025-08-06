// components/FooterSnippets.js
import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { footerSnippets } from "./Snippets/Footer";
import FavoriteButton from "../Favorites/FavoriteButton";

const FooterSnippets = () => {
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
      {footerSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-secondary-800 text-black dark:text-white rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-3 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
            </button>
          </div>
          <FavoriteButton
                      snippet={{
                        type: 'footer',
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

export default FooterSnippets;
