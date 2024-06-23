import React, { useState } from 'react'
import Modal from "../Modal";
import StringToReactComponent from "string-to-react-component";
import { toggleSwitchSnippets } from "./Snippets/ToggleSwitch";
function ToggleSwitchSnippets(){
    const [showModal, setShowModal] = useState(false);
    const [jsxCode, setJsxCode] = useState("");
   
  
    const handleShowModal = (jsx) => {
      setJsxCode(jsx);
      setShowModal(true);
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {toggleSwitchSnippets.map((switchObject, index) => (
          <div
            key={index}
            className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10"
          >
            <StringToReactComponent>
              {`(props) => (${switchObject.jsxCode})`}
            </StringToReactComponent>
            <div className="flex space-x-4">
              <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                  handleShowModal(switchObject.jsxCode)
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
        />
      </div>
  )
}
export default ToggleSwitchSnippets;