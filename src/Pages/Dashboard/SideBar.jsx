import { useState, useEffect } from "react";
import { Buttons } from "./Buttons"; // Importing button list from Buttons.js
import { useNavigate } from "react-router-dom"; // For navigating to different routes
import { PanelLeft, PanelRight, Search, Command, Sparkles, Filter, ChevronDown } from "lucide-react"; // Enhanced icons

/**
 * Enhanced Sidebar Component
 * --------------------------
 * - Modern glass morphism design with enhanced animations
 * - Micro-interactions and smooth transitions
 * - Improved accessibility and visual hierarchy
 * - Advanced gradient effects and backdrop blur
 * - Integrated search functionality with filter categories
 */
function SideBar({ activeTab, setActiveTab }) {
  // State to manage open/close for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Search functionality state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredButtons, setFilteredButtons] = useState([]);

  // Available filter categories
  const filterCategories = [
    "All",
    "hover",
    "slide",
    "animation",
    "form",
    "button",
    "card",
    "input",
  ];

  // Hook to navigate programmatically to routes
  const navigate = useNavigate();

  /**
   * Handle search input changes
   */
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    updateFilteredButtons(query, activeFilter);
  };

  /**
   * Handle filter category changes
   */
  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setActiveFilter(filter);
    updateFilteredButtons(searchQuery, filter);
  };

  /**
   * Update filtered buttons based on search query and filter category
   */
  const updateFilteredButtons = (query, filter) => {
    let buttons = Buttons.map((button, index) => ({ button, originalIndex: index }));

    // Apply search filter
    if (query.trim() !== "") {
      buttons = buttons.filter(({ button }) => 
        button.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply category filter
    if (filter !== "All") {
      buttons = buttons.filter(({ button }) =>
        button.toLowerCase().includes(filter.toLowerCase())
      );
    }

    setFilteredButtons(buttons);
  };

  /**
   * Clear search and filter functionality
   */
  const clearSearch = () => {
    setSearchQuery("");
    setActiveFilter("All");
    setFilteredButtons([]);
  };

  /**
   * Enhanced mouse tracking for advanced hover effects
   */
  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  /**
   * Handle Tab Click with enhanced feedback
   */
  const handleTabClick = (originalIndex) => {
    setActiveTab(originalIndex);
    setIsSidebarOpen(false);
    // Add haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  /**
   * Decide which buttons to render
   */
  const buttonsToShow = (searchQuery || activeFilter !== "All") 
    ? filteredButtons
    : Buttons.map((button, index) => ({ button, originalIndex: index }));

  /**
   * Enhanced highlight matching with better styling
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
            className="bg-gradient-to-r from-yellow-300/80 to-yellow-400/80 dark:from-yellow-600/80 dark:to-yellow-500/80 px-1.5 py-0.5 rounded-md text-secondary-900 dark:text-white font-semibold shadow-sm animate-pulse"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  /**
   * Enhanced keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  // Initialize filtered buttons on component mount
  useEffect(() => {
    updateFilteredButtons(searchQuery, activeFilter);
  }, []);

  return (
    <>
      {/* ========== Enhanced Mobile Toggle Button ========== */}
      <div className="lg:hidden fixed top-[16%] right-4 -translate-y-1/2 z-50">
        <button
          className="group relative flex items-center justify-center rounded-2xl p-3 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/25 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm border border-white/20"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Icon with rotation animation */}
          <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
            {isSidebarOpen ? <PanelRight size={24} /> : <PanelLeft size={24} />}
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
        </button>
      </div>

      {/* ========== Enhanced Backdrop ========== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-blue-900/20 backdrop-blur-sm z-30 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========== Enhanced Main Sidebar Container ========== */}
      <div
        className={`fixed top-16 bottom-0 left-0 z-40
        bg-gradient-to-b from-white/80 via-white/70 to-white/60 
        dark:from-secondary-900/80 dark:via-secondary-900/70 dark:to-secondary-900/60
        backdrop-blur-2xl border-r border-gradient-to-b from-white/30 via-white/20 to-white/10
        dark:border-purple-800/40 shadow-2xl rounded-r-3xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-all duration-500 ease-out
        lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto
        hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10`}
        style={{
          maxHeight: "100vh",
          width: "320px", // Slightly wider for better content spacing
        }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-transparent to-blue-500/20 rounded-r-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Sidebar Inner Wrapper */}
        <div className="relative p-6 h-full flex flex-col justify-between">
          {/* ========== Header Section ========== */}
          <div className="mb-6 space-y-4">
            {/* Enhanced "My Snippets" Button */}
            <button
              className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white py-3 px-5 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full overflow-hidden"
              onClick={() => {
                navigate("/my-snippets");
                setIsSidebarOpen(false);
              }}
            >
              {/* Animated background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Content */}
              <div className="relative flex items-center justify-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                <span>My Snippets</span>
              </div>
            </button>

            {/* ========== Enhanced Search Input ========== */}
            <div className="relative">
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
              </div>
              
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300/50 dark:border-secondary-600/50 rounded-xl 
                bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm
                text-secondary-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 
                focus:border-purple-500/50 dark:focus:border-purple-400/50 focus:bg-white/90 dark:focus:bg-secondary-800/90
                hover:border-gray-400/50 dark:hover:border-secondary-500/50
                transition-all duration-300 text-sm shadow-sm hover:shadow-md focus:shadow-lg"
              />
              
              {/* Clear Button */}
              {(searchQuery || activeFilter !== "All") && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 
                  hover:bg-gray-100/50 dark:hover:bg-secondary-700/50 rounded-r-xl transition-all duration-200 z-10
                  active:scale-95"
                  title="Clear search and filters"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Animated border on focus */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 hover:opacity-30 focus-within:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* ========== Enhanced Filter Select Dropdown ========== */}
            <div className="relative">
              {/* Filter Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Filter className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
              </div>
              
              {/* Custom Select with Chevron */}
              <div className="relative">
                <select
                  value={activeFilter}
                  onChange={handleFilterChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300/50 dark:border-secondary-600/50 rounded-xl 
                  bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm
                  text-secondary-900 dark:text-white 
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 
                  focus:border-purple-500/50 dark:focus:border-purple-400/50 focus:bg-white/90 dark:focus:bg-secondary-800/90
                  hover:border-gray-400/50 dark:hover:border-secondary-500/50
                  transition-all duration-300 text-sm shadow-sm hover:shadow-md focus:shadow-lg
                  appearance-none cursor-pointer"
                >
                  {filterCategories.map((category) => (
                    <option key={category} value={category} className="bg-white dark:bg-secondary-800">
                      {category === "All" ? "All Categories" : `${category.charAt(0).toUpperCase() + category.slice(1)} Components`}
                    </option>
                  ))}
                </select>
                
                {/* Custom Chevron Icon */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                  <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
                </div>
              </div>
              
              {/* Animated border on focus */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 hover:opacity-30 focus-within:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Search & Filter Results Counter */}
            {(searchQuery || activeFilter !== "All") && (
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 space-y-1">
                <div>
                  {buttonsToShow.length} component{buttonsToShow.length !== 1 ? 's' : ''} found
                </div>
                <div className="flex flex-wrap gap-1">
                  {searchQuery && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg font-medium">
                      Search: "{searchQuery}"
                    </span>
                  )}
                  {activeFilter !== "All" && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                      Filter: {activeFilter}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ========== Enhanced Buttons Section ========== */}
          <div className="flex-1 space-y-2">
            {buttonsToShow.length > 0 ? (
              buttonsToShow.map(({ button, originalIndex }) => (
                <button
                  key={originalIndex}
                  className={`group relative block text-left w-full py-3 px-4 text-sm font-medium transition-all duration-300 overflow-hidden rounded-xl backdrop-blur-sm
                  ${
                    activeTab === originalIndex
                      ? "bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02] border border-purple-400/50"
                      : "bg-white/50 dark:bg-secondary-800/50 text-secondary-900 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-secondary-800/70 hover:scale-[1.01] border border-transparent hover:border-purple-300/30 dark:hover:border-purple-600/30"
                  }`}
                  onClick={() => handleTabClick(originalIndex)}
                  onMouseMove={(e) => handleMouseMove(e, originalIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Dynamic gradient overlay on hover */}
                  {hoveredIndex === originalIndex && activeTab !== originalIndex && (
                    <div 
                      className="absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent opacity-50 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
                      }}
                    />
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {searchQuery ? highlightMatch(button, searchQuery) : button}
                  </div>

                  {/* Enhanced hover effects */}
                  {activeTab !== originalIndex && (
                    <>
                      {/* Bottom gradient line */}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 group-hover:w-full"></span>
                      
                      {/* Side accent */}
                      <span className="absolute left-0 top-0 w-0.5 h-0 bg-gradient-to-b from-purple-500 to-blue-500 transition-all duration-300 group-hover:h-full"></span>
                    </>
                  )}

                  {/* Active tab enhancements */}
                  {activeTab === originalIndex && (
                    <>
                      {/* Animated shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
                      
                      {/* Pulsing border */}
                      <div className="absolute inset-0 rounded-xl border-2 border-purple-400/50 animate-pulse"></div>
                    </>
                  )}
                </button>
              ))
            ) : (
              // ========== Enhanced No Results UI ==========
              <div className="text-center py-12 px-4">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-secondary-800 dark:to-secondary-700 rounded-2xl p-6 border border-gray-200/50 dark:border-secondary-600/50">
                  <Search className="mx-auto mb-3 text-gray-400 dark:text-gray-500" size={32} />
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">No components found</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                    {(searchQuery && activeFilter !== "All") 
                      ? `No results for "${searchQuery}" in ${activeFilter} category`
                      : searchQuery 
                        ? `No results for "${searchQuery}"`
                        : `No ${activeFilter} components found`
                    }
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========== Enhanced Footer ========== */}
          <div className="mt-6 px-4 py-4 bg-gradient-to-r from-white/30 to-white/20 dark:from-secondary-800/30 dark:to-secondary-700/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-purple-800/30">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <Command size={14} className="text-purple-500" />
              <span>Press</span>
              <kbd className="px-2 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg text-[10px] font-mono border border-gray-700">
                ⌘
              </kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg text-[10px] font-mono border border-gray-700">
                K
              </kbd>
              <span>for palette</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fadeIn;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}

export default SideBar;