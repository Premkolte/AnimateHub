import { useState } from "react";
import { ChevronDown } from "lucide-react";

function CustomDropdown({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false); // state to toggle dropdown visibility

  // Dropdown options with icons and labels
  const options = [
    { value: "points", label: "🔝 Sort by Points" },
    { value: "prs", label: "📦 Sort by PRs" },
    { value: "username", label: "👤 Sort by Username" },
  ];


  

  return (
    <div className="relative w-full md:w-56">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setOpen(!open)} // toggle dropdown open/close
        className="w-full flex justify-between items-center px-4 py-2 rounded-xl
                   bg-white/70 dark:bg-gray-800/50 backdrop-blur-md
                   border border-gray-200 dark:border-gray-700
                   shadow-md hover:shadow-lg transition-all duration-300
                   whitespace-nowrap"
      >





        {/* Selected option (always stays in one line) */}
        <span className="flex items-center gap-2 whitespace-nowrap">
          {options.find((o) => o.value === sortBy)?.label}
</span>





{/* Dropdown arrow with rotation animation */}
        <ChevronDown
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>




      {/* Dropdown Menu (only visible when open = true) */}
      {open && (
        <div className="absolute mt-2 w-full rounded-xl bg-white dark:bg-gray-900 
                        shadow-lg border border-gray-200 dark:border-gray-700 
                        overflow-hidden z-20"
        >
          {options.map((o) => (
            <div
              key={o.value}
              onClick={() => {
                setSortBy(o.value); // update selected sort option
                setOpen(false); // close dropdown after selection
              }}
              className="px-4 py-2 cursor-pointer transition-all duration-300
                         flex items-center gap-2 whitespace-nowrap
                         hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500
                         hover:text-white text-gray-700 dark:text-gray-200"
            >
              {o.label}
            </div>
          ))}
        </div>
      )}








    </div>
  );
}










export default CustomDropdown;
