// Modal.jsx

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import StringToReactComponent from 'string-to-react-component';

function Modal({ showModal, onClose, jsxCode, cssCode }) {
  const [copyStatus, setCopyStatus] = useState('');

  if (!showModal) return null;

  const handleCopy = (text) => {
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus(''), 2000); // Clear status after 2 seconds
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-screen overflow-auto relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          <IoMdClose />
        </button>

        <div className="p-10 flex justify-center items-center">
          <div className="flex flex-col items-center gap-5">
            <h3 className="text-lg font-bold mb-4">JSX Code</h3>
            <div className="bg-gray-800 text-white rounded-lg w-full p-2">
              <CopyToClipboard text={jsxCode} onCopy={() => handleCopy(jsxCode)}>
                <button className="bg-white text-black p-2 px-4 rounded-lg">
                  Copy to clipboard
                </button>
              </CopyToClipboard>
              <div>
                <StringToReactComponent>
                  {`(props) => (${jsxCode})`}
                </StringToReactComponent>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 mt-6">
            <h3 className="text-lg font-bold mb-4">CSS Code</h3>
            <div className="bg-gray-800 text-white rounded-lg w-full p-2">
              <CopyToClipboard text={cssCode} onCopy={() => handleCopy(cssCode)}>
                <button className="bg-white text-black p-2 px-4 rounded-lg">
                  Copy to clipboard
                </button>
              </CopyToClipboard>
              <pre className="overflow-x-auto p-4">{cssCode}</pre>
            </div>
          </div>
        </div>

        {copyStatus && (
          <p className="text-green-500 text-sm mt-2 text-center">
            {copyStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default Modal;
