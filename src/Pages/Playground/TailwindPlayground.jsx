import React, { useState } from "react";
import { Copy } from "lucide-react";

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
        <div className={`transition-all duration-500 ${classes}`}>
          <h2 className="text-lg font-semibold">Preview Card</h2>
          <p>This is a live preview of the Tailwind classes you typed.</p>
          <button className="mt-3 px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-blue-50 transition">
            Action
          </button>
        </div>
      );
    } else if (component === "button") {
      return (
        <button className={`transition-all duration-500 ${classes}`}>
          Click Me
        </button>
      );
    } else if (component === "form") {
      return (
        <form
          className={`transition-all duration-500 ${classes} flex flex-col gap-3`}
        >
          <input
            type="text"
            placeholder="Enter text"
            className="p-2 border rounded"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Main Heading */}

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        {/* LEFT: Preview */}
        <div className="flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 relative w-full h-full">
          {/* Header with Controls */}
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              🔍 Live Preview
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Copy Code
              </button>
              <button className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                Reset
              </button>
            </div>
          </div>

          {/* Subtext */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
            Experiment with Tailwind classes & see instant results below.
          </p>

          {/* Preview Area */}
          <div className="flex-1 w-full flex items-center justify-center bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-inner">
            {renderPreview() || (
              <p className="text-gray-400 dark:text-gray-500 italic text-center">
                ✨ Start typing classes to preview your component
              </p>
            )}
          </div>

          {/* Footer Helper */}
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            💡 Tip: Try adding{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
              hover:
            </code>{" "}
            or{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
              shadow-lg
            </code>
          </p>
        </div>

        {/* RIGHT: Controls */}
        <div className="flex flex-col space-y-6">
          {/* Heading */}
          <div className="text-center md:text-left">
            <h1
              className="text-4xl font-extrabold text-center mb-10 
  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
  bg-clip-text text-transparent 
  drop-shadow-lg tracking-tight"
            >
              ✨ Tailwind Playground ✨
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
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
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                {copied ? "✅" : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                setClasses("bg-green-500 text-white p-4 rounded-xl shadow-lg")
              }
              className="px-3 py-2 bg-green-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Green
            </button>
            <button
              onClick={() =>
                setClasses("bg-red-500 text-white p-4 rounded-xl shadow-lg")
              }
              className="px-3 py-2 bg-red-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Red
            </button>
            <button
              onClick={() =>
                setClasses("bg-yellow-400 text-black p-4 rounded-xl shadow-lg")
              }
              className="px-3 py-2 bg-yellow-400 text-black rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Yellow
            </button>
            <button
              onClick={() =>
                setClasses(
                  "bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg"
                )
              }
              className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Gradient
            </button>
            <button
              onClick={resetClasses}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Reset
            </button>
          </div>

          {/* Code Preview */}
          <div className="w-full relative">
            <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg shadow-inner overflow-x-auto">
              <pre>{generateCode()}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindPlayground;
