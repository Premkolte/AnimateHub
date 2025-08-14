import React, { useState } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { pillNavigationSnippets } from "./Snippets/PillNavigation";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

function PillNavigationSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [activePills, setActivePills] = useState(
    pillNavigationSnippets.map(() => 0)
  );

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const handlePillClick = (snippetIndex) => {
    const newActivePills = [...activePills];
    newActivePills[snippetIndex] = (newActivePills[snippetIndex] + 1) % 3;
    setActivePills(newActivePills);
  };

  const renderPills = (jsxCode, cssCode, snippetIndex) => {
    const pillElements = [];
    for (let i = 1; i <= 3; i++) {
      pillElements.push(
        <button
          key={i}
          className={`pill-link py-2 px-4 m-1 rounded-full transition-colors duration-200 ${activePills[snippetIndex] === i - 1
            ? "bg-primary-600 text-white dark:bg-accent-600"
            : "border border-primary-600 text-primary-600 dark:border-accent-500 dark:text-accent-500 hover:bg-primary-100 dark:hover:bg-secondary-700"
            }`}
          onClick={() => handlePillClick(snippetIndex)}
        >
          Item {i}
        </button>
      );
    }
    return <div className="flex list-none p-0">{pillElements}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eff6ff] dark:bg-secondary-900 rounded-lg ">
      {pillNavigationSnippets.map((pillObject, index) => (
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
            {`(props) => (${pillObject.jsxCode})`}
          </StringToReactComponent>
          {renderPills(pillObject.jsxCode, pillObject.cssCode, index)}
          <div className="flex flex-col gap-4 w-full">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 transition-all duration-200"
              onClick={() =>
                handleShowModal(pillObject.jsxCode, pillObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-primary-600 dark:text-accent-500 border border-primary-600 dark:border-accent-500 text-md py-2 px-4 rounded-lg shadow-md hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white transition-all duration-200"
              onClick={() =>
                handleShowModal(pillObject.jsxCode, pillObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "pillNavigation",
              index: index,
              title: pillObject.title,
              jsxCode: pillObject.jsxCode,
              cssCode: pillObject.cssCode,
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

export default PillNavigationSnippets;
