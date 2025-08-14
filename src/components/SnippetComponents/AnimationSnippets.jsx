import React, { useState } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { animationSnippets } from "./Snippets/Animation";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

const AnimationSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(0);

  const handleSnippetSelect = (index) => {
    setSelectedSnippet(index);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eff6ff] dark:bg-secondary-900 rounded-lg">
      {animationSnippets.map((snippet, index) => (
        <div
          key={index}
          className="
  p-8 pt-14 
  bg-[#dbeafe]
 dark:bg-secondary-700 
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
                type: "animation",
                index: index,
                title: snippet.title,
                jsxCode: snippet.jsxCode,
                cssCode: snippet.cssCode,
              }}
              size="md"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4 pr-8">{snippet.title}</h2>

          <div className="mb-4">
            <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
            <style>{snippet.cssCode}</style>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors"
              onClick={() => handleSnippetSelect(index)}
            >
              Show Code
            </button>
          </div>
        </div>
      ))}

      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={animationSnippets[selectedSnippet].jsxCode}
        cssCode={animationSnippets[selectedSnippet].cssCode}
      />
    </div>
  );
};

export default AnimationSnippets;
