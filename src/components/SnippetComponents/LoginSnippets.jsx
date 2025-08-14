import React, { useState } from "react";
import Modal from "../UI/Modal";
import StringToReactComponent from "string-to-react-component";
import { loginSnippets } from "./Snippets/Login";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

const LoginSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eff6ff] dark:bg-secondary-900 rounded-lg ">
      {loginSnippets.map((snippet, index) => (
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
          <FavoriteButton
            snippet={{
              type: "login",
              index: index,
              title: snippet.title,
              jsxCode: snippet.jsxCode,
              cssCode: snippet.cssCode,
            }}
            size="md"
          />
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
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

export default LoginSnippets;
