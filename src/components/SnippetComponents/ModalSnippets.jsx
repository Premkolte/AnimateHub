import React, { useState } from "react";
import Modal from "../UI/Modal";
import { modalSnippets } from "./Snippets/Modal";
import FavoriteButton from "../../Pages/Favorites/FavoriteButton";

// Functional Modal Components
const BasicModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform animate-scaleIn">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Modal Title
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">
                This is a basic modal dialog. You can put any content here.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LargeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
      >
        Open Large Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 transform animate-slideDown shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-5 border-b-2 border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900">
                Large Modal Dialog
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">
                Content Section
              </h4>
              <p className="text-gray-700 mb-4">
                This is a large modal that can contain more extensive content.
                It has a wider layout and more prominent styling to accommodate
                detailed information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Feature 1</h5>
                  <p className="text-sm text-gray-600">
                    Description of feature 1
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Feature 2</h5>
                  <p className="text-sm text-gray-600">
                    Description of feature 2
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState("warning");

  const openModal = (type) => {
    setAlertType(type);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const alertConfig = {
    warning: {
      icon: "⚠️",
      title: "Warning",
      message:
        "Are you sure you want to proceed? This action cannot be undone.",
      confirmText: "Proceed",
      confirmClass: "bg-yellow-600 hover:bg-yellow-700",
    },
    error: {
      icon: "❌",
      title: "Error",
      message: "Something went wrong. Please try again later.",
      confirmText: "Try Again",
      confirmClass: "bg-red-600 hover:bg-red-700",
    },
    success: {
      icon: "✅",
      title: "Success",
      message: "Your action has been completed successfully!",
      confirmText: "Continue",
      confirmClass: "bg-green-600 hover:bg-green-700",
    },
  };

  const config = alertConfig[alertType];

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <button
          onClick={() => openModal("warning")}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Warning Alert
        </button>
        <button
          onClick={() => openModal("error")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Error Alert
        </button>
        <button
          onClick={() => openModal("success")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Success Alert
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center transform animate-bounceIn shadow-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
              {config.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {config.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {config.message}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${config.confirmClass}`}
              >
                {config.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const renderModal = (index) => {
    switch (index) {
      case 0:
        return <BasicModal />;
      case 1:
        return <LargeModal />;
      case 2:
        return <AlertModal />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eff6ff] dark:bg-secondary-900 rounded-lg ">
      {modalSnippets.map((modalObject, index) => (
        <div
          key={index}
          className="
  p-8 pt-14 
  bg-[#dbeafe]
 dark:bg-secondary-700 
  text-secondary-900 dark:text-white 
  rounded-lg 
border border-blue-300 dark:border-[#a855f7]
  shadow-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
  flex flex-col items-center justify-evenly gap-10 relative 
  text-sm
"
        >
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              snippet={{
                type: "modal",
                index: index,
                title: modalObject.title,
                jsxCode: modalObject.jsxCode,
                cssCode: modalObject.cssCode,
              }}
              size="md"
            />
          </div>

          <h2 className="text-xl font-semibold text-center">
            {modalObject.title}
          </h2>

          <div className="w-full flex justify-center">{renderModal(index)}</div>

          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full text-white text-md py-3 px-6 rounded-full shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(modalObject.jsxCode, modalObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="w-full text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-md py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() =>
                handleShowModal(modalObject.jsxCode, modalObject.cssCode)
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
        cssCode={cssCode}
      />
    </div>
  );
};

export default ModalSnippets;
