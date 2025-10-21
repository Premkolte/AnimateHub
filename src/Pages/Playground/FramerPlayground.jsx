import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Helper components for controls
const Control = ({ label, children }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</label>
    {children}
  </div>
);

const RangeControl = ({ label, value, onChange, min, max, step }) => (
  <Control label={`${label}: ${value}`}>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
    />
  </Control>
);

const initialSettings = {
  x: 0, y: 0, scale: 1, rotate: 0,
  borderRadius: 20, backgroundColor: "#8B5CF6",
  type: "spring", duration: 0.8, damping: 10, stiffness: 100, ease: "easeInOut",
  enableHover: false, hoverScale: 1.2, hoverRotate: 15,
  enableTap: false, tapScale: 0.9,
  animate: {},
  transition: {}
};

const FramerPlayground = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [copyButtonText, setCopyButtonText] = useState("Copy Code");
  const [key, setKey] = useState(0);

  const easingOptions = ["linear", "easeIn", "easeOut", "easeInOut", "circIn", "circOut", "circInOut", "backIn", "backOut", "backInOut", "anticipate"];

  const presets = useMemo(() => [
    { name: "Simple", config: { ...initialSettings, animate: { x: 50, rotate: 90 } } },
    { name: "Shake", config: { ...initialSettings, animate: { rotate: [0, -10, 10, -10, 10, 0] }, transition: { duration: 0.5, repeat: Infinity } } },
    { name: "Pulse", config: { ...initialSettings, animate: { scale: [1, 1.2, 1] }, transition: { duration: 1, repeat: Infinity } } },
    { name: "Flip", config: { ...initialSettings, animate: { rotateY: 360 }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } } },
    { name: "Hover & Tap", config: { ...initialSettings, enableHover: true, enableTap: true } },
  ], []);

  const applyPreset = (preset) => {
    setSettings(preset.config);
    setKey(prev => prev + 1);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value, animate: {}, transition: {} }));
  };

  const generatedCode = useMemo(() => {
    let animateCode = Object.entries(settings.animate).length > 0
      ? JSON.stringify(settings.animate, null, 2).replace(/"/g, '')
      : `{
    x: ${settings.x},
    y: ${settings.y},
    scale: ${settings.scale},
    rotate: ${settings.rotate},
  }`;

    let transitionCode = Object.entries(settings.transition).length > 0
      ? JSON.stringify(settings.transition, null, 2).replace(/"/g, '')
      : `{
      type: "${settings.type}",
      ${settings.type === 'tween' ? `duration: ${settings.duration},\n      ease: "${settings.ease}"` : `stiffness: ${settings.stiffness},\n      damping: ${settings.damping}`}
    }`;

    const hoverCode = settings.enableHover ? `  whileHover={{
    scale: ${settings.hoverScale},
    rotate: ${settings.hoverRotate},
  }}
` : '';
    const tapCode = settings.enableTap ? `  whileTap={{
    scale: ${settings.tapScale},
  }}
` : '';

    return `<motion.div
  animate={${animateCode}}
  transition={${transitionCode}}
${hoverCode}${tapCode}  style={{
    width: 100,
    height: 100,
    background: "${settings.backgroundColor}",
    borderRadius: "${settings.borderRadius}px",
  }}
/>`;
  }, [settings]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy Code"), 2000);
    } catch (err) {
      setCopyButtonText("Failed");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-8xl mx-auto">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-3">
            Framer Motion Playground
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Visually create animations and generate the code in real-time.
          </p>
        </motion.header>

        <div className="mb-8">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900 dark:text-gray-100"><span className="text-xl">✨</span> Animation Presets</h2>
          <div className="flex flex-wrap gap-3">
            {presets.map(p => (
              <button key={p.name} onClick={() => applyPreset(p)} className="px-4 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 border border-gray-200 dark:border-gray-700 transition-all">
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100"><span className="text-xl">🎛️</span> Controls</h2>
              <button onClick={() => applyPreset({ config: initialSettings })} className="px-3 py-2 text-xs font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">Reset</button>
            </div>
            <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Animate */}
              <div className="space-y-4"><h3 className="font-semibold text-purple-600 dark:text-purple-400">Animate</h3>
                <RangeControl label="X" value={settings.x} onChange={v => updateSetting('x', v)} min={-150} max={150} step={1} />
                <RangeControl label="Y" value={settings.y} onChange={v => updateSetting('y', v)} min={-150} max={150} step={1} />
                <RangeControl label="Scale" value={settings.scale} onChange={v => updateSetting('scale', v)} min={0.1} max={3} step={0.1} />
                <RangeControl label="Rotate" value={settings.rotate} onChange={v => updateSetting('rotate', v)} min={-360} max={360} step={1} />
              </div>
              {/* Interaction */}
              <div className="space-y-4"><h3 className="font-semibold text-purple-600 dark:text-purple-400">Interaction</h3>
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.enableHover} onChange={e => updateSetting('enableHover', e.target.checked)} className="w-4 h-4 accent-purple-600" /> Enable Hover</label>
                {settings.enableHover && <>
                  <RangeControl label="Hover Scale" value={settings.hoverScale} onChange={v => updateSetting('hoverScale', v)} min={0.5} max={2} step={0.1} />
                  <RangeControl label="Hover Rotate" value={settings.hoverRotate} onChange={v => updateSetting('hoverRotate', v)} min={-45} max={45} step={1} />
                </>}
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.enableTap} onChange={e => updateSetting('enableTap', e.target.checked)} className="w-4 h-4 accent-purple-600" /> Enable Tap</label>
                {settings.enableTap && <RangeControl label="Tap Scale" value={settings.tapScale} onChange={v => updateSetting('tapScale', v)} min={0.5} max={1.5} step={0.1} />}
              </div>
              {/* Style */}
              <div className="space-y-4"><h3 className="font-semibold text-purple-600 dark:text-purple-400">Style</h3>
                <RangeControl label="Border Radius" value={settings.borderRadius} onChange={v => updateSetting('borderRadius', v)} min={0} max={50} step={1} />
                <Control label="Background Color"><input type="color" value={settings.backgroundColor} onChange={e => updateSetting('backgroundColor', e.target.value)} className="w-full h-10 p-0 border-none rounded-lg cursor-pointer" /></Control>
              </div>
              {/* Transition */}
              <div className="space-y-4"><h3 className="font-semibold text-purple-600 dark:text-purple-400">Transition</h3>
                <Control label="Type"><select value={settings.type} onChange={e => updateSetting('type', e.target.value)} className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"><option value="spring">Spring</option><option value="tween">Tween</option></select></Control>
                {settings.type === 'tween' ? <>
                  <RangeControl label="Duration" value={settings.duration} onChange={v => updateSetting('duration', v)} min={0.1} max={5} step={0.1} />
                  <Control label="Easing"><select value={settings.ease} onChange={e => updateSetting('ease', e.target.value)} className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">{easingOptions.map(e => <option key={e} value={e}>{e}</option>)}</select></Control>
                </> : <>
                  <RangeControl label="Stiffness" value={settings.stiffness} onChange={v => updateSetting('stiffness', v)} min={1} max={500} step={1} />
                  <RangeControl label="Damping" value={settings.damping} onChange={v => updateSetting('damping', v)} min={1} max={50} step={1} />
                </>}
              </div>
            </div>
          </div>

          {/* Preview & Code Panel */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100"><span className="text-xl">🚀</span> Live Preview</h2>
                <button onClick={() => setKey(prev => prev + 1)} className="px-3 py-2 text-xs font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                  ▶️ Play Animation
                </button>
              </div>
              <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-xl p-4 sm:p-6 flex justify-center items-center shadow-inner min-h-[400px]">
                <motion.div
                  key={key}
                  animate={Object.keys(settings.animate).length > 0 ? settings.animate : { x: settings.x, y: settings.y, scale: settings.scale, rotate: settings.rotate }}
                  transition={Object.keys(settings.transition).length > 0 ? settings.transition : { type: settings.type, duration: settings.type === 'tween' ? settings.duration : undefined, ease: settings.type === 'tween' ? settings.ease : undefined, stiffness: settings.type === 'spring' ? settings.stiffness : undefined, damping: settings.type === 'spring' ? settings.damping : undefined }}
                  whileHover={settings.enableHover ? { scale: settings.hoverScale, rotate: settings.hoverRotate } : {}}
                  whileTap={settings.enableTap ? { scale: settings.tapScale } : {}}
                  style={{ width: 100, height: 100, background: settings.backgroundColor, borderRadius: `${settings.borderRadius}px` }}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100"><span className="text-xl">📝</span> Generated Code</h2>
                <button onClick={handleCopy} className="px-3 py-2 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">{copyButtonText}</button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-grow">
                <pre className="w-full h-full min-h-[200px] p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed overflow-auto"><code>{generatedCode}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FramerPlayground;