import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { pillNavigationSnippets } from "./Snippets/PillNavigation";

function PillNavigationSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [activePills, setActivePills] = useState(pillNavigationSnippets.map(() => 0));

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const handlePillClick = (snippetIndex) => {
    const newActivePills = [...activePills];
    newActivePills[snippetIndex] = (newActivePills[snippetIndex] + 1) % 3; // Toggle between 0, 1, 2
    setActivePills(newActivePills);
  };

  const renderPills = (jsxCode, cssCode, snippetIndex) => {
    const pillElements = [];
    for (let i = 1; i <= 3; i++) {
      pillElements.push(
        <button
          key={i}
          className={`pill-link py-2 px-4 m-1 rounded-full ${activePills[snippetIndex] === i - 1 ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}
          onClick={() => handlePillClick(snippetIndex)}
        >
          Item {i}
        </button>
      );
    }
    return <div className="flex list-none p-0">{pillElements}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pillNavigationSnippets.map((pillObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${pillObject.jsxCode})`}
          </StringToReactComponent>
          {renderPills(pillObject.jsxCode, pillObject.cssCode, index)}
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(pillObject.jsxCode, pillObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(pillObject.jsxCode, pillObject.cssCode)
              }
            >
              React Snippet
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
}

export default PillNavigationSnippets;
