import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Buttons } from "./Buttons";
import { useNavigate } from "react-router-dom";

function SideBar({ activeTab, setActiveTab, filteredButtons, searchQuery }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (originalIndex) => {
    setActiveTab(originalIndex);
    setIsSidebarOpen(false);
  };

  const buttonsToShow = searchQuery
    ? filteredButtons
    : Buttons.map((button, index) => ({ button, originalIndex: index }));

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span
            key={index}
            className="bg-yellow-300/60 dark:bg-yellow-600/60 px-1 rounded text-secondary-900 dark:text-white"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-6 right-4 z-50">
        <button
          className="flex items-center justify-center rounded-xl p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 
        bg-white/70 dark:bg-secondary-900/70 
        backdrop-blur-xl border-r border-white/20 dark:border-purple-800/40
        shadow-2xl rounded-r-2xl transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
        style={{
          maxHeight: "100vh",
          width: "260px",
        }}
      >
        <div className="p-5 h-full flex flex-col justify-between ">
          {/* Buttons */}

          <div className="space-y-3 ">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-xl text-sm text-left font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full"
              onClick={() => navigate("/my-snippets")}
            >
              ✍️ My Snippets
            </button>

            {buttonsToShow.length > 0 ? (
              buttonsToShow.map(({ button, originalIndex }) => (
                <button
                  key={originalIndex}
                  className={`relative block text-left w-full py-2.5 px-4 text-sm font-medium transition-all duration-300 overflow-hidden
        ${
          activeTab === originalIndex
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-[1.02] rounded-xl"
            : "bg-white/60 dark:bg-secondary-800/70 text-secondary-900 dark:text-gray-200 rounded-xl"
        } group`} // group lets us animate underline
                  onClick={() => handleTabClick(originalIndex)}
                >
                  {searchQuery ? highlightMatch(button, searchQuery) : button}

                  {/* Hover underline animation */}
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-500 group-hover:w-full"></span>

                  {/* Divider line (keeps separation but hidden on hover/active) */}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-gray-500 dark:bg-gray-700 opacity-40 group-hover:opacity-0"></span>
                </button>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm">
                <p className="mb-1">No components found</p>
                <p className="opacity-70">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Footer Shortcut */}
          <div className="px-4 py-4 border-t border-white/20 dark:border-purple-800/40 text-xs text-gray-600 dark:text-gray-400">
            Type{" "}
            <kbd className="px-2 py-1 bg-gray-800 text-white rounded-md shadow">
              cmd
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-1 bg-gray-800 text-white rounded-md shadow">
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
