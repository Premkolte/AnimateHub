import { useState } from "react";

function ExpandingSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className={`transition-all duration-300 border border-gray-300 rounded-md p-2 ${
          isExpanded ? "w-64" : "w-32"
        }`}
        placeholder="Search..."
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />
    </div>
  );
}

export default ExpandingSearchBar;
