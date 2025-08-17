import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io"; // Not used now but imported
import { Buttons } from "./Buttons"; // Importing button list from Buttons.js
import { useNavigate } from "react-router-dom"; // For navigating to different routes
import { PanelLeft, PanelRight } from "lucide-react"; // Sidebar toggle icons

/**
 * Sidebar Component
 * -----------------
 * - Renders a responsive sidebar with navigation buttons.
 * - Supports search filtering, active tab highlight, mobile toggle.
 * - Includes backdrop overlay in mobile view.
 * - Smooth transitions and gradient styling for a modern UI.
 */
function SideBar({ activeTab, setActiveTab, filteredButtons, searchQuery }) {
  // State to manage open/close for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hook to navigate programmatically to routes
  const navigate = useNavigate();

  /**
   * Handle Tab Click
   * ----------------
   * - Updates the active tab.
   * - Closes sidebar in mobile view for better UX.
   */
  const handleTabClick = (originalIndex) => {
    setActiveTab(originalIndex);
    setIsSidebarOpen(false); // auto close on mobile after selection
  };

  /**
   * Decide which buttons to render
   * -------------------------------
   * - If searchQuery exists -> use filtered buttons.
   * - Else -> display all buttons from Buttons.js with their index.
   */
  const buttonsToShow = searchQuery
    ? filteredButtons
    : Buttons.map((button, index) => ({ button, originalIndex: index }));

  /**
   * Highlight Matching Search Text
   * -------------------------------
   * - Splits the button text based on regex match with query.
   * - Wraps matched text in <span> with highlight styles.
   */
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
      {/* ========== Mobile Sidebar Toggle Button ========== */}
      {/* Visible only in small screens (lg:hidden) */}
      {/* Positioned absolute on right side of screen */}
      <div className="lg:hidden absolute top-[56%] right-6 -translate-y-1/2 z-50">
        <button
          className="flex items-center justify-center rounded-xl p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {/* Toggle between open/close icon */}
          {isSidebarOpen ? <PanelRight size={24} /> : <PanelLeft size={24} />}
        </button>
      </div>

      {/* ========== Backdrop for mobile overlay ========== */}
      {/* Appears when sidebar is open in mobile */}
      {/* Clicking on backdrop closes the sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========== Main Sidebar Container ========== */}
      <div
        className={`fixed top-16 bottom-0 left-0 z-40
        bg-white/70 dark:bg-secondary-900/70 
        backdrop-blur-xl border-r border-white/20 dark:border-purple-800/40
        shadow-2xl rounded-r-2xl transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
        style={{
          maxHeight: "100vh", // Sidebar should never exceed screen height
          width: "260px", // Fixed width sidebar
        }}
      >
        {/* Sidebar Inner Wrapper */}
        <div className="p-5 h-full flex flex-col justify-between">
          {/* ========== Buttons Section ========== */}
          <div className="space-y-3">
            {/* Quick Shortcut Button: Navigate to My Snippets Page */}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-xl text-sm text-left font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full"
              onClick={() => {
                navigate("/my-snippets");
                setIsSidebarOpen(false);
              }}
            >
              ✍️ My Snippets
            </button>

            {/* ========== Dynamic Button List ========== */}
            {buttonsToShow.length > 0 ? (
              buttonsToShow.map(({ button, originalIndex }) => (
                <button
                  key={originalIndex}
                  className={`relative block text-left w-full py-2.5 px-4 text-sm font-medium transition-all duration-300 overflow-hidden
        ${
          activeTab === originalIndex
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-[1.02] rounded-xl"
            : "bg-white/60 dark:bg-secondary-800/70 text-secondary-900 dark:text-gray-200 rounded-xl"
        } group`}
                  onClick={() => handleTabClick(originalIndex)}
                >
                  {/* If search query exists → highlight matches */}
                  {searchQuery ? highlightMatch(button, searchQuery) : button}

                  {/* Hover underline animation effect */}
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-500 group-hover:w-full"></span>

                  {/* Divider line between buttons */}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-gray-500 dark:bg-gray-700 opacity-40 group-hover:opacity-0"></span>
                </button>
              ))
            ) : (
              // ========== No Results UI ==========
              <div className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm">
                <p className="mb-1">No components found</p>
                <p className="opacity-70">Try a different search term</p>
              </div>
            )}
          </div>

          {/* ========== Sidebar Footer ========== */}
          <div className="px-4 py-4 border-t border-white/20 dark:border-purple-800/40 text-xs text-gray-600 dark:text-gray-400">
            {/* Keyboard Shortcut Tip */}
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
