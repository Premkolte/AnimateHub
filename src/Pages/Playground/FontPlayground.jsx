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

  const cssCode = `font-family: ${fontFamily};\nfont-size: ${fontSize}px;\nfont-weight: ${fontWeight};\nletter-spacing: ${letterSpacing}px;\nline-height: ${lineHeight};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-6 w-full max-w-6xl"
      >
        {/* Controls */}
        <div className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-2xl font-bold mb-4">Font Playground</h2>

          {/* Font Family */}
          <div>
            <label className="block text-sm mb-2">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700"
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
            <label className="block text-sm mb-2">Font Size ({fontSize}px)</label>
            <input
              type="range"
              min="12"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm mb-2">Font Weight ({fontWeight})</label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm mb-2">Letter Spacing ({letterSpacing}px)</label>
            <input
              type="range"
              min="-5"
              max="10"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-sm mb-2">Line Height ({lineHeight})</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Copy size={16} /> Copy CSS
            </button>
            <button
              onClick={() => setFontFamily(getRandomFont())}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Shuffle size={16} /> Random Font
            </button>
          </div>
        </div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <p
            style={{
              fontFamily,
              fontSize: `${fontSize}px`,
              fontWeight,
              letterSpacing: `${letterSpacing}px`,
              lineHeight,
            }}
            className="text-center"
          >
            The quick brown fox jumps over the lazy dog.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FontPlayground;
