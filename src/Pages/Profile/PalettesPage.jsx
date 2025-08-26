import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

// 🎨 List of all color palettes with names & colors
const palettes = [
  { name: "Sunset Glow", colors: ["#ff9a9e", "#fad0c4", "#fad390", "#f6e58d"] },
  {
    name: "Ocean Breeze",
    colors: ["#43cea2", "#185a9d", "#00c6ff", "#0072ff"],
  },
  {
    name: "Purple Dream",
    colors: ["#a18cd1", "#fbc2eb", "#8e2de2", "#4a00e0"],
  },
  { name: "Forest Mist", colors: ["#56ab2f", "#a8e063", "#2ecc71", "#27ae60"] },
  { name: "Candy Pop", colors: ["#ff6f61", "#ffb347", "#ffcc33", "#ff6699"] },
  {
    name: "Aurora Lights",
    colors: ["#00c3ff", "#ffff1c", "#ff61a6", "#9b72aa"],
  },
  { name: "Fire & Ice", colors: ["#f12711", "#f5af19", "#2193b0", "#6dd5ed"] },
  {
    name: "Berry Smoothie",
    colors: ["#d53369", "#daae51", "#a40606", "#d98324"],
  },
  { name: "Coral Reef", colors: ["#ff9966", "#ff5e62", "#00f2fe", "#4facfe"] },
  { name: "Golden Hour", colors: ["#ff9a00", "#ff6a00", "#ff3c00", "#ffce00"] },
  { name: "Galaxy Dust", colors: ["#0f2027", "#203a43", "#2c5364", "#6a11cb"] },
  { name: "Minty Fresh", colors: ["#76b852", "#8DC26F", "#00c9a7", "#92fe9d"] },
  { name: "Rose Petals", colors: ["#ffdde1", "#ee9ca7", "#ff758c", "#ff7eb3"] },
  {
    name: "Electric Vibe",
    colors: ["#fc00ff", "#00dbde", "#ff0080", "#7928ca"],
  },
  { name: "Deep Space", colors: ["#000428", "#004e92", "#0f0c29", "#302b63"] },
  { name: "Lava Flow", colors: ["#ff512f", "#dd2476", "#ff6a00", "#ff0000"] },
  {
    name: "Cotton Candy",
    colors: ["#ffb6c1", "#ff69b4", "#add8e6", "#87cefa"],
  },
  { name: "Neon Nights", colors: ["#00f260", "#0575e6", "#f00000", "#ff0080"] },
  {
    name: "Autumn Leaves",
    colors: ["#d38312", "#a83279", "#ff7e5f", "#feb47b"],
  },
  {
    name: "Crystal Waters",
    colors: ["#89f7fe", "#66a6ff", "#38ef7d", "#11998e"],
  },
  {
    name: "Midnight Purple",
    colors: ["#41295a", "#2F0743", "#662D8C", "#ED1E79"],
  },
  {
    name: "Frozen Dreams",
    colors: ["#e0c3fc", "#8ec5fc", "#a1c4fd", "#c2e9fb"],
  },
  {
    name: "Sunflower Field",
    colors: ["#f7ff00", "#db36a4", "#fceabb", "#f8b500"],
  },
  {
    name: "Tropical Punch",
    colors: ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"],
  },
  {
    name: "Shadow Realm",
    colors: ["#232526", "#414345", "#434343", "#000000"],
  },

  {
    name: "Peach Sorbet",
    colors: ["#FFDAB9", "#FFB6C1", "#FF7F50", "#FFA07A"],
  },
  {
    name: "Emerald Isle",
    colors: ["#004d40", "#00796b", "#26a69a", "#80cbc4"],
  },
  {
    name: "Cherry Blossom",
    colors: ["#ffafbd", "#ffc3a0", "#ffdde1", "#ee9ca7"],
  },
  {
    name: "Steel Blue",
    colors: ["#1c92d2", "#f2fcfe", "#000046", "#1CB5E0"],
  },
  {
    name: "Royal Gold",
    colors: ["#f6d365", "#fda085", "#ffd700", "#ffb347"],
  },

  {
    name: "Coffee Mocha",
    colors: ["#4e342e", "#6f4e37", "#a47148", "#d7ccc8"],
  },
  {
    name: "Neon Jungle",
    colors: ["#00ff87", "#60efff", "#ff6ec4", "#7873f5"],
  },
  {
    name: "Frozen Lake",
    colors: ["#83a4d4", "#b6fbff", "#2193b0", "#6dd5ed"],
  },
  {
    name: "Blood Moon",
    colors: ["#870000", "#190a05", "#5a0000", "#ff0000"],
  },

  {
    name: "Ivory Pearl",
    colors: ["#fdfcfb", "#e2d1c3", "#fafafa", "#d6ae7b"],
  },
  {
    name: "Cyberpunk",
    colors: ["#ff0080", "#7928ca", "#2af598", "#00f2fe"],
  },
  {
    name: "Warm Sand",
    colors: ["#fceabb", "#f8b500", "#eacda3", "#d6ae7b"],
  },

  {
    name: "Tropical Sunset",
    colors: ["#f83600", "#f9d423", "#fc4a1a", "#f7b733"],
  },
  {
    name: "Ice Cream Pop",
    colors: ["#f093fb", "#f5576c", "#fbc2eb", "#a6c1ee"],
  },
  {
    name: "Cobalt Storm",
    colors: ["#00416a", "#e4e5e6", "#2c3e50", "#3498db"],
  },
  {
    name: "Dark Velvet",
    colors: ["#000000", "#434343", "#1f1c2c", "#928dab"],
  },
  {
    name: "Desert Heat",
    colors: ["#c79081", "#dfa579", "#e58c8a", "#fbc687"],
  },
  {
    name: "Pink Lemonade",
    colors: ["#ff9a9e", "#fecfef", "#f6d365", "#fda085"],
  },
  {
    name: "Galaxy Core",
    colors: ["#0f2027", "#203a43", "#2c5364", "#6441a5"],
  },
  {
    name: "Golden Dust",
    colors: ["#d4af37", "#ffd700", "#f6d365", "#fda085"],
  },
  {
    name: "Blue Horizon",
    colors: ["#36d1dc", "#5b86e5", "#1e3c72", "#2a5298"],
  },
  {
    name: "Rose Quartz",
    colors: ["#e55d87", "#5fc3e4", "#fbc2eb", "#a6c1ee"],
  },
  {
    name: "Fire Ember",
    colors: ["#f00000", "#ff8008", "#ff512f", "#dd2476"],
  },
  {
    name: "Candyland",
    colors: ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a1c4fd"],
  },
  {
    name: "Twilight Sky",
    colors: ["#0f0c29", "#302b63", "#24243e", "#6a11cb"],
  },
  {
    name: "Green Meadow",
    colors: ["#11998e", "#38ef7d", "#00c9a7", "#92fe9d"],
  },
  {
    name: "Citrus Punch",
    colors: ["#f9d423", "#ff4e50", "#ff6a00", "#ee0979"],
  },
  {
    name: "Silver Lining",
    colors: ["#bdc3c7", "#2c3e50", "#e0eafc", "#cfdef3"],
  },
  {
    name: "Royal Indigo",
    colors: ["#4a00e0", "#8e2de2", "#3a1c71", "#d76d77"],
  },
  {
    name: "Deep Ocean",
    colors: ["#2c3e50", "#3498db", "#34495e", "#2980b9"],
  },
  {
    name: "Amber Glow",
    colors: ["#ffb347", "#ffcc33", "#ff6a00", "#f5af19"],
  },
  {
    name: "Rainbow Dash",
    colors: ["#ff4e50", "#f9d423", "#24c6dc", "#5433ff"],
  },
  {
    name: "Smoky Ash",
    colors: ["#606c88", "#3f4c6b", "#434343", "#232526"],
  },
  {
    name: "Pink Bliss",
    colors: ["#ff9a9e", "#fecfef", "#fbc2eb", "#a6c1ee"],
  },
  {
    name: "Royal Rose",
    colors: ["#ff758c", "#ff7eb3", "#fcb69f", "#ffdde1"],
  },
  {
    name: "Frozen Mist",
    colors: ["#83a4d4", "#b6fbff", "#cfd9df", "#e2ebf0"],
  },
  {
    name: "Mango Tango",
    colors: ["#ff9a00", "#ff6a00", "#ff3c00", "#ffce00"],
  },
  {
    name: "Cocoa Bean",
    colors: ["#3e2723", "#5d4037", "#795548", "#a1887f"],
  },
  {
    name: "Citrus Zest",
    colors: ["#f7971e", "#ffd200", "#f9d423", "#ff8008"],
  },
  {
    name: "Violet Storm",
    colors: ["#20002c", "#cbb4d4", "#662d8c", "#ed1e79"],
  },
  {
    name: "Midnight Blue",
    colors: ["#232526", "#414345", "#000046", "#1CB5E0"],
  },
  {
    name: "Neon Glow",
    colors: ["#00f2fe", "#4facfe", "#ff0080", "#f80759"],
  },
  {
    name: "Pastel Dreams",
    colors: ["#a1c4fd", "#c2e9fb", "#d4fc79", "#96e6a1"],
  },
  {
    name: "Wildfire",
    colors: ["#ff416c", "#ff4b2b", "#ff6a00", "#ee0979"],
  },
  {
    name: "Aqua Marine",
    colors: ["#1a2980", "#26d0ce", "#13547a", "#80d0c7"],
  },
  {
    name: "Royal Marble",
    colors: ["#f5f7fa", "#c3cfe2", "#bdc3c7", "#2c3e50"],
  },
  {
    name: "Tangerine",
    colors: ["#f12711", "#f5af19", "#ff6a00", "#ff9a00"],
  },
  {
    name: "Mystic Teal",
    colors: ["#136a8a", "#267871", "#00bf8f", "#001510"],
  },
  {
    name: "Amber Rose",
    colors: ["#f7971e", "#ffd200", "#ff758c", "#ff7eb3"],
  },
  {
    name: "Sakura Bloom",
    colors: ["#ffb7c5", "#ffdde1", "#ffc1cc", "#ff69b4"],
  },
  {
    name: "Arctic Chill",
    colors: ["#00d2ff", "#3a7bd5", "#83a4d4", "#b6fbff"],
  },
  { name: "Molten Lava", colors: ["#ff0000", "#ff512f", "#f12711", "#a40606"] },
  {
    name: "Zen Garden",
    colors: ["#355C7D", "#6C5B7B", "#C06C84", "#F8B195"],
  },
  {
    name: "Lime Fizz",
    colors: ["#a8ff78", "#78ffd6", "#56ab2f", "#a8e063"],
  },
  {
    name: "Solar Eclipse",
    colors: ["#0f2027", "#2c5364", "#232526", "#000000"],
  },
  { name: "Berry Crush", colors: ["#8e2de2", "#ff0080", "#fc466b", "#3a1c71"] },
  {
    name: "Amber Sunset",
    colors: ["#ff7e5f", "#feb47b", "#f7971e", "#ffd200"],
  },
  {
    name: "Mystic Ocean",
    colors: ["#2E3192", "#1BFFFF", "#0F2027", "#2C5364"],
  },
  { name: "Dreamscape", colors: ["#00c6ff", "#0072ff", "#7f00ff", "#e100ff"] },
];

