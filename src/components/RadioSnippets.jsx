import React, { useState } from "react";
import Modal from "./Modal";
import StringToReactComponent from "string-to-react-component";

const RadioButtonSnippets = () => {
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
      title: "Simple Radio Button Snippet",
      jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              className="form-radio"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="ml-2">Option 1</span>
          </label>
          <label className="flex items-center ml-4">
            <input
              type="radio"
              name="option"
              className="form-radio"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="ml-2">Option 2</span>
          </label>
        </div>
      )`,
      cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <label style="display: flex; align-items: center; margin-right: 10px;">
          <input type="radio" name="option" style="margin-right: 10px;" />
          <span>Option 1</span>
        </label>
        <label style="display: flex; align-items: center;">
          <input type="radio" name="option" style="margin-right: 10px;" />
          <span>Option 2</span>
        </label>
      </div>`
    },
    {
      title: "Grouped Radio Button Snippet",
      jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="group"
                className="form-radio"
                onChange={(e) => console.log(e.target.value)}
              />
              <span className="ml-2">Group 1 - Option 1</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                name="group"
                className="form-radio"
                onChange={(e) => console.log(e.target.value)}
              />
              <span className="ml-2">Group 1 - Option 2</span>
            </label>
          </div>
          <div className="ml-8">
            <label className="flex items-center">
              <input
                type="radio"
                name="group2"
                className="form-radio"
                onChange={(e) => console.log(e.target.value)}
              />
              <span className="ml-2">Group 2 - Option 1</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                name="group2"
                className="form-radio"
                onChange={(e) => console.log(e.target.value)}
              />
              <span className="ml-2">Group 2 - Option 2</span>
            </label>
          </div>
        </div>
      )`,
      cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <div style="margin-right: 20px;">
          <label style="display: flex; align-items: center; margin-bottom: 10px;">
            <input type="radio" name="group" style="margin-right: 10px;" />
            <span>Group 1 - Option 1</span>
          </label>
          <label style="display: flex; align-items: center;">
            <input type="radio" name="group" style="margin-right: 10px;" />
            <span>Group 1 - Option 2</span>
          </label>
        </div>
        <div>
          <label style="display: flex; align-items: center; margin-bottom: 10px;">
            <input type="radio" name="group2" style="margin-right: 10px;" />
            <span>Group 2 - Option 1</span>
          </label>
          <label style="display: flex; align-items: center;">
            <input type="radio" name="group2" style="margin-right: 10px;" />
            <span>Group 2 - Option 2</span>
          </label>
        </div>
      </div>`
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

export default RadioButtonSnippets;
    