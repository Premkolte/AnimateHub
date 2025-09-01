import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Shuffle } from "lucide-react";

const fonts = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Comic Sans MS",
  "Impact",
  "Tahoma",
  "Lucida Console",
];

const getRandomFont = () => fonts[Math.floor(Math.random() * fonts.length)];

const FontPlayground = () => {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [copied, setCopied] = useState(false);

  const cssCode = `font-family: ${fontFamily};
font-size: ${fontSize}px;
font-weight: ${fontWeight};
letter-spacing: ${letterSpacing}px;
line-height: ${lineHeight};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col space-y-10 p-6">
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-10 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-md">
          Font Playground
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          🎨 Experiment with different fonts, sizes, weights & spacing in real-time.
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
          {/* Font Family */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-inner focus:ring-2 focus:ring-pink-400 transition"
            >
              {fonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Font Size ({fontSize}px)
            </label>
            <input
              type="range"
              min="12"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Font Weight ({fontWeight})
            </label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Letter Spacing ({letterSpacing}px)
            </label>
            <input
              type="range"
              min="-5"
              max="10"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Line Height ({lineHeight})
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full accent-green-500"
            />
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
                  : "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:shadow-lg"
              }`}
            >
              <Copy size={18} /> {copied ? "Copied!" : "Copy CSS"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFontFamily(getRandomFont())}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg"
            >
              <Shuffle size={18} /> Random Font
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
          <p
            style={{
              fontFamily,
              fontSize: `${fontSize}px`,
              fontWeight,
              letterSpacing: `${letterSpacing}px`,
              lineHeight,
            }}
            className="text-center text-gray-900 dark:text-gray-100 transition-all duration-300"
          >
            The quick brown fox jumps over the lazy dog.
          </p>

          <pre className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm shadow-inner overflow-x-auto border border-gray-200 dark:border-gray-700">
            {cssCode}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FontPlayground;
