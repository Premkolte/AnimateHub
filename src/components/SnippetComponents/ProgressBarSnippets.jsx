import React, { useState, useRef } from 'react';
import Modal from '../Modal';
import StringToReactComponent from 'string-to-react-component';
import { progressBarSnippets } from './Snippets/Progress';

function ProgressBarSnippets() {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [progressBars, setProgressBars] = useState(progressBarSnippets.map(() => 0));
  const intervalRef = useRef(null);

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const runProgress = (index) => {
    clearInterval(intervalRef.current);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgressBars(prev => {
        const updated = [...prev];
        updated[index] = currentProgress;
        return updated;
      });

      if (currentProgress >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 20);

    intervalRef.current = interval;
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    setProgressBars(progressBarSnippets.map(() => 0));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {progressBarSnippets.map((progressObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
        >
          <StringToReactComponent>
            {`(props) => (${progressObject.jsxCode})`}
          </StringToReactComponent>
          <div className="relative w-full h-5 bg-secondary-200 dark:bg-secondary-700 rounded-lg overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-200"
              style={{
                width: `${progressBars[index]}%`,
                backgroundColor:
                  index === 0
                    ? '#94a3b8' // slate-400
                    : index === 1
                    ? '#3b82f6' // blue-500
                    : '#10b981', // emerald-500
              }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 transition-all"
              onClick={() =>
                handleShowModal(progressObject.jsxCode, progressObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-primary-600 dark:text-accent-500 border border-primary-600 dark:border-accent-500 text-md py-2 px-4 rounded-lg shadow-md transition-all hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white"
              onClick={() =>
                handleShowModal(progressObject.jsxCode, progressObject.cssCode)
              }
            >
              React Snippet
            </button>
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-secondary-700 hover:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-700 transition-all"
              onClick={() => runProgress(index)}
            >
              Run
            </button>
          </div>
        </div>
      ))}
      <div className="col-span-3 flex justify-center space-x-4">
        <button
          className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition-all"
          onClick={resetProgress}
        >
          Reset
        </button>
      </div>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        jsxCode={jsxCode}
        cssCode={cssCode}
      />
    </div>
  );
}

export default ProgressBarSnippets;
