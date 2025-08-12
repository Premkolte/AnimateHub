import React, { useState, useRef, useEffect } from "react";
import Modal from "../Modal";
import { tooltipSnippets } from "./Snippets/Tooltip";
import FavoriteButton from "../Favorites/FavoriteButton";

// Functional Tooltip Components
const HoverTooltip = () => {
  const [position, setPosition] = useState('top');

  const positions = ['top', 'bottom', 'left', 'right'];

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-4">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setPosition(pos)}
            className={`px-3 py-1 rounded text-sm ${
              position === pos 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pos}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center py-8">
        <div className="relative inline-block group">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Hover me
          </button>
          <div className={`absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
            position === 'top' ? '-top-10 left-1/2 transform -translate-x-1/2 -translate-y-1' :
            position === 'bottom' ? '-bottom-10 left-1/2 transform -translate-x-1/2 translate-y-1' :
            position === 'left' ? 'top-1/2 -left-3 transform -translate-x-full -translate-y-1/2' :
            'top-1/2 -right-3 transform translate-x-full -translate-y-1/2'
          }`}>
            This is a tooltip!
            <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' :
              position === 'left' ? 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2' :
              'right-full top-1/2 translate-x-1/2 -translate-y-1/2'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClickTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState('bottom');
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  const closeTooltip = () => {
    setIsOpen(false);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        closeTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setPosition('top')}
          className={`px-3 py-1 rounded text-sm ${
            position === 'top' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Top
        </button>
        <button
          onClick={() => setPosition('bottom')}
          className={`px-3 py-1 rounded text-sm ${
            position === 'bottom' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Bottom
        </button>
      </div>

      <div className="flex justify-center py-8">
        <div className="relative" ref={tooltipRef}>
          <button
            onClick={toggleTooltip}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Click me
          </button>
          
          {isOpen && (
            <div className={`absolute z-20 bg-gray-700 text-white p-4 rounded-lg shadow-xl min-w-[200px] transform transition-all duration-200 ${
              position === 'top' 
                ? '-top-3 left-1/2 -translate-x-1/2 -translate-y-full' 
                : '-bottom-3 left-1/2 -translate-x-1/2 translate-y-full'
            }`}>
              <button
                onClick={closeTooltip}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-lg leading-none"
              >
                ×
              </button>
              <div className="pr-6">
                <h4 className="font-semibold mb-2">Click Tooltip</h4>
                <p className="text-sm text-gray-300">
                  This tooltip appears when you click the button and stays open until dismissed.
                </p>
              </div>
              <div className={`absolute w-3 h-3 bg-gray-700 transform rotate-45 ${
                position === 'top' 
                  ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' 
                  : 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
              }`}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RichTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const timeoutRef = useRef(null);

  const showTooltip = (tooltipId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveTooltip(tooltipId);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 200);
  };

  const keepTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltips = [
    {
      id: 'user',
      icon: '👤',
      title: 'User Profile',
      content: 'View and edit your profile information, settings, and preferences.',
      badge: 'Premium'
    },
    {
      id: 'settings',
      icon: '⚙️',
      title: 'Settings',
      content: 'Configure your application settings, notifications, and privacy options.',
      badge: 'Updated'
    },
    {
      id: 'help',
      icon: '❓',
      title: 'Help Center',
      content: 'Find answers to common questions, tutorials, and contact support.',
      badge: 'New'
    }
  ];

  return (
    <div className="flex justify-center space-x-6 py-8">
      {tooltips.map((tooltip) => (
        <div key={tooltip.id} className="relative">
          <button
            onMouseEnter={() => showTooltip(tooltip.id)}
            onMouseLeave={hideTooltip}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="text-xl">{tooltip.icon}</span>
          </button>
          
          {activeTooltip === tooltip.id && (
            <div
              onMouseEnter={keepTooltip}
              onMouseLeave={hideTooltip}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 rounded-xl shadow-2xl min-w-[250px] z-20 animate-fadeInUp"
            >
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2 text-sm">
                  {tooltip.icon}
                </div>
                <h4 className="font-semibold text-base">{tooltip.title}</h4>
              </div>
              <p className="text-sm text-gray-100 leading-relaxed mb-2">
                {tooltip.content}
              </p>
              <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs">
                {tooltip.badge}
              </span>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-indigo-600"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const TooltipSnippets = () => {
  const [showModal, setShowModal] = useState(false);
  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  const handleShowModal = (jsx, css) => {
    setJsxCode(jsx);
    setCssCode(css);
    setShowModal(true);
  };

  const renderTooltip = (index) => {
    switch(index) {
      case 0:
        return <HoverTooltip />;
      case 1:
        return <ClickTooltip />;
      case 2:
        return <RichTooltip />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tooltipSnippets.map((tooltipObject, index) => (
        <div
          key={index}
          className="p-8 pt-14 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-lg shadow-lg flex flex-col items-center justify-evenly gap-10 relative"
        >
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              snippet={{
                type: 'tooltip',
                index: index,
                title: tooltipObject.title,
                jsxCode: tooltipObject.jsxCode,
                cssCode: tooltipObject.cssCode,
              }}
              size="md"
            />
          </div>

          <h2 className="text-xl font-semibold text-center">{tooltipObject.title}</h2>

          <div className="w-full flex justify-center">
            {renderTooltip(index)}
          </div>

          <div className="flex space-x-4">
            <button
              className="text-white text-md py-3 px-2 rounded-lg shadow-md bg-primary-600 dark:bg-accent-600 hover:bg-primary-700 dark:hover:bg-accent-700 hover:shadow-xl focus:outline-none"
              onClick={() =>
                handleShowModal(tooltipObject.jsxCode, tooltipObject.cssCode)
              }
            >
              Show CSS
            </button>
            <button
              className="text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-md py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() =>
                handleShowModal(tooltipObject.jsxCode, tooltipObject.cssCode)
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

export default TooltipSnippets;
