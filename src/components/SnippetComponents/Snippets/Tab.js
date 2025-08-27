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
  {
    title: "Rounded Tab Group",
    jsxCode: `(props) => {
      const [activeTab, setActiveTab] = React.useState(0);

      const tabs = [
        { title: "Dashboard", content: "Dashboard content with analytics" },
        { title: "Settings", content: "Configure your preferences" },
        { title: "Notifications", content: "Manage your notifications" }
      ];

      return (
        <div className="rounded-tab-wrapper">
          <div className="rounded-tab-header">
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
          <div className="rounded-tab-content">
            {tabs[activeTab].content}
          </div>
        </div>
      );
    }`,
    cssCode: `.rounded-tab-wrapper {
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }

    .rounded-tab-header {
      display: flex;
      gap: 8px;
      margin-bottom: 0;
      flex-wrap: wrap;
      border-bottom: 1px solid #ccc;
      padding: 8px;
    }

    .rounded-tab-header button {
      padding: 12px 24px;
      cursor: pointer;
      background: none;
      border: none;
      border-radius: 25px;
      outline: none;
      font-size: 16px;
      transition: all 0.3s ease;
      flex: 1;
      min-width: 120px;
    }

    .rounded-tab-header button.active {
      border-bottom: 2px solid #007bff;
      font-weight: bold;
    }

    .rounded-tab-header button:hover {
      background: #f0f0f0;
    }

    .rounded-tab-content {
      padding: 20px;
      border: none;
      border-radius: 0;
    }

    @media (max-width: 768px) {
      .rounded-tab-header {
        gap: 6px;
        padding: 6px;
      }
      
      .rounded-tab-header button {
        padding: 10px 16px;
        font-size: 14px;
        min-width: 100px;
      }
      
      .rounded-tab-content {
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .rounded-tab-header button {
        flex: 1 1 100%;
        margin-bottom: 4px;
      }
    }`,
  },
  {
    title: "Card Style Tab Group",
    jsxCode: `(props) => {
      const [activeTab, setActiveTab] = React.useState(0);

      const tabs = [
        { title: "Overview", content: "Project overview and statistics" },
        { title: "Tasks", content: "View and manage your tasks" },
        { title: "Team", content: "Team members and collaboration" },
        { title: "Reports", content: "Generated reports and analytics" }
      ];

      return (
        <div className="card-tab-container">
          <div className="card-tab-header">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={activeTab === index ? "card-tab active" : "card-tab"}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          <div className="card-tab-content">
            {tabs[activeTab].content}
          </div>
        </div>
      );
    }`,
    cssCode: `    .card-tab-container {
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }

    .card-tab-header {
      display: flex;
      gap: 12px;
      margin-bottom: 0;
      flex-wrap: wrap;
      border-bottom: 1px solid #ccc;
      padding: 8px;
    }

    .card-tab {
      padding: 16px 20px;
      cursor: pointer;
      background: none;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      flex: 1;
      min-width: 120px;
    }

    .card-tab.active {
      border-bottom: 2px solid #007bff;
      font-weight: bold;
    }

    .card-tab:hover:not(.active) {
      background: #f0f0f0;
    }

    .card-tab-content {
      padding: 20px;
      border: none;
      min-height: 150px;
    }

    @media (max-width: 768px) {
      .card-tab-header {
        gap: 8px;
        padding: 6px;
      }
      
      .card-tab {
        padding: 12px 16px;
        font-size: 13px;
        min-width: 100px;
      }
      
      .card-tab-content {
        padding: 16px;
        min-height: 120px;
      }
    }

    @media (max-width: 480px) {
      .card-tab {
        flex: 1 1 calc(50% - 4px);
      }
    }

    @media (max-width: 320px) {
      .card-tab {
        flex: 1 1 100%;
      }
    }`,
  },
  {
    title: "Vertical Tab Group",
    jsxCode: `(props) => {
      const [activeTab, setActiveTab] = React.useState(0);

      const tabs = [
        { title: "General", content: "General application settings and preferences" },
        { title: "Security", content: "Security settings and privacy controls" },
        { title: "Advanced", content: "Advanced configuration options" }
      ];

      return (
        <div className="vertical-tab-container">
          <div className="vertical-tab-sidebar">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={activeTab === index ? "vertical-tab active" : "vertical-tab"}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="vertical-tab-content">
            {tabs[activeTab].content}
          </div>
        </div>
      );
    }`,
    cssCode: `.vertical-tab-container {
      display: flex;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }

    .vertical-tab-sidebar {
      width: 200px;
      background: none;
      border-right: 1px solid #ccc;
      display: flex;
      flex-direction: column;
    }

    .vertical-tab {
      padding: 16px 20px;
      cursor: pointer;
      background: transparent;
      border: none;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      text-align: left;
      transition: all 0.3s ease;
      outline: none;
    }

    .vertical-tab:last-child {
      border-bottom: none;
    }

    .vertical-tab.active {
      border-bottom: 2px solid #007bff;
      font-weight: bold;
    }

    .vertical-tab:hover:not(.active) {
      background: #f0f0f0;
    }

    .vertical-tab-content {
      flex: 1;
      padding: 20px;
      min-height: 200px;
    }

    @media (max-width: 768px) {
      .vertical-tab-container {
        flex-direction: column;
      }
      
      .vertical-tab-sidebar {
        width: 100%;
        flex-direction: row;
        overflow-x: auto;
        border-right: none;
        border-bottom: 1px solid #ccc;
      }
      
      .vertical-tab {
        white-space: nowrap;
        min-width: 120px;
        border-bottom: none;
        border-right: 1px solid #ccc;
        text-align: center;
      }
      
      .vertical-tab:last-child {
        border-right: none;
      }
      
      .vertical-tab-content {
        min-height: 150px;
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .vertical-tab {
        padding: 12px 16px;
        font-size: 14px;
        min-width: 100px;
      }
      
      .vertical-tab-content {
        padding: 12px;
      }
    }`,
  }
];