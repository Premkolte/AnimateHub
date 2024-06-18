import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function SideBar({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Menu Icon for Mobile Devices */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto lg:w-64 bg-white shadow-xl`}
      >
        <div className="p-2 py-4 h-full">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-center">AnimateHub</h1>
          </div>
          <div className="space-y-4">
            {Buttons.map((button, index) => (
              <button
                key={index}
                className={`${
                  activeTab === index
                    ? "bg-[#271FE0] text-white"
                    : "bg-white text-black"
                } py-2 px-1 rounded w-full text-xl text-center hover:bg-blue-500 hover:text-white`}
                onClick={() => handleTabClick(index)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