// 🔘 Reusable Button Component
const Button = ({ children, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }} // slightly grow on hover
    whileTap={{ scale: 0.95 }} // slightly shrink on click
    onClick={onClick}
    className={`px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                text-sm font-medium transition-all shadow-md ${className}`}
  >
    {children}
  </motion.button>
);

// 🎨 Main Page Component
export default function PalettesPage() {
  const [copied, setCopied] = useState(null);

  // 📌 Function to copy single color
  const copyColor = (color, idx) => {
    navigator.clipboard.writeText(color);
    setCopied(`${idx}-${color}`);
    setTimeout(() => setCopied(null), 1500);
  };

  // 📌 Function to copy full palette
  const copyFullPalette = (palette, idx) => {
    navigator.clipboard.writeText(palette.colors.join(", "));
    setCopied(`full-${idx}`);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      {/* 🎨 Fancy Heading */}
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
        🎨 Color Palettes
      </h1>

      {/* 🔲 Grid of Palettes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {palettes.map((palette, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="shadow-lg border border-pink-500 
           bg-white dark:bg-gray-900 p-6 flex flex-col items-center
           transition-all duration-300 
           hover:shadow-[0_0_25px_5px_rgba(236,72,153,0.6)]      
           rounded-2xl"
          >
            {/* 🏷️ Palette Name */}
            <h2 className="font-semibold text-lg mb-4 text-center">
              {palette.name}
            </h2>

            {/* 🎨 Individual Colors */}
            <div className="flex gap-3 mb-4 w-full">
              {palette.colors.map((color, cIdx) => (
                <div
                  key={cIdx}
                  className="relative flex-1 h-16 rounded-lg cursor-pointer overflow-hidden group"
                  onClick={() => copyColor(color, idx)}
                >
                  {/* Color Block */}
                  <div
                    className="h-full w-full transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                  {/* Copy Feedback */}
                  <div className="absolute bottom-1 left-1 text-xs text-white drop-shadow-sm">
                    {copied === `${idx}-${color}` ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      color
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 📌 Copy Full Palette Button */}
            <Button
              className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all shadow-md"
              onClick={() => copyFullPalette(palette, idx)}
            >
              {copied === `full-${idx}` ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied === `full-${idx}`
                ? "Copied Full Palette!"
                : "Copy Full Palette"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
