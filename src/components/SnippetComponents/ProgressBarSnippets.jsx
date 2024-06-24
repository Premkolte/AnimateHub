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

  const runProgress = () => {
    // Clear any existing interval
    clearInterval(intervalRef.current);

    let currentBarIndex = 0;
    const interval = setInterval(() => {
      // Update progress for current bar
      setProgressBars(prevProgressBars => {
        const updatedProgressBars = [...prevProgressBars];
        updatedProgressBars[currentBarIndex] += 1;
        return updatedProgressBars;
      });

      // Check if current bar is complete
      if (progressBars[currentBarIndex] >= 100) {
        currentBarIndex += 1; // Move to next bar
        // Reset after the last bar
        if (currentBarIndex >= progressBarSnippets.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 20); // Adjust interval duration (ms) for smoother animation

    // Store interval reference for clearing later
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
          className="p-8 pt-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
        >
          <StringToReactComponent>
            {`(props) => (${progressObject.jsxCode})`}
          </StringToReactComponent>
          <div className="relative w-full h-5 bg-gray-300 rounded-lg overflow-hidden">
            <div
              className="absolute top-0 left-0 bg-green-500 h-full"
              style={{ width: `${progressBars[index]}%` }}
            ></div>
          </div>
          <div className="flex space-x-4">
            <button
              className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(progressObject.jsxCode, progressObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-black text-md py-2 px-4 rounded-lg shadow-md"
              onClick={() =>
                handleShowModal(progressObject.jsxCode, progressObject.cssCode)
              }
            >
              React Snippet
            </button>
          </div>
        </div>
      ))}
      <div className="col-span-3 flex justify-center space-x-4">
        <button
          className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 focus:outline-none"
          onClick={runProgress}
        >
          Run
        </button>
        <button
          className="text-white text-md py-2 px-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 focus:outline-none"
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
