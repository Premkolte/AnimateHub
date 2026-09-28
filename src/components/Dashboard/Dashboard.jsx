import React, { useState } from "react";
import SideBar from "./SideBar";
import PulseButtonSnippets from "../SnippetComponents/PulseButtonSnippets";

const Dashboard = () => {
  // State to track which category is selected in the sidebar
  const [activeTab, setActiveTab] = useState("Pulse Buttons");

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar component - passing state setter to change tabs */}
      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* FIXED: Removed the extra closing brace here */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            {activeTab}
          </h1>

          {/* Conditional Rendering Logic for your feature */}
          {activeTab === "Pulse Buttons" && <PulseButtonSnippets />}

          {/* Add future conditional renders here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;