import React, { useState, useRef } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { pageLoaderSnippets } from './Snippets/Page-load';

function PageLoaderSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const intervalRef = useRef(null);

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const runLoader = (index) => {
    clearInterval(intervalRef.current);
    const interval = setInterval(() => {}, 10);
    intervalRef.current = interval;
  };

  const stopLoader = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pageLoaderSnippets.map((loaderObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
        >
          <StringToReactComponent>
            {`(props) => (${loaderObject.jsxCode})`}
          </StringToReactComponent>
          <div
            dangerouslySetInnerHTML={{ __html: loaderObject.cssCode }}
            className="my-4"
          ></div>
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 transition-all duration-200"
              onClick={() =>
                handleShowModal(loaderObject.jsxCode, loaderObject.cssAnimation)
              }
            >
              Show CSS
            </button>
            <button
              className="text-primary-600 dark:text-accent-500 border border-primary-600 dark:border-accent-600 text-md py-2 px-6 rounded-lg shadow-md hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white transition-all duration-200"
              onClick={() =>
                handleShowModal(loaderObject.jsxCode, loaderObject.cssAnimation)
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

export default PageLoaderSnippets;
