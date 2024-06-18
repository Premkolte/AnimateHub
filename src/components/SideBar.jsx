import React, { useState } from "react";

function SideBar() {
  const [activeTab, setActiveTab] = useState(0);

  const Buttons = [
    "Button Snippets",
    "Box-shadow Snippets",
    "Card Snippets",
    "Dropdown Snippets",
    "Input-fields Snippets",
    "Radio Snippets",
    "Toggle Switches Snippets",
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="bg-white text-black h-screen w-64 p-2 py-4 shadow-xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center">AnimateHub</h1>
      </div>
      <div className="space-y-4">
        {Buttons.map((button, index) => (
          <button
            key={index}
            className={`${
              activeTab === index ? "bg-[#271FE0] text-white" : "bg-white text-black"
            } py-2 px-1 rounded w-full text-xl text-center hover:bg-blue-500 hover:text-white`}
            onClick={() => handleTabClick(index)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
