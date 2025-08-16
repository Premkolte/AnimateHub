export const modalSnippets = [
  {
    title: "Basic Modal",
    cssCode: `/* Basic Modal CSS */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.9);
  animation: scaleIn 0.3s ease-out forwards;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
}

.close-button:hover {
  color: #374151;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes scaleIn {
  to { transform: scale(1); }
}`,
    jsxCode: `import React, { useState } from 'react';

const BasicModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button 
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors motion-reduce:transition-none"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn motion-reduce:animate-none">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform animate-scaleIn motion-reduce:animate-none motion-reduce:transform-none">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Modal Title</h3>
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
};`,
  },
  {
    title: "Large Modal",
    cssCode: `/* Large Modal CSS */
.large-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.4s ease-out forwards;
}

.large-modal-content {
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 800px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translateY(-20px);
  animation: slideDown 0.4s ease-out forwards;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.large-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;
}

.large-modal-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
}

.large-close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #9ca3af;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.large-close-button:hover {
  color: #374151;
  background-color: #f3f4f6;
}

@keyframes slideDown {
  to { transform: translateY(0); }
}`,
    jsxCode: `import React, { useState } from 'react';

const LargeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button 
        onClick={openModal}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors motion-reduce:transition-none font-semibold"
      >
        Open Large Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn motion-reduce:animate-none">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 transform animate-slideDown shadow-2xl max-h-[90vh] overflow-y-auto motion-reduce:animate-none motion-reduce:transform-none">
            <div className="flex justify-between items-center mb-6 pb-5 border-b-2 border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900">Large Modal Dialog</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all motion-reduce:transition-none text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Content Section</h4>
              <p className="text-gray-700 mb-4">
                This is a large modal that can contain more extensive content. It has a wider layout 
                and more prominent styling to accommodate detailed information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Feature 1</h5>
                  <p className="text-sm text-gray-600">Description of feature 1</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Feature 2</h5>
                  <p className="text-sm text-gray-600">Description of feature 2</p>
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
};`,
  },
  {
    title: "Alert Modal",
    cssCode: `/* Alert Modal CSS */
.alert-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

.alert-modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  transform: scale(0.8);
  animation: bounceIn 0.4s ease-out forwards;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.alert-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.alert-icon.warning {
  background-color: #fef3cd;
  color: #d97706;
}

.alert-icon.error {
  background-color: #fee2e2;
  color: #dc2626;
}

.alert-icon.success {
  background-color: #d1fae5;
  color: #059669;
}

.alert-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.alert-message {
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.5;
}

@keyframes bounceIn {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}`,
    jsxCode: `import React, { useState } from 'react';

const AlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState('warning');

  const openModal = (type) => {
    setAlertType(type);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const alertConfig = {
    warning: {
      icon: '⚠️',
      title: 'Warning',
      message: 'Are you sure you want to proceed? This action cannot be undone.',
      confirmText: 'Proceed',
      confirmClass: 'bg-yellow-600 hover:bg-yellow-700'
    },
    error: {
      icon: '❌',
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      confirmText: 'Try Again',
      confirmClass: 'bg-red-600 hover:bg-red-700'
    },
    success: {
      icon: '✅',
      title: 'Success',
      message: 'Your action has been completed successfully!',
      confirmText: 'Continue',
      confirmClass: 'bg-green-600 hover:bg-green-700'
    }
  };

  const config = alertConfig[alertType];

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <button 
          onClick={() => openModal('warning')}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors motion-reduce:transition-none"
        >
          Warning Alert
        </button>
        <button 
          onClick={() => openModal('error')}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors motion-reduce:transition-none"
        >
          Error Alert
        </button>
        <button 
          onClick={() => openModal('success')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors motion-reduce:transition-none"
        >
          Success Alert
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn motion-reduce:animate-none">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center transform animate-bounceIn shadow-xl motion-reduce:animate-none motion-reduce:transform-none">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
              {config.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{config.title}</h3>
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
                className={\`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors motion-reduce:transition-none \${config.confirmClass}\`}
              >
                {config.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};`,
  },
];