import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSortBy(value);
    setIsOpen(false); // close after selecting
  };

  // Label for the current selection
  const getLabel = () => {
    if (sortBy === "points") return "Sort by Points";
    if (sortBy === "prs") return "Sort by PRs";
    return "Sort by"; // fallback
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-between items-center w-44 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
      >
        {getLabel()}
        <ChevronDown
          className={`ml-2 h-4 w-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <button
            onClick={() => handleSelect("points")}
            className={`block w-full text-left px-4 py-2 text-sm rounded-t-lg transition-colors ${
              sortBy === "points"
                ? "bg-primary-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Sort by Points
          </button>
          <button
            onClick={() => handleSelect("prs")}
            className={`block w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors ${
              sortBy === "prs"
                ? "bg-primary-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Sort by PRs
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
