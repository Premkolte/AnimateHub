import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { animatedIconSnippets } from "./Snippets/AnimationIcon";
import FavoriteButton from "../Favorites/FavoriteButton";

const AnimatedIconSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-secondary-900 rounded-lg">
      {animatedIconSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-secondary-700 text-secondary-900 border border-gray-200 dark:border-[#a855f7]
  shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]  dark:text-white rounded-xl shadow transition-all duration-200"
        >
          <h2 className="text-xl font-semibold mb-4">{snippet.title}</h2>

          <div className="mb-4">
            <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
            <style>{snippet.cssCode}</style>
          </div>

          <div className="flex justify-between">
            {/* Favorite Button */}

            <FavoriteButton
              snippet={{
                type: "animationicon",
                index: index,
                title: snippet.title,
                jsxCode: snippet.jsxCode,
                cssCode: snippet.cssCode,
              }}
              size="md"
            />

            <button
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors"
            >
              Show Code
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
};

export default AnimatedIconSnippets;
