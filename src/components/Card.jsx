import { useState } from "react";
import Modal from "./Modal";
import StringToReactComponent from "string-to-react-component";

function Card({ snippet }) {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };
  return (
    <>
      <div className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10">
        <StringToReactComponent>
          {`(props) => (${snippet.jsxCode})`}
        </StringToReactComponent>
        <div className="flex space-x-4">
          <button
            className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
            onClick={() =>
              handleShowModal(snippet.jsxCode, snippet.cssCode)
            }
          >
            Show CSS
          </button>
          <button
            className="text-black text-md py-2 px-4 rounded-lg shadow-md"
            onClick={() =>
              handleShowModal(snippet.jsxCode, snippet.cssCode)
            }
          >
            React Snippet
          </button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={jsxCode}
        cssCode={cssCode}
      />
    </>
  );
}
export default Card;
