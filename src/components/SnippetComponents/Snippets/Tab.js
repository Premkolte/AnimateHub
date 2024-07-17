export const tabGroupSnippets = [
  {
    title: "Basic Tab Group",
    jsxCode: `(props) => {
      const [activeTab, setActiveTab] = React.useState(0);

      const tabs = [
        { title: "Tab 1", content: "This is Tab 1 content" },
        { title: "Tab 2", content: "This is Tab 2 content" },
        { title: "Tab 3", content: "This is Tab 3 content" }
      ];

      return (
        <div>
          <div className="tab-header">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={activeTab === index ? "active" : ""}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tabs[activeTab].content}
          </div>
        </div>
      );
    }`,
    cssCode: `.tab-header {
      display: flex;
      border-bottom: 1px solid #ccc;
    }

    .tab-header button {
      padding: 10px 20px;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
      font-size: 16px;
      transition: background 0.3s ease;
    }

    .tab-header button.active {
      border-bottom: 2px solid #007bff;
      font-weight: bold;
    }

    .tab-header button:hover {
      background: #f0f0f0;
    }

    .tab-content {
      padding: 20px;
      border: 1px solid #ccc;
      border-top: none;
    }`,
  },
  {
    title: "Styled Tab Group",
    jsxCode: `(props) => {
      const [activeTab, setActiveTab] = React.useState(0);

      const tabs = [
        { title: "Home", content: "Welcome to the Home tab" },
        { title: "Profile", content: "This is your Profile" },
      ];

      return (
        <div>
          <div className="styled-tab-header">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={activeTab === index ? "active" : ""}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="styled-tab-content">
            {tabs[activeTab].content}
          </div>
        </div>
      );
    }`,
    cssCode: `.styled-tab-header {
      display: flex;
      border-bottom: 2px solid #007bff;
      margin-bottom: 20px;
    }

    .styled-tab-header button {
      padding: 12px 24px;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
      font-size: 18px;
      transition: background 0.3s ease, color 0.3s ease;
    }

    .styled-tab-header button.active {
      border-bottom: 4px solid #007bff;
      color: #007bff;
      font-weight: bold;
    }

    .styled-tab-header button:hover {
      background: #e0e0e0;
    }

    .styled-tab-content {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 0 0 5px 5px;
    }`,
  },
];
