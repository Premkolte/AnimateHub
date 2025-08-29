import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Copy } from "lucide-react";
import { Shuffle } from "lucide-react";
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const colorCircleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  };

  const pickerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Gradient type options with their configurations
  const gradientTypes = [
    { 
      value: "linear", 
      label: "Linear", 
      description: "Straight line transition"
    },
    { 
      value: "radial", 
      label: "Radial", 
      description: "Circular from center"
    },
    { 
      value: "conic", 
      label: "Conic", 
      description: "Rotational sweep"
    }
  ];

  // Sync colors and showPickers arrays when numColors changes
  useEffect(() => {
    // Add new colors if needed
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

  // Generate CSS gradient string based on type
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

  const gradientStyle = {
    background: getGradientCSS(),
    transition: "background 0.5s ease",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-pink-600 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Controls */}
        <motion.div className="flex flex-col gap-6 justify-center" variants={itemVariants}>
          <motion.h1 
            className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
            variants={itemVariants}
          >
            Gradient Playground
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            Click on a color circle to open the palette and pick your colors.
          </motion.p>

          {/* Gradient Type Selector */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Gradient Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {gradientTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => setGradientType(type.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                    gradientType === type.value
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 shadow-md"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-pink-400 hover:bg-pink-25 dark:hover:bg-pink-900/10"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="font-semibold">{type.label}</div>
                  <div className="text-xs mt-1 opacity-75">{type.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Number of colors selector */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Color
            </label>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setNumColors(Math.max(2, numColors - 1))}
                className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                -
              </motion.button>
              <motion.input
                type="number"
                className="w-16 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={numColors}
                min={2}
                onChange={(e) =>
                  setNumColors(Math.max(2, parseInt(e.target.value) || 2))
                }
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                onClick={() => setNumColors(numColors + 1)}
                className="px-4 py-1 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                +
              </motion.button>
            </div>
          </motion.div>

          {/* Color circles */}
          <motion.div className="flex gap-6 flex-wrap" variants={itemVariants}>
            <AnimatePresence>
              {colors.map((color, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-2 relative"
                  variants={colorCircleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <label className="text-gray-700 dark:text-gray-200 font-medium">
                    Color {index + 1}
                  </label>
                  <motion.div
                    onClick={(e) => togglePicker(index, e)}
                    className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    variants={colorCircleVariants}
                    whileHover="hover"
                    whileTap="tap"
                  ></motion.div>
                  <AnimatePresence>
                    {showPickers[index] && (
                      <motion.div
                        className="absolute bottom-full mb-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
                        variants={pickerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <HexColorPicker
                          color={color}
                          onChange={(newColor) =>
                            handleColorChange(index, newColor)
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Copy CSS */}
          <motion.button
            onClick={copyGradient}
            className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md
              ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
              }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {copied ? "Copied!" : "Copy CSS"}
            <Copy size={18} />
          </motion.button>

          {/* Random Gradient Button */}
          <motion.button
            onClick={() =>
              setColors(
                Array.from({ length: numColors }, () => getRandomColor())
              )
            }
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg
             bg-[linear-gradient(90deg,#ff0080,#ff8c00,#40e0d0,#8a2be2,#ff1493,#00ff7f)]
             bg-[length:200%_200%] animate-gradient-x
             transition-all duration-500"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Shuffle size={20} className="text-white" />
            Random Gradient
          </motion.button>
        </motion.div>

        {/* Preview */}
        <motion.div className="flex flex-col items-center gap-6" variants={itemVariants}>
          <motion.div
            className="w-full h-80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            style={gradientStyle}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
          ></motion.div>
          <motion.pre 
            className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-100 to-pink-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-mono overflow-x-auto text-sm shadow-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, ease: "easeOut", delay: 0.2 }
            }}
          >
            {`background: ${getGradientCSS()};`}
          </motion.pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ColorGradientPlayground;