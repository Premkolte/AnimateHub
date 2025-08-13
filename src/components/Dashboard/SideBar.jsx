import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Buttons } from "./Buttons";

function SideBar({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="lg:hidden fixed top-10 right-4 z-50">
        <button
          className="flex items-center justify-center rounded-md p-2 bg-secondary-800 text-white hover:bg-secondary-700 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-secondary-900 text-gray-300 shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
        style={{ maxHeight: "100vh", width: "260px" }}
      >
        <div className="flex flex-col h-full">
          {/* Buttons List */}
          <div className="flex-1 px-4 py-6 space-y-1">
            {Buttons.map((button, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 font-medium ${
                  activeTab === index
                    ? "bg-secondary-800 text-white"
                    : "hover:bg-secondary-800 hover:text-white text-gray-400"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {button}
              </button>
            ))}
          </div>

          {/* Footer Shortcut Info */}
          <div className="px-4 py-4 border-t border-secondary-800 text-xs text-gray-500">
            Type{" "}
            <kbd className="px-2 py-1 bg-secondary-800 text-white rounded-md">
              cmd
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-1 bg-secondary-800 text-white rounded-md">
              K
            </kbd>{" "}
            for command palette
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
