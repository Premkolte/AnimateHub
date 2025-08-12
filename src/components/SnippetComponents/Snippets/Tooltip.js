export const tooltipSnippets = [
  {
    title: "Hover Tooltip",
    cssCode: `/* Hover Tooltip CSS */
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  background-color: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
  pointer-events: none;
}

.tooltip::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

/* Top tooltip */
.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-5px);
  margin-bottom: 5px;
}

.tooltip.top::after {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: #1f2937;
}

/* Bottom tooltip */
.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  margin-top: 5px;
}

.tooltip.bottom::after {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: #1f2937;
}

/* Left tooltip */
.tooltip.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(-5px);
  margin-right: 5px;
}

.tooltip.left::after {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: #1f2937;
}

/* Right tooltip */
.tooltip.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(5px);
  margin-left: 5px;
}

.tooltip.right::after {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: #1f2937;
}

.tooltip-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.tooltip-container:hover .tooltip.left {
  transform: translateY(-50%) translateX(0);
}

.tooltip-container:hover .tooltip.right {
  transform: translateY(-50%) translateX(0);
}`,
    jsxCode: `import React, { useState } from 'react';

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
            className={\`px-3 py-1 rounded text-sm \${
              position === pos 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }\`}
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
          <div className={\`absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap \${
            position === 'top' ? '-top-10 left-1/2 transform -translate-x-1/2 -translate-y-1' :
            position === 'bottom' ? '-bottom-10 left-1/2 transform -translate-x-1/2 translate-y-1' :
            position === 'left' ? 'top-1/2 -left-3 transform -translate-x-full -translate-y-1/2' :
            'top-1/2 -right-3 transform translate-x-full -translate-y-1/2'
          }\`}>
            This is a tooltip!
            <div className={\`absolute w-2 h-2 bg-gray-900 transform rotate-45 \${
              position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' :
              position === 'left' ? 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2' :
              'right-full top-1/2 translate-x-1/2 -translate-y-1/2'
            }\`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    title: "Click Tooltip",
    cssCode: `/* Click Tooltip CSS */
.click-tooltip-container {
  position: relative;
  display: inline-block;
}

.click-tooltip {
  position: absolute;
  background-color: #374151;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.95);
  transition: all 0.2s ease-out;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.click-tooltip.show {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.click-tooltip::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.click-tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  margin-bottom: 6px;
}

.click-tooltip.top.show {
  transform: translateX(-50%) scale(1);
}

.click-tooltip.top::after {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: #374151;
}

.click-tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  margin-top: 6px;
}

.click-tooltip.bottom.show {
  transform: translateX(-50%) scale(1);
}

.click-tooltip.bottom::after {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: #374151;
}

.click-tooltip-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.click-tooltip-close:hover {
  color: #d1d5db;
}`,
    jsxCode: `import React, { useState, useRef, useEffect } from 'react';

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
          className={\`px-3 py-1 rounded text-sm \${
            position === 'top' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }\`}
        >
          Top
        </button>
        <button
          onClick={() => setPosition('bottom')}
          className={\`px-3 py-1 rounded text-sm \${
            position === 'bottom' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }\`}
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
            <div className={\`absolute z-20 bg-gray-700 text-white p-4 rounded-lg shadow-xl min-w-[200px] transform transition-all duration-200 \${
              position === 'top' 
                ? '-top-3 left-1/2 -translate-x-1/2 -translate-y-full' 
                : '-bottom-3 left-1/2 -translate-x-1/2 translate-y-full'
            }\`}>
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
              <div className={\`absolute w-3 h-3 bg-gray-700 transform rotate-45 \${
                position === 'top' 
                  ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' 
                  : 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
              }\`}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};`
  },
  {
    title: "Rich Tooltip",
    cssCode: `/* Rich Tooltip CSS */
.rich-tooltip-container {
  position: relative;
  display: inline-block;
}

.rich-tooltip {
  position: absolute;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
  min-width: 250px;
  max-width: 300px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
}

.rich-tooltip.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.rich-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #667eea;
}

.rich-tooltip-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.rich-tooltip-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.rich-tooltip-title {
  font-weight: 600;
  font-size: 16px;
}

.rich-tooltip-content {
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
}

.rich-tooltip-badge {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-top: 8px;
}`,
    jsxCode: `import React, { useState, useRef, useEffect } from 'react';

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
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 rounded-xl shadow-2xl min-w-[250px] z-20 opacity-0 animate-fadeIn"
              style={{
                animation: 'fadeInUp 0.3s ease-out forwards'
              }}
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
      
      <style jsx>{\`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      \`}</style>
    </div>
  );
};`
  }
];
