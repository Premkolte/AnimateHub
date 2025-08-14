import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Buttons } from "./Buttons";

function SideBar({ activeTab, setActiveTab, filteredButtons, searchQuery }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabClick = (originalIndex) => {
    setActiveTab(originalIndex);
    setIsSidebarOpen(false);
  };

  const buttonsToShow = searchQuery ? filteredButtons : Buttons.map((button, index) => ({ button, originalIndex: index }));

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-600 text-secondary-900 dark:text-white">
            {part}
          </span>
        );
      }
      return part;
    });
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
  className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-secondary-900 border border-blue-300 dark:border-[#a855f7]
    text-gray-300 shadow-xl rounded-xl transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
  style={{ maxHeight: "calc(100vh - 35px)", width: "260px", bottom: "35px" }}
>

        <div className="p-4 h-full flex flex-col justify-between bg-white dark:bg-secondary-900">
          <div className="space-y-2 mb-4 pb-4 inline-flex flex-col w-auto min-w-full bg-white dark:bg-secondary-900">
            {buttonsToShow.length > 0 ? (
              buttonsToShow.map(({ button, originalIndex }, displayIndex) => (
                <button
                  key={originalIndex}
                  className={`${activeTab === originalIndex
                      ? "bg-primary-600 text-white dark:bg-purple-700"
                      : "bg-primary-100 dark:bg-secondary-800 text-secondary-900 dark:text-white hover:bg-primary-600 hover:text-white"
                    } py-2 px-4 rounded-md text-sm text-left focus:outline-none transition-colors duration-300 w-full`}
                  onClick={() => handleTabClick(originalIndex)}
                >
                  {searchQuery ? highlightMatch(button, searchQuery) : button}
                </button>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                <p className="mb-2">No components found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
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