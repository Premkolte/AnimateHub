import React from "react";
import StringToReactComponent from "string-to-react-component";
import Modal from "../Modal";
import { formSnippets } from "./Snippets/Form";

function FormSnippets() {
  const [showModal, setShowModal] = React.useState(false);
  const [jsxCode, setJsxCode] = React.useState("");
  const [cssCode, setCssCode] = React.useState("");
  const [heading, setHeading] = React.useState("");

  const handleShowModal = (jsx, css, heading) => {
    setJsxCode(jsx);
    setCssCode(css);
    setHeading(heading);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {formSnippets.map((formObject, index) => (
        <div
          key={index}
          className="p-8 pt-5 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
        >
          <h2 className="text-xl font-bold mb-4">{formObject.label}</h2>
          <StringToReactComponent>
            {`(props) => (${formObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(formObject.jsxCode, formObject.cssCode, formObject.label)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(formObject.jsxCode, formObject.cssCode, formObject.label)
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
        heading={heading}
      />
    </div>
  );
}

export default FormSnippets;
