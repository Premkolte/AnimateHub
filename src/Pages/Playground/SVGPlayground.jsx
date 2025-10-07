import React, { useState, useEffect, useCallback } from "react";

const initialSettings = {
  strokeColor: "#8B5CF6", // purple-500
  fillColor: "transparent",
  duration: 2,
  strokeWidth: 4,
  rotateAngle: 0,
  opacity: 1,
  scale: 1,
  dashArray: 400,
  shape: "path",
  animationType: "draw",
  easing: "linear",
};

const SVGPlayground = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [key, setKey] = useState(0);
  const [svgCode, setSvgCode] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Code");

  const updateSetting = (settingKey, value) => {
    setSettings((prev) => ({ ...prev, [settingKey]: value }));
  };

  const restartAnimation = () => setKey((prev) => prev + 1);
  
  const resetAll = () => {
    setSettings(initialSettings);
    setKey((prev) => prev + 1); // Force restart animation
  };

  const generateSvgElement = useCallback(() => {
    const { shape, fillColor, strokeColor, strokeWidth, dashArray, rotateAngle, scale, opacity } = settings;
    
    // Handle transparent fill
    const actualFillColor = fillColor === "transparent" ? "none" : fillColor;
    const commonProps = `fill="${actualFillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" opacity="${opacity}"`;
    
    // Center coordinates for proper rotation
    const centerX = 150;
    const centerY = 100;
    
    switch (shape) {
      case "circle":
        return `<circle cx="${centerX}" cy="${centerY}" r="60" ${commonProps} style="transform-origin: ${centerX}px ${centerY}px; transform: rotate(${rotateAngle}deg) scale(${scale});" />`;
      case "rect":
        const rectWidth = 120;
        const rectHeight = 80;
        const rectX = centerX - rectWidth / 2;
        const rectY = centerY - rectHeight / 2;
        return `<rect x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" rx="10" ${commonProps} style="transform-origin: ${centerX}px ${centerY}px; transform: rotate(${rotateAngle}deg) scale(${scale});" />`;
      case "path":
      default:
        const pathStroke = settings.animationType === 'draw' ? `stroke-dasharray="${dashArray}" stroke-dashoffset="${dashArray}"` : '';
        return `<path d="M70 ${centerY} Q${centerX} 40 230 ${centerY}" ${commonProps} ${pathStroke} style="transform-origin: ${centerX}px ${centerY}px; transform: rotate(${rotateAngle}deg) scale(${scale});" />`;
    }
  }, [settings]);

  const generateKeyframes = useCallback(() => {
    const { animationType } = settings;
    switch (animationType) {
      case "rotate":
        return `@keyframes animate {
    from { transform: rotate(0deg) scale(${settings.scale}); }
    to { transform: rotate(360deg) scale(${settings.scale}); }
  }`;
      case "pulse":
        return `@keyframes animate {
    0%, 100% { transform: rotate(${settings.rotateAngle}deg) scale(${settings.scale}); opacity: ${settings.opacity}; }
    50% { transform: rotate(${settings.rotateAngle}deg) scale(${settings.scale * 1.2}); opacity: ${settings.opacity * 0.7}; }
  }`;
      case "draw":
      default:
        return `@keyframes animate {
    from { stroke-dashoffset: ${settings.dashArray}; transform: rotate(${settings.rotateAngle}deg) scale(${settings.scale}); }
    to { stroke-dashoffset: 0; transform: rotate(${settings.rotateAngle}deg) scale(${settings.scale}); }
  }`;
    }
  }, [settings]);

  useEffect(() => {
    const svgElement = generateSvgElement();
    const keyframes = generateKeyframes();
    const animatedElement = svgElement.replace('style="', 'class="animated-shape" style="');
    
    const code = `<svg width="300" height="200" viewBox="0 0 300 200" style="overflow: hidden;">
  ${animatedElement}
  <style>
    .animated-shape {
      animation: animate ${settings.duration}s ${settings.easing} infinite;
    }
    ${keyframes}
  </style>
</svg>`;
    setSvgCode(code);
  }, [settings, generateSvgElement, generateKeyframes]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(svgCode);
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy Code"), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyButtonText("Failed to copy");
      setTimeout(() => setCopyButtonText("Copy Code"), 2000);
    }
  };

  const ControlGroup = ({ title, children }) => (
    <fieldset className="border border-gray-300 dark:border-gray-600 rounded-xl p-4 space-y-4 bg-white/50 dark:bg-gray-800/50">
      <legend className="px-3 font-semibold text-purple-700 dark:text-purple-300 text-sm">{title}</legend>
      {children}
    </fieldset>
  );

  const RangeControl = ({ name, label, min, max, step, unit = "" }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className="text-xs font-mono px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
          {settings[name]}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={settings[name]}
        onChange={(e) => updateSetting(name, parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((settings[name] - min) / (max - min)) * 100}%, #e5e7eb ${((settings[name] - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
      />
    </div>
  );

  const ColorControl = ({ name, label }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <input
          type="color"
          value={settings[name] === "transparent" ? "#ffffff" : settings[name]}
          onChange={(e) => updateSetting(name, e.target.value)}
          className="w-full h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
        />
        {name === "fillColor" && (
          <button
            onClick={() => updateSetting(name, "transparent")}
            className={`absolute top-1 right-1 px-2 py-1 text-xs rounded ${
              settings[name] === "transparent" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            None
          </button>
        )}
      </div>
    </div>
  );

  const SelectControl = ({ name, label, options }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <select 
        value={settings[name]} 
        onChange={e => updateSetting(name, e.target.value)} 
        className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-4">
            SVG Animation Playground
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experiment with SVG properties and CSS animations in real-time. Create stunning animated graphics with just a few clicks.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-4">
            <div className="sticky top-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">🎛️ Controls</h2>
                <button 
                  onClick={resetAll} 
                  className="px-4 py-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                >
                  Reset All
                </button>
              </div>
              
              <ControlGroup title="Shape & Style">
                <SelectControl 
                  name="shape" 
                  label="Shape Type"
                  options={[
                    { value: "path", label: "Curved Path" },
                    { value: "circle", label: "Circle" },
                    { value: "rect", label: "Rectangle" }
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ColorControl name="strokeColor" label="Stroke Color" />
                  <ColorControl name="fillColor" label="Fill Color" />
                </div>
                <RangeControl name="strokeWidth" label="Stroke Width" min="1" max="20" step="1" unit="px" />
                <RangeControl name="opacity" label="Opacity" min="0.1" max="1" step="0.05" unit="" />
              </ControlGroup>

              <ControlGroup title="Transform">
                <RangeControl name="rotateAngle" label="Rotation" min="0" max="360" step="5" unit="°" />
                <RangeControl name="scale" label="Scale" min="0.2" max="2.5" step="0.1" unit="x" />
              </ControlGroup>

              <ControlGroup title="Animation">
                <SelectControl 
                  name="animationType" 
                  label="Animation Type"
                  options={[
                    { value: "draw", label: "Draw Animation" },
                    { value: "rotate", label: "Rotation" },
                    { value: "pulse", label: "Pulse Effect" }
                  ]}
                />
                <SelectControl 
                  name="easing" 
                  label="Easing Function"
                  options={[
                    { value: "linear", label: "Linear" },
                    { value: "ease", label: "Ease" },
                    { value: "ease-in", label: "Ease In" },
                    { value: "ease-out", label: "Ease Out" },
                    { value: "ease-in-out", label: "Ease In-Out" },
                    { value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)", label: "Bounce" }
                  ]}
                />
                <RangeControl name="duration" label="Duration" min="0.5" max="8" step="0.1" unit="s" />
                {settings.shape === 'path' && settings.animationType === 'draw' && (
                  <RangeControl name="dashArray" label="Dash Array" min="100" max="1000" step="50" unit="" />
                )}
              </ControlGroup>

              <button 
                onClick={restartAnimation} 
                className="w-full p-4 text-white font-bold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                🔄 Restart Animation
              </button>
            </div>
          </div>

          {/* Preview & Code */}
          <div className="xl:col-span-8 space-y-8">
            {/* Preview Section */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Live Preview</h3>
              </div>
              <div className="p-8 flex justify-center items-center min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg" style={{ overflow: 'hidden' }}>
                  <svg 
                    key={key} 
                    width="300" 
                    height="200" 
                    viewBox="0 0 300 200"
                    style={{ overflow: 'hidden' }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <style>{`
                      .animated-shape {
                        animation: animate ${settings.duration}s ${settings.easing} infinite;
                      }
                      ${generateKeyframes()}
                    `}</style>
                    <g dangerouslySetInnerHTML={{ 
                      __html: generateSvgElement().replace('style="', 'class="animated-shape" style="') 
                    }} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Code Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generated SVG Code</h3>
                <button 
                  onClick={handleCopy} 
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-md hover:shadow-lg"
                >
                  {copyButtonText}
                </button>
              </div>
              <div className="relative">
                <pre className="p-6 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto max-h-80 leading-relaxed">
                  <code>{svgCode}</code>
                </pre>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                    HTML/SVG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default SVGPlayground;