import { useState, useMemo, useEffect, useCallback } from "react";
import { Buttons } from "./Buttons";
import SideBar from "./SideBar";
import Window from "./Window";
import WelcomeMessage from "../../components/layout/WelcomeMessage";
import { FaSearch } from "react-icons/fa";

// Custom hook for debouncing a value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
  const [activeFilter, setActiveFilter] = useState('All');

  

  const filteredButtons = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return Buttons.map((button, index) => ({ button, originalIndex: index }));
    }
    return Buttons.map((button, index) => ({ button, originalIndex: index }))
      .filter(({ button }) =>
        button.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
  }, [debouncedSearchQuery]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setActiveTab(0);
  }, []);

  

  const handleKeyDown = useCallback((e) => {
    if (!debouncedSearchQuery.trim() || filteredButtons.length === 0) return;
    const currentIndex = filteredButtons.findIndex(({ originalIndex }) => originalIndex === activeTab);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex < filteredButtons.length - 1 ? currentIndex + 1 : 0;
      setActiveTab(filteredButtons[nextIndex].originalIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredButtons.length - 1;
      setActiveTab(filteredButtons[prevIndex].originalIndex);
    } else if (e.key === 'Escape') {
      clearSearch();
    }
  }, [debouncedSearchQuery, filteredButtons, activeTab, clearSearch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (debouncedSearchQuery.trim() && filteredButtons.length > 0) {
      setActiveTab(filteredButtons[0].originalIndex);
    } else if (!debouncedSearchQuery.trim()) {
      setActiveTab(0);
    }
  }, [filteredButtons, debouncedSearchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 p-2">
      <div className="container mx-auto px-4 pt-8">
        <WelcomeMessage />
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:border-transparent transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                title="Clear search"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button className="px-3 py-1 text-sm font-medium rounded-full bg-blue-600 text-white">
            All
            </button>
          <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-secondary-600">
            hover
          </button>
          <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-secondary-600">
            slide
          </button>
          <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-secondary-600">
            animation
          </button>
          <button className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-secondary-600">
            form
          </button>
          </div>
          
          {debouncedSearchQuery && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              {filteredButtons.length > 0 
                ? `Found ${filteredButtons.length} component${filteredButtons.length === 1 ? '' : 's'}`
                : 'No components found'
              }
              {filteredButtons.length > 0 && (
                <span className="block text-xs mt-1 text-gray-500 dark:text-gray-500">
                  Use ↑↓ arrows to navigate, ESC to clear
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="h-screen flex flex-row">
        <SideBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          filteredButtons={filteredButtons}
          searchQuery={debouncedSearchQuery}
        />
        <Window activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Dashboard;
