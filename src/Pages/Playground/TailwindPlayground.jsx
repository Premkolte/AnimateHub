import React, { useState } from "react";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

const TailwindPlayground = () => {
  const [classes, setClasses] = useState(
    "bg-blue-500 text-white p-6 rounded-xl shadow-lg"
  );
  const [component, setComponent] = useState("card");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetClasses = () => {
    setClasses("bg-blue-500 text-white p-6 rounded-xl shadow-lg");
  };

  // Generate JSX code preview
  const generateCode = () => {
    if (component === "card") {
      return `<div className="${classes}">
  <h2 className="text-lg font-semibold">Preview Card</h2>
  <p>This is a live preview of the Tailwind classes you typed.</p>
  <button className="mt-3 px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-blue-50 transition">
    Action
  </button>
</div>`;
    } else if (component === "button") {
      return `<button className="${classes}">Click Me</button>`;
    } else if (component === "form") {
      return `<form className="${classes} flex flex-col gap-3">
  <input type="text" placeholder="Enter text" className="p-2 border rounded" />
  <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
</form>`;
    }
  };

  // Render preview based on component
  const renderPreview = () => {
    if (component === "card") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`transition-all duration-500 ${classes} hover:scale-[1.03] hover:shadow-2xl`}
        >
          <h2 className="text-lg font-semibold">Preview Card</h2>
          <p>This is a live preview of the Tailwind classes you typed.</p>
          <button className="mt-3 px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-blue-50 transition">
            Action
          </button>
        </motion.div>
      );
    } else if (component === "button") {
      return (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`transition-all duration-500 ${classes} hover:shadow-xl`}
        >
          Click Me
        </motion.button>
      );
    } else if (component === "form") {
      return (
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`transition-all duration-500 ${classes} flex flex-col gap-3 hover:shadow-xl hover:scale-[1.01]`}
        >
          <input
            type="text"
            placeholder="Enter text"
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Submit
          </button>
        </motion.form>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/40 dark:bg-gray-900/50 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-gray-300 dark:border-gray-700 p-8">
        {/* LEFT: Preview */}
        <div className="flex flex-col items-center justify-start bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 relative w-full h-full shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          {/* Header */}
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              🔍 Live Preview
            </h2>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 hover:shadow-[0_0_10px_rgba(139,92,246,0.8)] shadow-md transition"
              >
                {copied ? "✅ Copied" : "Copy"}
              </button>
              <button
                onClick={resetClasses}
                className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:scale-105 hover:shadow-[0_0_10px_rgba(0,0,0,0.4)] transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Subtext */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
            Experiment with Tailwind classes & see instant results below.
          </p>

          {/* Preview Area */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-1 w-full flex items-center justify-center bg-gradient-to-br from-white/90 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 shadow-inner hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition"
          >
            {renderPreview() || (
              <p className="text-gray-400 dark:text-gray-500 italic text-center">
                ✨ Start typing classes to preview your component
              </p>
            )}
          </motion.div>
        </div>

        {/* RIGHT: Controls */}
        <div className="flex flex-col space-y-6">
          {/* Heading */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-pulse">
              ✨ Tailwind Playground ✨
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Experiment, learn, and prototype with Tailwind CSS in real time.
            </p>
          </div>

          {/* Component Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 dark:text-gray-200 font-semibold">
              Choose Component:
            </label>
            <select
              value={component}
              onChange={(e) => setComponent(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
            >
              <option value="card">Card</option>
              <option value="button">Button</option>
              <option value="form">Form</option>
            </select>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 dark:text-gray-200 font-semibold">
              Tailwind Classes:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                placeholder="e.g. bg-red-500 p-4 rounded-lg"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/90 dark:bg-gray-800/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
              <motion.button
                onClick={copyToClipboard}
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.9, rotate: -3 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition"
              >
                {copied ? "✅" : <Copy size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Green",
                class:
                  "bg-green-500 text-white p-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]",
                btnClass:
                  "px-4 py-2 rounded-xl font-semibold text-white transition bg-green-500 hover:bg-green-600",
              },
              {
                label: "Red",
                class:
                  "bg-red-500 text-white p-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]",
                btnClass:
                  "px-4 py-2 rounded-xl font-semibold text-white transition bg-red-500 hover:bg-red-600",
              },
              {
                label: "Yellow",
                class:
                  "bg-yellow-400 text-black p-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(250,204,21,0.8)]",
                btnClass:
                  "px-4 py-2 rounded-xl font-semibold transition bg-yellow-400 text-black hover:bg-yellow-500",
              },
              {
                label: "Gradient",
                class:
                  "bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]",
                btnClass:
                  "px-4 py-2 rounded-xl font-semibold text-white transition bg-gradient-to-r from-purple-500 to-pink-500",
              },
            ].map((preset) => (
              <motion.button
                key={preset.label}
                onClick={() => setClasses(preset.class)}
                whileHover={{ scale: 1.15, rotate: 2 }}
                whileTap={{ scale: 0.9, rotate: -2 }}
                className={preset.btnClass}
              >
                {preset.label}
              </motion.button>
            ))}

            <motion.button
              onClick={resetClasses}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-800 text-white rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition"
            >
              Reset
            </motion.button>
          </div>

          {/* Code Preview */}
          <div className="w-full relative">
            <div className="bg-gray-900 text-green-400 font-mono text-sm p-5 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] overflow-x-auto">
              <pre className="leading-relaxed">
                {generateCode()
                  .split("\n")
                  .map((line, idx) => (
                    <div key={idx}>
                      <span className="text-gray-500 pr-4 select-none">
                        {idx + 1}
                      </span>
                      {line}
                    </div>
                  ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindPlayground;
