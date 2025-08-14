import React, { useState } from "react";
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { paymentFormSnippets } from "./Snippets/PaymentForm";
import FavoriteButton from "../Favorites/FavoriteButton";

function PaymentFormSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-secondary-900 rounded-lg ">
      {paymentFormSnippets.map((paymentObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-700 
  text-secondary-900 dark:text-white 
  rounded-lg 
  border border-gray-200 dark:border-[#a855f7]
  shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]  flex flex-col items-center justify-evenly gap-10"
        >
          <StringToReactComponent>
            {`(props) => (${paymentObject.jsxCode})`}
          </StringToReactComponent>
          <div className="flex flex-col space-y-4">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 transition-all duration-200"
              onClick={() =>
                handleShowModal(paymentObject.jsxCode, paymentObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-primary-600 dark:text-accent-500 border border-primary-600 dark:border-accent-500 text-md py-2 px-4 rounded-lg shadow-md hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white transition-all duration-200"
              onClick={() =>
                handleShowModal(paymentObject.jsxCode, paymentObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
          <FavoriteButton
            snippet={{
              type: "payment",
              index: index,
              title: paymentObject.title,
              jsxCode: paymentObject.jsxCode,
              cssCode: paymentObject.cssCode,
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

export default PaymentFormSnippets;
