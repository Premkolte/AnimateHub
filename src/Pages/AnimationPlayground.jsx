import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AnimationPlayground() {
  const [settings, setSettings] = useState({
    duration: 1,
    delay: 0,
    ease: "easeInOut",
    repeat: 1,
    direction: "normal",
    scale: 1,
    rotate: 0,
    color: "#3b82f6", // blue-500
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const resetSettings = () =>
    setSettings({
      duration: 1,
      delay: 0,
      ease: "easeInOut",
      repeat: 1,
      direction: "normal",
      scale: 1,
      rotate: 0,
      color: "#3b82f6",
    });

  const codeSnippet = `
.motion-div {
  animation: customAnimation ${settings.duration}s ${settings.ease} ${settings.delay}s ${
    settings.repeat === "infinite" ? "infinite" : settings.repeat
  };
  transform: scale(${settings.scale}) rotate(${settings.rotate}deg);
  background-color: ${settings.color};
}
`;

  const downloadCSS = () => {
    const blob = new Blob([codeSnippet], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "animation.css";
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full py-16 px-4 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">🚀 Animation Playground</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            Fine-tune animations with easing, scale, rotation, and colors. Preview and export your code!
          </p>
        </section>

        {/* Controls + Preview */}
        <section className="grid md:grid-cols-2 gap-10">
          {/* Controls */}
          <div className="bg-primary-50 dark:bg-secondary-800 p-6 rounded-xl border border-primary-200 dark:border-secondary-700 shadow-sm space-y-4">
            <h2 className="text-2xl font-semibold mb-3">⚙️ Controls</h2>

            <label className="block">
              Duration (s)
              <input
                type="number"
                step="0.1"
                name="duration"
                value={settings.duration}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              />
            </label>

            <label className="block">
              Delay (s)
              <input
                type="number"
                step="0.1"
                name="delay"
                value={settings.delay}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              />
            </label>

            <label className="block">
              Easing
              <select
                name="ease"
                value={settings.ease}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              >
                <option value="easeInOut">easeInOut</option>
                <option value="easeIn">easeIn</option>
                <option value="easeOut">easeOut</option>
                <option value="linear">linear</option>
              </select>
            </label>

            <label className="block">
              Iterations
              <select
                name="repeat"
                value={settings.repeat}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="infinite">infinite</option>
              </select>
            </label>

            <label className="block">
              Direction
              <select
                name="direction"
                value={settings.direction}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              >
                <option value="normal">normal</option>
                <option value="reverse">reverse</option>
                <option value="alternate">alternate</option>
                <option value="alternate-reverse">alternate-reverse</option>
              </select>
            </label>

            <label className="block">
              Scale
              <input
                type="number"
                step="0.1"
                name="scale"
                value={settings.scale}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              />
            </label>

            <label className="block">
              Rotate (deg)
              <input
                type="number"
                name="rotate"
                value={settings.rotate}
                onChange={handleChange}
                className="w-full p-2 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              />
            </label>

            <label className="block">
              Color
              <input
                type="color"
                name="color"
                value={settings.color}
                onChange={handleChange}
                className="w-full h-10 p-1 rounded-md border mt-1 dark:bg-secondary-900 dark:border-secondary-600"
              />
            </label>

            <button
              onClick={resetSettings}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Reset
            </button>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center justify-center bg-primary-50 dark:bg-secondary-800 p-6 rounded-xl border border-primary-200 dark:border-secondary-700 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">👀 Live Preview</h2>
            <motion.div
              key={JSON.stringify(settings)} // re-trigger animation when settings change
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, scale: parseFloat(settings.scale), rotate: parseFloat(settings.rotate) }}
              transition={{
                duration: parseFloat(settings.duration),
                delay: parseFloat(settings.delay),
                ease: settings.ease,
                repeat: settings.repeat === "infinite" ? Infinity : parseInt(settings.repeat),
                repeatType: settings.direction,
              }}
              style={{ backgroundColor: settings.color }}
              className="w-32 h-32 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
            >
              Animate
            </motion.div>
          </div>
        </section>

        {/* Code Output */}
        <section className="bg-secondary-900 text-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">📄 Generated CSS</h2>
          <pre className="bg-black/40 p-4 rounded-md text-sm whitespace-pre-wrap">
            {codeSnippet}
          </pre>
          <div className="flex gap-4">
            <button
              onClick={() => navigator.clipboard.writeText(codeSnippet)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Copy Code
            </button>
            <button
              onClick={downloadCSS}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Download CSS
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
