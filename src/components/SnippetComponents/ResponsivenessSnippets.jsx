import React, { useState } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { responsivenessSnippets } from './Snippets/Responsiveness';

const ResponsivenessSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState('');
  const [cssCode, setCssCode] = useState('');

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {responsivenessSnippets.map((snippet, index) => (
        <div key={index} className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
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
};

export default ResponsivenessSnippets;
