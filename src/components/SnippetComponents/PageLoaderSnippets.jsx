import React, { useState, useRef } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
// import pageLoaderSnippets from "../../snippets/pageLoaderSnippets";
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
    // Clear any existing interval
    clearInterval(intervalRef.current);

    // Start a new interval for the loader animation
    const interval = setInterval(() => {
      // Perform loader animation logic here if needed
    }, 10); // Adjust interval duration (ms) for smoother animation

    // Store interval reference for clearing later
    intervalRef.current = interval;
  };

  const stopLoader = () => {
    // Clear the interval when stopping the loader
    clearInterval(intervalRef.current);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pageLoaderSnippets.map((loaderObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
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
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(loaderObject.jsxCode, loaderObject.cssAnimation)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-1 px-6 rounded-lg shadow-md"
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
