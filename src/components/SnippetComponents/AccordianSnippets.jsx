import React, { useState } from "react";
import Modal from "../Modal";
import { accordionSnippets } from "./Snippets/Accordion";
import FavoriteButton from "../Favorites/FavoriteButton";

// Functional Accordion Components
const BasicAccordion = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 last:border-b-0">
        <button 
          className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => toggleSection(0)}
        >
          <h3 className="font-medium text-gray-900">Section 1</h3>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${openSection === 0 ? 'rotate-180' : ''}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {openSection === 0 && (
          <div className="p-4 bg-white">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        )}
      </div>
      <div>
        <button 
          className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => toggleSection(1)}
        >
          <h3 className="font-medium text-gray-900">Section 2</h3>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${openSection === 1 ? 'rotate-180' : ''}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {openSection === 1 && (
          <div className="p-4 bg-white">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StyledAccordion = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="space-y-2">
      <div className="border border-purple-200 rounded-lg overflow-hidden">
        <button 
          className="flex justify-between items-center w-full p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          onClick={() => toggleItem(0)}
        >
          <h3 className="font-semibold text-purple-800">Getting Started</h3>
          <svg 
            className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${openItem === 0 ? 'rotate-180' : ''}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {openItem === 0 && (
          <div className="p-4 bg-white">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        )}
      </div>
      <div className="border border-purple-200 rounded-lg overflow-hidden">
        <button 
          className="flex justify-between items-center w-full p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          onClick={() => toggleItem(1)}
        >
          <h3 className="font-semibold text-purple-800">Advanced Features</h3>
          <svg 
            className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${openItem === 1 ? 'rotate-180' : ''}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {openItem === 1 && (
          <div className="p-4 bg-white">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FAQAccordion = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="rounded-lg shadow-sm border border-gray-100 bg-white overflow-hidden">
        <button 
          className="flex justify-between items-center w-full p-4 text-left hover:bg-slate-50 transition-colors duration-200"
          onClick={() => toggleFAQ(0)}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm font-medium">Q</span>
            <h3 className="font-semibold text-slate-700">How do I create an account?</h3>
          </div>
          <span className={`text-2xl text-slate-400 transition-transform duration-300 ${openFAQ === 0 ? 'rotate-45' : ''}`}>+</span>
        </button>
        {openFAQ === 0 && (
          <div className="p-4 bg-white border-t border-gray-100">
            <p className="text-slate-600 pl-9">To create an account, click on the "Sign Up" button in the top right corner.</p>
          </div>
        )}
      </div>
      <div className="rounded-lg shadow-sm border border-gray-100 bg-white overflow-hidden">
        <button 
          className="flex justify-between items-center w-full p-4 text-left hover:bg-slate-50 transition-colors duration-200"
          onClick={() => toggleFAQ(1)}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm font-medium">Q</span>
            <h3 className="font-semibold text-slate-700">What payment methods do you accept?</h3>
          </div>
          <span className={`text-2xl text-slate-400 transition-transform duration-300 ${openFAQ === 1 ? 'rotate-45' : ''}`}>+</span>
        </button>
        {openFAQ === 1 && (
          <div className="p-4 bg-white border-t border-gray-100">
            <p className="text-slate-600 pl-9">We accept all major credit cards and PayPal.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AccordianSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const renderAccordion = (index) => {
    switch(index) {
      case 0:
        return <BasicAccordion />;
      case 1:
        return <StyledAccordion />;
      case 2:
        return <FAQAccordion />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {accordionSnippets.map((accordionObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
        >
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              snippet={{
                type: 'accordion',
                index: index,
                title: accordionObject.title,
                jsxCode: accordionObject.jsxCode,
                cssCode: accordionObject.cssCode,
              }}
              size="md"
            />
          </div>

          <h2 className="text-xl font-semibold text-center">{accordionObject.title}</h2>

          <div className="w-full">
            {renderAccordion(index)}
          </div>

          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(accordionObject.jsxCode, accordionObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-md py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() =>
                handleShowModal(accordionObject.jsxCode, accordionObject.cssCode)
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

export default AccordianSnippets;