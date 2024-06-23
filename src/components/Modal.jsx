// Modal.js (Updated for Login Snippets)

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import StringToReactComponent from 'string-to-react-component';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
          <StringToReactComponent>
            {`(props) => (${jsxCode})`}
          </StringToReactComponent>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="bg-gray-800 text-white rounded-lg w-full p-2">
            <div className="flex items-center justify-between">
              <div className="bg-green-500 p-2">JSX</div>
              <CopyToClipboard text={jsxCode} onCopy={() => handleCopy(jsxCode)}>
                <button className="bg-white text-black p-2 px-4 rounded-lg">
                  Copy to clipboard
                </button>
              </CopyToClipboard>
            </div>
            <pre className="overflow-x-auto p-4">{jsxCode}</pre>
          </div>
          <div className="bg-gray-800 text-white rounded-lg w-full p-2">
            <div className="flex items-center justify-between">
              <div className="bg-green-500 p-2">CSS</div>
              <CopyToClipboard text={cssCode} onCopy={() => handleCopy(cssCode)}>
                <button className="bg-white text-black p-2 px-4 rounded-lg">
                  Copy to clipboard
                </button>
              </CopyToClipboard>
            </div>
            <pre className="overflow-x-auto p-4">{cssCode}</pre>
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
