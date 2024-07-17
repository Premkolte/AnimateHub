export const Tab = [
  {
    label: "Basic Tab Group",
    cssCode: `
        .tab-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 20px 0;
        }
  
        .tab-buttons {
          display: flex;
          justify-content: space-around;
          border-bottom: 2px solid #ccc;
        }
  
        .tab-button {
          padding: 10px 20px;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
        }
  
        .tab-button.active {
          border-bottom: 3px solid #007bff;
          color: #007bff;
        }
  
        .tab-content {
          padding: 20px;
          border: 1px solid #ccc;
          border-top: none;
        }
      `,
    jsxCode: `
        import React, { useState } from 'react';
        import './tabGroup.css';
  
        const TabGroup = () => {
          const [activeTab, setActiveTab] = useState(0);
  
          const tabs = [
            { label: "Tab 1", content: "Content of Tab 1" },
            { label: "Tab 2", content: "Content of Tab 2" },
            { label: "Tab 3", content: "Content of Tab 3" },
          ];
  
          return (
            <div className="tab-container">
              <div className="tab-buttons">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={\`tab-button \${index === activeTab ? 'active' : ''}\`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="tab-content">
                {tabs[activeTab].content}
              </div>
            </div>
          );
        };
  
        export default TabGroup;
      `,
  },
  {
    label: "Custom Styled Tab Group",
    cssCode: `
        .custom-tab-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 20px 0;
        }
  
        .custom-tab-buttons {
          display: flex;
          justify-content: space-around;
          border-bottom: 2px solid #e0e0e0;
          background-color: #f5f5f5;
          padding: 10px;
        }
  
        .custom-tab-button {
          padding: 10px 20px;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
          font-weight: bold;
        }
  
        .custom-tab-button.active {
          border-bottom: 3px solid #ff5722;
          color: #ff5722;
        }
  
        .custom-tab-content {
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-top: none;
          background-color: #ffffff;
        }
      `,
    jsxCode: `
        import React, { useState } from 'react';
        import './customTabGroup.css';
  
        const CustomTabGroup = () => {
          const [activeTab, setActiveTab] = useState(0);
  
          const tabs = [
            { label: "Tab A", content: "Content of Tab A" },
            { label: "Tab B", content: "Content of Tab B" },
            { label: "Tab C", content: "Content of Tab C" },
          ];
  
          return (
            <div className="custom-tab-container">
              <div className="custom-tab-buttons">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={\`custom-tab-button \${index === activeTab ? 'active' : ''}\`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="custom-tab-content">
                {tabs[activeTab].content}
              </div>
            </div>
          );
        };
  
        export default CustomTabGroup;
      `,
  },
];
