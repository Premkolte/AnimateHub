import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { newsletterSnippets } from "./Snippets/NewsLetter";
import FavoriteButton from "../Favorites/FavoriteButton";

const NewsletterSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");

  const handleShowModal = (jsx) => {
    setJsxCode(jsx);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {newsletterSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-secondary-800 text-black dark:text-white rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-between">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode)}
            >
              Show Code
            </button>
          </div>
          <FavoriteButton
       snippet={{
         type: 'newsletter',
         index: index,
         title: snippet.title,
         jsxCode: snippet.jsxCode,
         cssCode: snippet.cssCode,
       }}
       size="md"
       style={{ marginTop: '10px'}}
     />
        </div>
      ))}
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={jsxCode}
      />
    </div>
  );
};

export default NewsletterSnippets;
