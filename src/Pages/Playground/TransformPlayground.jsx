import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

const TransformPlayground = () => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [copied, setCopied] = useState(false);

  const transformStyle = {
    transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) rotate(${rotation}deg) skew(${skewX}deg, ${skewY}deg)`,
    transition: 'transform 0.3s ease',
  };

  const cssCode = `transform: translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) rotate(${rotation}deg) skew(${skewX}deg, ${skewY}deg);
transition: transform 0.3s ease;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const resetTransform = () => {
    setTranslateX(0);
    setTranslateY(0);
    setScaleX(1);
    setScaleY(1);
    setRotation(0);
    setSkewX(0);
    setSkewY(0);
  };

  return (
    <div className="flex flex-col space-y-10 p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-500">
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-10 px-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 drop-shadow-md">
          Transform Playground
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          🔄 Experiment with CSS transforms - translate, scale, rotate, and skew elements in real-time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto"
      >
        {/* Controls Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700">
          
          {/* Translate Controls */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Translate
            </label>
            
            {/* X Translation */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">X Position ({translateX}px)</span>
              <input
                type="range"
                min="-200"
                max="200"
                value={translateX}
                onChange={(e) => setTranslateX(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Y Translation */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Y Position ({translateY}px)</span>
              <input
                type="range"
                min="-200"
                max="200"
                value={translateY}
                onChange={(e) => setTranslateY(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
          </div>

          {/* Scale Controls */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Scale
            </label>

            {/* X Scale */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">X Scale ({scaleX})</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleX}
                onChange={(e) => setScaleX(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            {/* Y Scale */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Y Scale ({scaleY})</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleY}
                onChange={(e) => setScaleY(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          {/* Rotation Control */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Rotation ({rotation}°)
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Skew Controls */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Skew
            </label>

            {/* X Skew */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">X Skew ({skewX}°)</span>
              <input
                type="range"
                min="-45"
                max="45"
                value={skewX}
                onChange={(e) => setSkewX(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>

            {/* Y Skew */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Y Skew ({skewY}°)</span>
              <input
                type="range"
                min="-45"
                max="45"
                value={skewY}
                onChange={(e) => setSkewY(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all shadow-md ${
                copied
                  ? "bg-green-500 text-white animate-pulse"
                  : "bg-gradient-to-r from-orange-500 to-red-400 text-white hover:shadow-lg"
              }`}
            >
              <Copy size={18} /> {copied ? "Copied!" : "Copy CSS"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTransform}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg"
            >
              <RotateCcw size={18} /> Reset
            </motion.button>
          </div>
        </div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center justify-center border border-gray-200 dark:border-gray-700"
        >
          {/* Preview Container */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 w-full h-80 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Transform Element */}
            <div
              className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold relative z-10 transition-all duration-300"
              style={transformStyle}
            >
              CSS
            </div>
          </div>

          {/* CSS Code Display */}
          <pre className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm shadow-inner overflow-x-auto border border-gray-200 dark:border-gray-700">
            {cssCode}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TransformPlayground;