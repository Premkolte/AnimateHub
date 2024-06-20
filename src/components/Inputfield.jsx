import React, { useState } from "react";
import Modal from "./Modal";
import StringToReactComponent from "string-to-react-component";

const InputFieldSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const snippets = [
    {
      title: "Basic Input Field",
      jsxCode: `(props) => (
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter text..."
        />
      )`,
      cssCode: `<input type="text" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;" placeholder="Enter text..." />`
    },
    {
      title: "Password Input Field",
      jsxCode: `(props) => (
        <input
          type="password"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter password..."
        />
      )`,
      cssCode: `<input type="password" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;" placeholder="Enter password..." />`
    },
    {
      title: "Search Input Field",
      jsxCode: `(props) => (
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Search..."
        />
      )`,
      cssCode: `<input type="text" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;" placeholder="Search..." />`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {snippets.map((snippet, index) => (
        <div key={index} className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
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

export default InputFieldSnippets;
