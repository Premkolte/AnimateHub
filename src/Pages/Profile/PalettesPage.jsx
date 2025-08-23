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
