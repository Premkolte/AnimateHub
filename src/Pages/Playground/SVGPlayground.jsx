import React, { useState, useEffect } from "react";

const SVGPlayground = () => {
  const [strokeColor, setStrokeColor] = useState("#ff0000");
  const [fillColor, setFillColor] = useState("transparent");
  const [duration, setDuration] = useState(2);
  const [key, setKey] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [dashArray, setDashArray] = useState(400);
  const [svgCode, setSvgCode] = useState("");

  const restartAnimation = () => setKey((prev) => prev + 1);

  useEffect(() => {
    const code = `<svg width="300" height="200" viewBox="0 0 300 200">
  <path d="M50 150 Q150 50 250 150" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" stroke-dashoffset="${dashArray}" transform="rotate(${rotateAngle} 150 100) scale(${scale})" opacity="${opacity}" />
</svg>`;
    setSvgCode(code);
  }, [strokeColor, fillColor, strokeWidth, rotateAngle, opacity, scale, dashArray]);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <h1
        className="text-5xl font-extrabold text-center mb-12 tracking-tight leading-tight 
        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent 
        drop-shadow-[0_4px_12px_rgba(168,85,247,0.6)]"
      >
        SVG Animation Playground
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Controls */}
        <div
          className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl 
          shadow-[0_8px_25px_rgba(236,72,153,0.25),0_12px_40px_rgba(79,70,229,0.2)] 
          hover:shadow-[0_12px_30px_rgba(236,72,153,0.35),0_16px_50px_rgba(79,70,229,0.3)] 
          hover:scale-[1.02] transition-all duration-300 border border-gray-200/40 dark:border-gray-700/40"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">🎛 Controls</h2>
          <div className="grid grid-cols-1 gap-5">
            {/* Stroke Color */}
            <label className="flex flex-col group">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Stroke Color</span>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer 
                transition-transform group-hover:scale-105"
              />
            </label>

            {/* Fill Color */}
            <label className="flex flex-col group">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Fill Color</span>
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer 
                transition-transform group-hover:scale-105"
              />
            </label>

            {/* Stroke Width */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Stroke Width</span>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="accent-pink-600"
              />
              <span className="text-sm text-gray-500">{strokeWidth}px</span>
            </label>

            {/* Rotate */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Rotate Angle</span>
              <input
                type="range"
                min="0"
                max="360"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(Number(e.target.value))}
                className="accent-indigo-600"
              />
              <span className="text-sm text-gray-500">{rotateAngle}°</span>
            </label>

            {/* Opacity */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Opacity</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="accent-purple-600"
              />
              <span className="text-sm text-gray-500">{opacity}</span>
            </label>

            {/* Scale */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Scale</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="accent-pink-600"
              />
              <span className="text-sm text-gray-500">{scale}x</span>
            </label>

            {/* Stroke Dasharray */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Stroke Dasharray</span>
              <input
                type="range"
                min="50"
                max="800"
                value={dashArray}
                onChange={(e) => setDashArray(Number(e.target.value))}
                className="accent-indigo-600"
              />
              <span className="text-sm text-gray-500">{dashArray}</span>
            </label>

            {/* Duration */}
            <label className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-300 mb-1">Duration (s)</span>
              <input
                type="range"
                min="1"
                max="10"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="accent-purple-600"
              />
              <span className="text-sm text-gray-500">{duration} sec</span>
            </label>

            {/* Restart */}
            <button
              onClick={restartAnimation}
              className="mt-4 p-3 text-white font-semibold rounded-xl 
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              shadow-[0_4px_12px_rgba(236,72,153,0.4),0_6px_20px_rgba(79,70,229,0.35)] 
              hover:shadow-[0_6px_18px_rgba(236,72,153,0.5),0_10px_30px_rgba(79,70,229,0.45)] 
              hover:scale-[1.05] transition-all duration-300"
            >
              🔄 Restart Animation
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 flex flex-col gap-6">
          <div
            className="rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 
            flex justify-center items-center 
            shadow-[0_10px_25px_rgba(236,72,153,0.25),0_14px_40px_rgba(79,70,229,0.25)] 
            hover:shadow-[0_14px_30px_rgba(236,72,153,0.35),0_18px_50px_rgba(79,70,229,0.35)] 
            transition-all duration-300 h-[300px] md:h-[400px] border border-gray-200/40 dark:border-gray-700/40"
          >
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
              <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
            </svg>
          </div>

          {svgCode && (
            <textarea
              readOnly
              value={svgCode}
              className="w-full h-52 p-4 border rounded-2xl 
              bg-gray-100/70 dark:bg-gray-800/70 
              text-sm font-mono text-gray-800 dark:text-gray-100 
              shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SVGPlayground;
