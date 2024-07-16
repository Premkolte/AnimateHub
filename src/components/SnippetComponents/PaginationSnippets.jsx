import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { paginationSnippets } from "./Snippets/Pagination";

function PaginationSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [activePages, setActivePages] = useState(paginationSnippets.map(() => 1));

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const handlePageClick = (snippetIndex, pageNumber) => {
    const newActivePages = [...activePages];
    newActivePages[snippetIndex] = pageNumber;
    setActivePages(newActivePages);
  };

  const renderPagination = (jsxCode, snippetIndex) => {
    const buttonElements = [];
    for (let i = 1; i <= 3; i++) {
      buttonElements.push(
        <button
          key={i}
          className={`page-link py-2 px-4 m-1 border border-gray-300 ${activePages[snippetIndex] === i ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handlePageClick(snippetIndex, i)}
        >
          {i}
        </button>
      );
    }
    return <div className="flex list-none p-0">{buttonElements}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {paginationSnippets.map((paginationObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${paginationObject.jsxCode})`}
          </StringToReactComponent>
          <div>{renderPagination(paginationObject.jsxCode, index)}</div>
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(paginationObject.jsxCode, paginationObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(paginationObject.jsxCode, paginationObject.cssCode)
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

export default PaginationSnippets;
