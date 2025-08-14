import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import StringToReactComponent from 'string-to-react-component';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Modal({ showModal, onClose, jsxCode, cssCode }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  if (!showModal) return null;

  const handleCopy = (text) => {
    setCopyStatus(text);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Here you could save to user's favorites in the future
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-screen overflow-auto relative">
        <button
          className="absolute top-4 right-4 text-2xl text-secondary-700 dark:text-white hover:text-red-500"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        {/* Favorite Button - Only show when signed in */}
        <SignedIn>
          <button
            className="absolute top-4 right-12 text-2xl text-secondary-700 dark:text-white hover:text-red-500 transition-colors"
            onClick={handleFavorite}
            title="Add to favorites"
          >
            {isFavorited ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
          </button>
        </SignedIn>

        <div className="p-10 flex justify-center items-center">
          <StringToReactComponent>
            {`(props) => ${jsxCode}`}
          </StringToReactComponent>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="bg-secondary-800 text-white rounded-lg w-full p-2">
            <div className="flex items-center justify-between">
              <div className="bg-green-500 p-2 rounded text-sm font-medium">JSX</div>
              <CopyToClipboard text={jsxCode} onCopy={() => handleCopy(jsxCode)}>
                <button className="bg-white text-black dark:bg-white dark:text-black p-2 px-4 rounded-lg">
                  {copyStatus === jsxCode ? 'Copied!' : 'Copy to clipboard'}
                </button>
              </CopyToClipboard>
            </div>
            <pre className="overflow-x-auto p-4">{jsxCode}</pre>
          </div>

          <div className="bg-secondary-800 text-white rounded-lg w-full p-2">
            <div className="flex items-center justify-between">
              <div className="bg-green-500 p-2 rounded text-sm font-medium">CSS</div>
              <CopyToClipboard text={cssCode} onCopy={() => handleCopy(cssCode)}>
                <button className="bg-white text-black dark:bg-white dark:text-black p-2 px-4 rounded-lg">
                  {copyStatus === cssCode ? 'Copied!' : 'Copy to clipboard'}
                </button>
              </CopyToClipboard>
            </div>
            <pre className="overflow-x-auto p-4">{cssCode}</pre>
          </div>

          {/* Sign-in prompt for additional features */}
          <SignedOut>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AiOutlineHeart className="text-indigo-500 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                      Want to save your favorite snippets?
                    </p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300">
                      Sign in to create collections and access more features
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to="/sign-in"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-md transition duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs px-3 py-1 rounded-md transition duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default Modal;
