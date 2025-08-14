import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { toggleSwitchSnippets } from "./Snippets/ToggleSwitch";
import FavoriteButton from "../Favorites/FavoriteButton";

function ToggleSwitchSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");

  const handleShowModal = (jsx) => {
    setJsxCode(jsx);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eff6ff] dark:bg-secondary-900 rounded-lg ">
      {toggleSwitchSnippets.map((switchObject, index) => (
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
          <StringToReactComponent>
            {`(props) => (${switchObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() => handleShowModal(switchObject.jsxCode)}
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
            snippet={{
              index: index,
              type: "Pricing",
              title: switchObject.title,
              jsxCode: switchObject.jsxCode,
              cssCode: switchObject.cssCode,
            }}
            size="md"
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
}

export default ToggleSwitchSnippets;
