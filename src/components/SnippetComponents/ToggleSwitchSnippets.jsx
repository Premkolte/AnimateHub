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
    // <main className='flex gap-20 items-baseline justify-center'>
       
    //    <div className="relative inline-block w-20 h-10">
    //         <input type="checkbox" id="toggle" className="sr-only peer" />
    //         <label for="toggle" className="inline-block switch-container cursor-pointer w-full h-full rounded-full animate-bounce transition-colors duration-300 bg-red-400 peer-checked:bg-green-400 peer-checked:[&>span]:translate-x-full peer-checked:[&>span]:bg-gray-500">
    //             <span className="h-4/6 absolute top-[0.4rem] left-[0.4rem] bg-white w-2/5 rounded-full transition-all ease-in-out duration-1000"></span>
    //         </label>
    //     </div>


        
    //     <div className="relative inline-block w-14 h-14">
    //         <input type="checkbox" id="toggle2" className="sr-only peer" />
    //         <label for="toggle2" className="switch-container cursor-pointer w-full h-full rounded-full transition-colors duration-300 bg-red-400 peer-checked:bg-green-400 peer-checked:[&>span]:before:content-['✔'] peer-checked:[&>span]::before:absolute peer-checked:[&>span]:before:-top-[.1rem] flex justify-center items-center hover:text-2xl text-3xl ">
    //             <span className="h-4/5 hover:h-4/6 hover:w-4/6 bg-white w-4/5 rounded-full transition-all ease-linear duration-300 relative before:content-['✖'] before:absolute before:top-[.125rem] before:left-[.1rem] before:flex before:justify-center before:items-center "></span>
    //         </label>
    //     </div>
    
    //     <div className="relative inline-block w-36 h-6">
    //         <input type="checkbox" id="toggle3" className="sr-only peer" />
    //         <label for="toggle3" className="inline-block switch-container cursor-pointer w-full h-full rounded-full transition-all duration-300 peer-checked:[&>span]:translate-x-[135%] peer-checked:[&>span]:bg-green-400 border-black border-4">
    //             <span className="h-14 absolute -top-[1.3rem] left-[0.4rem] bg-red-400 w-14 rounded-xl transition-all ease-in-out duration-1000"></span>
    //         </label>
    //     </div>
        

    // </main>
  )
}
export default ToggleSwitchSnippets;