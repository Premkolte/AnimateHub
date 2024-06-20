import React, { useState } from "react";
import Modal from "./Modal";
import StringToReactComponent from "string-to-react-component";

function CardSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const cards = [
    {
      label: "Basic Card",
      cssCode: `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 300px; margin: 16px auto;">
          <h3>Basic Card</h3>
          <p>This is a basic card with some text content.</p>
        </div>`,
      jsxCode: `
        <div className="border border-gray-300 rounded-lg p-4 max-w-xs mx-auto">
          <h3 className="text-lg font-bold">Basic Card</h3>
          <p>This is a basic card with some text content.</p>
        </div>`,
    },
    {
      label: "Card with Image",
      cssCode: `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 300px; margin: 16px auto; text-align: center;">
          <img style="border-radius: 8px 8px 0 0; width: 100%;" src="https://via.placeholder.com/300x150" alt="Card" />
          <h3>Card with Image</h3>
          <p>This card includes an image at the top.</p>
        </div>`,
      jsxCode: `
        <div className="border border-gray-300 rounded-lg p-4 max-w-xs mx-auto text-center">
          <img className="rounded-t-lg w-full" src="https://via.placeholder.com/300x150" alt="Card" />
          <h3 className="text-lg font-bold mt-2">Card with Image</h3>
          <p>This card includes an image at the top.</p>
        </div>`,
    },
    {
      label: "Card with Button",
      cssCode: `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 300px; margin: 16px auto; text-align: center;">
          <h3>Card with Button</h3>
          <p>This card includes a button at the bottom.</p>
          <button style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">Click Me</button>
        </div>`,
      jsxCode: `
        <div className="border border-gray-300 rounded-lg p-4 max-w-xs mx-auto text-center">
          <h3 className="text-lg font-bold">Card with Button</h3>
          <p>This card includes a button at the bottom.</p>
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2">Click Me</button>
        </div>`,
    },
    {
      label: "Card with List Group",
      cssCode: `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 300px; margin: 16px auto;">
          <h3>Card with List Group</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li style="border-bottom: 1px solid #ddd; padding: 8px 0;">Item 1</li>
            <li style="border-bottom: 1px solid #ddd; padding: 8px 0;">Item 2</li>
            <li style="border-bottom: 1px solid #ddd; padding: 8px 0;">Item 3</li>
          </ul>
        </div>`,
      jsxCode: `
        <div className="border border-gray-300 rounded-lg p-4 max-w-xs mx-auto">
          <h3 className="text-lg font-bold">Card with List Group</h3>
          <ul className="list-none p-0">
            <li className="border-b border-gray-300 py-2">Item 1</li>
            <li className="border-b border-gray-300 py-2">Item 2</li>
            <li className="border-b border-gray-300 py-2">Item 3</li>
          </ul>
        </div>`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((cardObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${cardObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex space-x-4">
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(cardObject.jsxCode, cardObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(cardObject.jsxCode, cardObject.cssCode)
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

export default CardSnippets;
