import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Copy } from "lucide-react";

const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

const ColorGradientPlayground = () => {
  const [numColors, setNumColors] = useState(4);
  const [colors, setColors] = useState([
    "#c8264c",
    "#140416",
    "#1c92d2",
    "#f2fcfe",
  ]);
  const [copied, setCopied] = useState(false);
  const [showPickers, setShowPickers] = useState([false, false, false, false]);

  // Sync colors and showPickers arrays when numColors changes
  useEffect(() => {
    // Add new colors if needed
    if (colors.length < numColors) {
      setColors((prev) => [
        ...prev,
        ...Array(numColors - prev.length).fill(0).map(() => getRandomColor()),
      ]);
      setShowPickers((prev) => [...prev, ...Array(numColors - prev.length).fill(false)]);
    }

    // Remove extra colors if decreased
    if (colors.length > numColors) {
      setColors((prev) => prev.slice(0, numColors));
      setShowPickers((prev) => prev.slice(0, numColors));
    }
  }, [numColors]);

  // Handle clicking outside to close all pickers
  useEffect(() => {
    const handleClickOutside = (e) => {
      setShowPickers((prev) => prev.map(() => false));
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleColorChange = (index, newColor) => {
    setColors((prev) => {
      const copy = [...prev];
      copy[index] = newColor;
      return copy;
    });
  };

  const togglePicker = (index, e) => {
    e.stopPropagation(); // Prevent outside click from closing immediately
    setShowPickers((prev) =>
      prev.map((val, i) => (i === index ? !val : false))
    );
  };

  const copyGradient = () => {
    navigator.clipboard.writeText(`background: linear-gradient(135deg, ${colors.join(", ")});`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors.join(", ")})`,
    transition: "background 0.5s ease",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-pink-600 shadow-lg">
        {/* Controls */}
        <div className="flex flex-col gap-6 justify-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gradient Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Click on a color circle to open the palette and pick your colors.
          </p>

          {/* Number of colors selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNumColors(Math.max(2, numColors - 1))}
              className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
            >
              -
            </button>
            <input
              type="number"
              className="w-16 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={numColors}
              min={2}
              onChange={(e) => setNumColors(Math.max(2, parseInt(e.target.value) || 2))}
            />
            <button
              onClick={() => setNumColors(numColors + 1)}
              className="px-4 py-1 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
            >
              +
            </button>
          </div>

          {/* Color circles */}
          <div className="flex gap-6 flex-wrap">
            {colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center gap-2 relative">
                <label className="text-gray-700 dark:text-gray-200 font-medium">
                  Color {index + 1}
                </label>
                <div
                  onClick={(e) => togglePicker(index, e)}
                  className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105"
                  style={{ backgroundColor: color }}
                ></div>
                {showPickers[index] && (
                  <div className="absolute bottom-full mb-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
                    <HexColorPicker color={color} onChange={(newColor) => handleColorChange(index, newColor)} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Copy CSS */}
          <button
            onClick={copyGradient}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md
              ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 active:scale-95"
              }`}
          >
            {copied ? "Copied!" : "Copy CSS"}
            <Copy size={18} />
          </button>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-full h-64 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-500"
            style={gradientStyle}
          ></div>
          <pre className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-100 to-pink-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-mono overflow-x-auto text-sm shadow-inner">
            {`background: linear-gradient(135deg, ${colors.join(", ")});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ColorGradientPlayground;
