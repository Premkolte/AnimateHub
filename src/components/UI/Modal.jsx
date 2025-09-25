import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart, AiOutlineCode } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function Modal({ showModal, onClose, jsxCode, cssCode }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const { currentUser } = useAuthStore();

  if (!showModal) return null;

  const handleCopy = (text) => {
    setCopyStatus(text);
    setTimeout(() => setCopyStatus(""), 2000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // You could also sync this with backend later
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-screen overflow-auto relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-secondary-700 dark:text-white hover:text-red-500"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        {/* Favorite Button (only for signed in users) */}
        {currentUser && (
          <button
            className="absolute top-4 right-12 text-2xl text-secondary-700 dark:text-white hover:text-red-500 transition-colors"
            onClick={handleFavorite}
            title="Add to favorites"
          >
            {isFavorited ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
        )}

        <div className="flex flex-col items-center gap-5">
          {/* JSX / React Code */}
          {jsxCode && (
            <div className="bg-secondary-800 text-white rounded-lg w-full p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AiOutlineCode className="text-green-400" />
                  <span className="bg-green-500 p-2 rounded text-sm font-medium">
                    JSX
                  </span>
                </div>
                <CopyToClipboard
                  text={jsxCode}
                  onCopy={() => handleCopy(jsxCode)}
                >
                  <button className="bg-white text-black dark:bg-white dark:text-black p-2 px-4 rounded-lg">
                    {copyStatus === jsxCode ? "Copied!" : "Copy to clipboard"}
                  </button>
                </CopyToClipboard>
              </div>
              <pre className="overflow-x-auto p-4">
                <code>{jsxCode}</code>
              </pre>
            </div>
          )}

          {/* CSS Code */}
          {cssCode && (
            <div className="bg-secondary-800 text-white rounded-lg w-full p-2">
              <div className="flex items-center justify-between">
                <div className="bg-green-500 p-2 rounded text-sm font-medium">
                  CSS
                </div>
                <CopyToClipboard
                  text={cssCode}
                  onCopy={() => handleCopy(cssCode)}
                >
                  <button className="bg-white text-black dark:bg-white dark:text-black p-2 px-4 rounded-lg">
                    {copyStatus === cssCode ? "Copied!" : "Copy to clipboard"}
                  </button>
                </CopyToClipboard>
              </div>
              <pre className="overflow-x-auto p-4">
                <code>{cssCode}</code>
              </pre>
            </div>
          )}

          {/* Sign-in Prompt */}
          {!currentUser && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
