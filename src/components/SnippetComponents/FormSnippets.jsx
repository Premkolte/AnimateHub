import React from "react";
import StringToReactComponent from "string-to-react-component";
import Modal from "../UI/Modal"; // Ensure this is correctly imported
import { formSnippets } from "./Snippets/Form";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eff6ff] dark:bg-secondary-900 rounded-lg ">
      {formSnippets.map((formObject, index) => (
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
          <h2 className="text-xl font-bold mb-4">{formObject.label}</h2>
          <StringToReactComponent>
            {`(props) => (${formObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="text-white text-md py-3 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 focus:outline-none"
              onClick={() =>
                handleShowModal(
                  formObject.jsxCode,
                  formObject.cssCode,
                  formObject.label
                )
              }
            >
              Show CSS
            </button>
            <button
              className="text-black dark:text-white text-md py-2 px-4 rounded-lg shadow-md bg-gray-200 dark:bg-secondary-700 hover:bg-gray-300 dark:hover:bg-secondary-600"
              onClick={() =>
                handleShowModal(
                  formObject.jsxCode,
                  formObject.cssCode,
                  formObject.label
                )
              }
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "formsnippet",
              index: index,
              title: formObject.label,
              jsxCode: formObject.jsxCode,
              cssCode: formObject.cssCode,
            }}
          />
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
