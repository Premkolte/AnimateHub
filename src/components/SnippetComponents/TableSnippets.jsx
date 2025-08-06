import React, { useState } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { tableSnippets } from './Snippets/Tables';
import FavoriteButton from '../Favorites/FavoriteButton';

const TableSnippets = () => {
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
      {tableSnippets.map((snippet, index) => (
        <div
          key={index}
          className="p-8 bg-white dark:bg-secondary-800 rounded-lg shadow-lg text-secondary-900 dark:text-white"
        >
          <h2 className="text-xl font-bold mb-4">{snippet.title}</h2>
          <StringToReactComponent>{snippet.jsxCode}</StringToReactComponent>
          <div className="mt-4 flex justify-end">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() => handleShowModal(snippet.jsxCode, snippet.cssCode)}
            >
              Show Code
            </button>
          </div>
           <FavoriteButton
                              snippet={{
                                type: 'table', 
                                index: index,
                                title: snippet.title,
                                jsxCode: snippet.jsxCode,
                                cssCode: snippet.cssCode,
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
};

export default TableSnippets;
