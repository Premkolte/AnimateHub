import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { paginationSnippets } from "./Snippets/Pagination";
import FavoriteButton from "../Favorites/FavoriteButton";

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

  const renderPagination = (snippetIndex) => {
    return (
      <div className="flex space-x-2 mt-4">
        {[1, 2, 3].map((i) => (
          <button
            key={i}
            className={`py-2 px-4 border rounded-md transition-all duration-300
              ${
                activePages[snippetIndex] === i
                  ? "bg-primary-600 text-white border-primary-600 dark:bg-accent-600 dark:border-accent-600"
                  : "bg-white text-secondary-900 border-secondary-300 dark:bg-secondary-700 dark:text-white dark:border-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-600"
              }`}
            onClick={() => handlePageClick(snippetIndex, i)}
          >
            {i}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {paginationSnippets.map((paginationObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${paginationObject.jsxCode})`}
          </StringToReactComponent>
          {renderPagination(index)}
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 transition-all duration-200"
              onClick={() =>
                handleShowModal(paginationObject.jsxCode, paginationObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-primary-600 dark:text-accent-500 border border-primary-600 dark:border-accent-500 text-md py-2 px-4 rounded-lg shadow-md hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white transition-all duration-200"
              onClick={() =>
                handleShowModal(paginationObject.jsxCode, paginationObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
  snippet={{
    type: 'pagination', 
    index: index,
    title: paginationObject.title,
    jsxCode: paginationObject.jsxCode,
    cssCode: paginationObject.cssCode,
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

export default PaginationSnippets;
