import React, { useState, useRef } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { pageLoaderSnippets } from "./Snippets/Page-load";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

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
    const interval = setInterval(() => { }, 10);
    intervalRef.current = interval;
  };

  const stopLoader = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900/50 rounded-lg ">
      {pageLoaderSnippets.map((loaderObject, index) => (
        <div
          key={index}
          className="
            p-8 pt-14 
          bg-[#dbeafe]
          dark:bg-secondary-800 
          text-secondary-900 dark:text-white 
            rounded-lg 
            border border-blue-300 dark:border-[#a855f7]
            shadow-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
            flex flex-col items-center justify-evenly gap-10 relative 
            text-sm
          "
        >
          <StringToReactComponent>
            {`(props) => (${loaderObject.jsxCode})`}
          </StringToReactComponent>
          <div
            dangerouslySetInnerHTML={{ __html: loaderObject.cssCode }}
            className="my-4"
          ></div>
          <div className="flex flex-col gap-4 w-full">
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
          <FavoriteButton
            snippet={{
              type: "pageloader",
              index: index,
              title: loaderObject.title,
              jsxCode: loaderObject.jsxCode,
              cssCode: loaderObject.cssCode,
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

export default PageLoaderSnippets;
