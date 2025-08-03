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
      {/* Menu Icon for Mobile */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          className="flex items-center justify-center rounded-md p-2 bg-secondary-200 dark:bg-secondary-800 hover:bg-secondary-300 dark:hover:bg-secondary-700 focus:outline-none mt-12 md:mt-0"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <IoMdClose
              size={24}
              className="text-secondary-900 dark:text-white"
            />
          ) : (
            <IoMdMenu
              size={24}
              className="text-secondary-900 dark:text-white"
            />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-secondary-900 shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
        style={{ maxHeight: "100vh" }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="space-y-2 mb-4 pb-4 inline-flex flex-col w-auto min-w-full">
            {Buttons.map((button, index) => (
              <button
                key={index}
                className={`${
                  activeTab === index
                    ? "bg-primary-600 text-white dark:bg-purple-700"
                    : "bg-primary-100 dark:bg-secondary-800 text-secondary-900 dark:text-white hover:bg-primary-600 hover:text-white"
                } py-2 px-4 rounded-md text-lg text-left focus:outline-none transition-colors duration-300 w-full`}
                onClick={() => handleTabClick(index)}
              >
                {button}
              </button>
            ))}
          </div>

          <div className="text-center text-sm text-secondary-700 dark:text-secondary-300">
            Type{" "}
            <kbd className="px-2 py-1.5 text-secondary-900 bg-gray-100 dark:bg-secondary-700 border border-gray-300 dark:border-secondary-600 rounded-lg">
              cmd
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-1.5 text-secondary-900 bg-gray-100 dark:bg-secondary-700 border border-gray-300 dark:border-secondary-600 rounded-lg">
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
