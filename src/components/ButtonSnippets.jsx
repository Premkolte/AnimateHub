import React, { useState } from "react";
import Modal from "./Modal";
import StringToReactComponent from "string-to-react-component";

function ButtonSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const buttons = [
    {
      label: "Move Right",
      cssCode:
        '<button style="transform: translateX(5px); background-color: #271FE0; color: white; padding: 10px;">Move Right</button>',
      jsxCode:
        "<button className={`hover:translate-x-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Right</button>",
    },
    {
      label: "Move Left",
      cssCode:
        '<button style="transform: translateX(-5px); background-color: #271FE0; color: white; padding: 10px;">Move Left</button>',
      jsxCode:
        "<button className={`hover:-translate-x-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Left</button>",
    },
    {
      label: "Move Up",
      cssCode:
        '<button style="transform: translateY(-5px); background-color: #271FE0; color: white; padding: 10px;">Move Up</button>',
      jsxCode:
        "<button className={`hover:-translate-y-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Up</button>",
    },
    {
      label: "Move Down",
      cssCode:
        '<button style="transform: translateY(5px); background-color: #271FE0; color: white; padding: 10px;">Move Down</button>',
      jsxCode:
        "<button className={`hover:translate-y-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Down</button>",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {buttons.map((buttonObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${buttonObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex space-x-4">
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(buttonObject.jsxCode, buttonObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(buttonObject.jsxCode, buttonObject.cssCode)
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

export default ButtonSnippets;
