import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { socialMediaSnippets } from "./Snippets/Social";
import FavoriteButton from "../Favorites/FavoriteButton";

function SocialMediaSnippets() {
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
      {socialMediaSnippets.map((socialObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-700 
  text-secondary-900 dark:text-white 
  rounded-lg 
  border border-gray-200 dark:border-[#a855f7]
  shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]  flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${socialObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(socialObject.jsxCode, socialObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-secondary-900 dark:text-white text-md py-2 px-4 rounded-lg shadow-md border dark:border-white"
              onClick={() =>
                handleShowModal(socialObject.jsxCode, socialObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "social",
              index: index,
              title: socialObject.title,
              jsxCode: socialObject.jsxCode,
              cssCode: socialObject.cssCode,
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

export default SocialMediaSnippets;
