import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Copy, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

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
  const [gradientType, setGradientType] = useState("linear");

  const gradientTypes = [
    { value: "linear", label: "Linear", description: "Straight line transition" },
    { value: "radial", label: "Radial", description: "Circular from center" },
    { value: "conic", label: "Conic", description: "Rotational sweep" },
  ];

  useEffect(() => {
    if (colors.length < numColors) {
      setColors((prev) => [
        ...prev,
        ...Array(numColors - prev.length)
          .fill(0)
          .map(() => getRandomColor()),
      ]);
      setShowPickers((prev) => [
        ...prev,
        ...Array(numColors - prev.length).fill(false),
      ]);
    }
    if (colors.length > numColors) {
      setColors((prev) => prev.slice(0, numColors));
      setShowPickers((prev) => prev.slice(0, numColors));
    }
  }, [numColors]);

  useEffect(() => {
    const closePickers = () => setShowPickers((prev) => prev.map(() => false));
    document.addEventListener("mousedown", closePickers);
    return () => document.removeEventListener("mousedown", closePickers);
  }, []);

  const handleColorChange = (i, newColor) => {
    setColors((prev) => {
      const copy = [...prev];
      copy[i] = newColor;
      return copy;
    });
  };

  const togglePicker = (i, e) => {
    e.stopPropagation();
    setShowPickers((prev) => prev.map((val, idx) => (idx === i ? !val : false)));
  };

  const getGradientCSS = () => {
    const colorString = colors.join(", ");
    switch (gradientType) {
      case "linear":
        return `linear-gradient(135deg, ${colorString})`;
      case "radial":
        return `radial-gradient(circle at center, ${colorString})`;
      case "conic":
        return `conic-gradient(from 0deg at center, ${colorString})`;
      default:
        return `linear-gradient(135deg, ${colorString})`;
    }
  };

  const copyGradient = () => {
    navigator.clipboard.writeText(`background: ${getGradientCSS()};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 p-10 rounded-3xl 
        bg-white/80 dark:bg-gray-800/80 border border-pink-500/30 
        shadow-[0_8px_40px_rgba(0,0,0,0.15)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Panel */}
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-extrabold text-pink-600 dark:text-pink-400 tracking-tight">
            Gradient Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            🎨 Design stunning gradients with interactive controls & real-time preview.
          </p>

          {/* Gradient Types */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Gradient Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {gradientTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => setGradientType(type.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-center 
                    ${
                      gradientType === type.value
                        ? "border-pink-500 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 shadow-xl"
                        : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-pink-400 hover:shadow-md"
                    }`}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-semibold">{type.label}</div>
                  <div className="text-xs opacity-70">{type.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Controls */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Colors
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNumColors(Math.max(2, numColors - 1))}
                className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600"
              >
                -
              </button>
              <input
                type="number"
                className="w-16 text-center rounded-lg border bg-white dark:bg-gray-700 dark:text-white shadow-inner"
                value={numColors}
                min={2}
                onChange={(e) =>
                  setNumColors(Math.max(2, parseInt(e.target.value) || 2))
                }
              />
              <button
                onClick={() => setNumColors(numColors + 1)}
                className="px-4 py-1 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Color Circles */}
          <div className="flex gap-6 flex-wrap">
            <AnimatePresence>
              {colors.map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative">
                  <label className="text-gray-700 dark:text-gray-200 font-medium">
                    Color {i + 1}
                  </label>
                  <motion.div
                    onClick={(e) => togglePicker(i, e)}
                    className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(255,20,147,0.7)" }}
                    whileTap={{ scale: 0.9 }}
                  ></motion.div>
                  <AnimatePresence>
                    {showPickers[i] && (
                      <motion.div
                        className="absolute bottom-full mb-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <HexColorPicker
                          color={color}
                          onChange={(newColor) => handleColorChange(i, newColor)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={copyGradient}
              className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all 
                ${
                  copied
                    ? "bg-green-500 animate-pulse"
                    : "bg-gradient-to-r from-pink-500 to-orange-400 hover:shadow-xl"
                }`}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? "Copied!" : "Copy CSS"}
              <Copy size={18} />
            </motion.button>

            <motion.button
              onClick={() =>
                setColors(Array.from({ length: numColors }, () => getRandomColor()))
              }
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg 
              bg-[linear-gradient(270deg,#ff0080,#ff8c00,#40e0d0,#8a2be2,#ff1493,#00ff7f)] 
              bg-[length:300%_300%] animate-gradient-x"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shuffle size={20} />
              Random Gradient
            </motion.button>
          </div>
        </div>

        {/* Right Preview */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="w-full h-80 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            style={{ background: getGradientCSS(), transition: "background 0.5s ease" }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          ></motion.div>
          <pre className="w-full p-4 rounded-xl bg-gradient-to-r from-gray-100 to-pink-50 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-mono overflow-x-auto text-sm shadow-inner border border-pink-200 dark:border-pink-800">
            {`background: ${getGradientCSS()};`}
          </pre>
        </div>
      </motion.div>
    </div>
  );
};

export default ColorGradientPlayground;
