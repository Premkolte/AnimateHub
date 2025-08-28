import React, { useState, useEffect } from "react";

const SVGPlayground = () => {
  // -----------------------------
  // State variables
  // -----------------------------
  const [strokeColor, setStrokeColor] = useState("#ff0000"); // Color of SVG stroke
  const [fillColor, setFillColor] = useState("transparent"); // Fill color of SVG path
  const [duration, setDuration] = useState(2); // Animation duration in seconds
  const [key, setKey] = useState(0); // Key to force SVG re-render for restart animation
  const [strokeWidth, setStrokeWidth] = useState(4); // Stroke width
  const [rotateAngle, setRotateAngle] = useState(0); // Rotation angle of SVG path
  const [opacity, setOpacity] = useState(1); // Opacity of SVG path
  const [scale, setScale] = useState(1); // Scale of SVG path
  const [dashArray, setDashArray] = useState(400); // Stroke dasharray for drawing effect
  const [svgCode, setSvgCode] = useState(""); // Stores the generated SVG code

  // -----------------------------
  // Restart Animation
  // -----------------------------
  const restartAnimation = () => setKey((prev) => prev + 1); // Increment key to re-render SVG

  // -----------------------------
  // Auto-generate SVG code whenever a property changes
  // -----------------------------
  useEffect(() => {
    const code = `<svg width="300" height="200" viewBox="0 0 300 200">
  <path d="M50 150 Q150 50 250 150" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" stroke-dashoffset="${dashArray}" transform="rotate(${rotateAngle} 150 100) scale(${scale})" opacity="${opacity}" />
</svg>`;
    setSvgCode(code);
  }, [
    strokeColor,
    fillColor,
    strokeWidth,
    rotateAngle,
    opacity,
    scale,
    dashArray,
  ]);

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* -----------------------------
          Main Heading
      ----------------------------- */}
      <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100 tracking-tight leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-700 bg-clip-text text-transparent">
        SVG Animation Playground
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* -----------------------------
            Left Side - Controls Panel
        ----------------------------- */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl [box-shadow:0_0_5px_#be185d,0_0_5px_#be185d,0_0_10px_#be185d]">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-gray-200">
            Controls
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Stroke Color */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Stroke Color
              </span>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-full h-10 rounded border border-gray-300 dark:border-gray-600"
              />
            </label>

            {/* Fill Color */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Fill Color
              </span>
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="w-full h-10 rounded border border-gray-300 dark:border-gray-600"
              />
            </label>

            {/* Stroke Width */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Stroke Width
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {strokeWidth}px
              </span>
            </label>

            {/* Rotate Angle */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Rotate Angle
              </span>
              <input
                type="range"
                min="0"
                max="360"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {rotateAngle}°
              </span>
            </label>

            {/* Opacity */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Opacity
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {opacity}
              </span>
            </label>

            {/* Scale */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Scale
              </span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {scale}x
              </span>
            </label>

            {/* Stroke Dasharray */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Stroke Dasharray
              </span>
              <input
                type="range"
                min="50"
                max="800"
                value={dashArray}
                onChange={(e) => setDashArray(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {dashArray}
              </span>
            </label>

            {/* Duration */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">
                Duration (s)
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {duration} sec
              </span>
            </label>

            {/* Restart Animation Button */}
            <button
              onClick={restartAnimation}
              className="mt-2 p-3 text-white font-medium rounded-lg transition 
             bg-gradient-to-r from-red-500 via-blue-500 to-purple-600 hover:from-pink-500 
             hover:via-purple-500 hover:to-indigo-500"
            >
              Restart Animation
            </button>
          </div>
        </div>

        {/* -----------------------------
            Right Side - Live Preview
        ----------------------------- */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Preview Card */}
          <div className="border rounded-2xl bg-white dark:bg-gray-900 p-6 flex justify-center items-center shadow-lg h-[300px] md:h-[400px] [box-shadow:0_0_5px_#be185d,0_0_5px_#be185d,0_0_10px_#be185d]">
            <svg key={key} width="300" height="200" viewBox="0 0 300 200">
              <path
                d="M50 150 Q150 50 250 150"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={dashArray}
                transform={`rotate(${rotateAngle} 150 100) scale(${scale})`}
                style={{
                  animation: `draw ${duration}s linear forwards`,
                  opacity: opacity,
                }}
              />
              {/* Animation Keyframes */}
              <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
            </svg>
          </div>

          {/* SVG Code Textarea */}
          {svgCode && (
            <textarea
              readOnly
              value={svgCode}
              className="w-full h-48 p-4 border rounded-2xl bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-100"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SVGPlayground;
