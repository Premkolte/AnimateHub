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
    animationType: "slideIn",
    shape: "square",
    borderRadius: 24,
    blur: 0,
    opacity: 1,
  });

  const [savedAnimations, setSavedAnimations] = useState([]);
  const [currentPreset, setCurrentPreset] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCode, setShowCode] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const presets = {
    bounce: { duration: 0.6, ease: "backInOut", scale: 1.2, repeat: 2, direction: "alternate", animationType: "bounce" },
    pulse: { duration: 1.5, ease: "easeInOut", scale: 1.1, repeat: "infinite", direction: "alternate", animationType: "pulse" },
    spin: { duration: 2, ease: "linear", rotate: 360, repeat: "infinite", direction: "normal", animationType: "spin" },
    fade: { duration: 1, ease: "easeInOut", opacity: 0.3, repeat: "infinite", direction: "alternate", animationType: "fade" },
    shake: { duration: 0.5, ease: "easeInOut", repeat: 3, direction: "alternate", animationType: "shake" },
  };

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
      animationType: "slideIn",
      shape: "square",
      borderRadius: 24,
      blur: 0,
      opacity: 1,
    });

  const loadPreset = (presetName) => {
    setSettings(prev => ({ ...prev, ...presets[presetName] }));
    setCurrentPreset(presetName);
  };

  const saveAnimation = () => {
    const name = prompt("Enter a name for this animation:");
    if (name) {
      setSavedAnimations(prev => [...prev, { name, settings: {...settings} }]);
    }
  };

  const loadSavedAnimation = (savedSettings) => {
    setSettings(savedSettings);
  };

  const getAnimationVariants = (type) => {
    const variants = {
      slideIn: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
      slideUp: { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 } },
      slideDown: { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 } },
      fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
      scaleIn: { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
      rotateIn: { initial: { rotate: -180, opacity: 0 }, animate: { rotate: 0, opacity: 1 } },
      bounce: { initial: { y: -100 }, animate: { y: 0 } },
      pulse: { initial: { scale: 1 }, animate: { scale: 1.05 } },
      spin: { initial: { rotate: 0 }, animate: { rotate: 360 } },
      shake: { initial: { x: 0 }, animate: { x: [-10, 10, -10, 10, 0] } },
      fade: { initial: { opacity: 1 }, animate: { opacity: 0.5 } },
    };
    return variants[type] || variants.slideIn;
  };

  const codeSnippet = `
.motion-div {
  animation: customAnimation ${settings.duration}s ${settings.ease} ${settings.delay}s ${
    settings.repeat === "infinite" ? "infinite" : settings.repeat
  };
  transform: scale(${settings.scale}) rotate(${settings.rotate}deg);
  background-color: ${settings.color};
}

@keyframes customAnimation {
  0% { 
    opacity: 0;
    transform: translateX(-100px) scale(${settings.scale}) rotate(${settings.rotate}deg);
  }
  100% { 
    opacity: 1;
    transform: translateX(0) scale(${settings.scale}) rotate(${settings.rotate}deg);
  }
}`;

  const downloadCSS = () => {
    const blob = new Blob([codeSnippet], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "animation.css";
    link.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const getShapeStyle = () => {
    const baseStyle = {
      backgroundColor: settings.color,
      filter: `blur(${settings.blur}px)`,
      opacity: settings.opacity,
    };

    if (settings.shape === 'circle') {
      return { ...baseStyle, borderRadius: '50%' };
    } else if (settings.shape === 'triangle') {
      return {
        ...baseStyle,
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        borderRadius: 0,
      };
    } else {
      return { ...baseStyle, borderRadius: `${settings.borderRadius}px` };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen w-full py-8 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with Quick Presets */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Animation Playground
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Create stunning animations with real-time preview. Fine-tune easing, transforms, and timing to craft the perfect motion experience.
          </p>
          
          {/* Quick Presets */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {Object.keys(presets).map((preset) => (
              <button
                key={preset}
                onClick={() => loadPreset(preset)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  currentPreset === preset
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-600'
                }`}
              >
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Controls + Preview */}
        <section className="grid lg:grid-cols-5 gap-8">
          {/* Enhanced Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚙️</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Controls</h2>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  name="duration"
                  value={settings.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Delay (seconds)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="delay"
                  value={settings.delay}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Animation Type
                </label>
                <select
                  name="animationType"
                  value={settings.animationType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="slideIn">Slide In</option>
                  <option value="slideUp">Slide Up</option>
                  <option value="slideDown">Slide Down</option>
                  <option value="fadeIn">Fade In</option>
                  <option value="scaleIn">Scale In</option>
                  <option value="rotateIn">Rotate In</option>
                  <option value="bounce">Bounce</option>
                  <option value="pulse">Pulse</option>
                  <option value="spin">Spin</option>
                  <option value="shake">Shake</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Shape
                </label>
                <select
                  name="shape"
                  value={settings.shape}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>

              {settings.shape === 'square' && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Border Radius
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    name="borderRadius"
                    value={settings.borderRadius}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">{settings.borderRadius}px</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Blur Effect
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    name="blur"
                    value={settings.blur}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">{settings.blur}px</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Opacity
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    name="opacity"
                    value={settings.opacity}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">{Math.round(settings.opacity * 100)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Repeat
                  </label>
                  <select
                    name="repeat"
                    value={settings.repeat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                    <option value="infinite">∞</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Direction
                  </label>
                  <select
                    name="direction"
                    value={settings.direction}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="normal">Normal</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate</option>
                    <option value="alternate-reverse">Alt-Rev</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Scale
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="3"
                    name="scale"
                    value={settings.scale}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Rotate (°)
                  </label>
                  <input
                    type="number"
                    min="-360"
                    max="360"
                    name="rotate"
                    value={settings.rotate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Animation Color
                </label>
                <div className="flex space-x-3">
                  <input
                    type="color"
                    name="color"
                    value={settings.color}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 cursor-pointer"
                  />
                  <div className="flex space-x-2">
                    {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSettings(prev => ({ ...prev, color }))}
                        className="w-10 h-10 rounded-lg border-2 border-white dark:border-slate-600 shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Easing Function
                </label>
                <select
                  name="ease"
                  value={settings.ease}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="easeInOut">Ease In Out</option>
                  <option value="easeIn">Ease In</option>
                  <option value="easeOut">Ease Out</option>
                  <option value="linear">Linear</option>
                  <option value="anticipate">Anticipate</option>
                  <option value="backInOut">Back In Out</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={saveAnimation}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  💾 Save
                </button>
                <button
                  onClick={resetSettings}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  🔄 Reset
                </button>
              </div>

              {savedAnimations.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Saved Animations
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {savedAnimations.map((saved, index) => (
                      <button
                        key={index}
                        onClick={() => loadSavedAnimation(saved.settings)}
                        className="w-full text-left px-3 py-2 bg-slate-100 dark:bg-slate-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors text-sm"
                      >
                        📁 {saved.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={resetSettings}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Reset to Defaults
              </button>
            </div>
          </motion.div>

          {/* Enhanced Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">👀</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Live Preview</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayback}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      isPlaying 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                  </button>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 min-h-[400px] relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
              </div>
              
              <motion.div
                key={isPlaying ? JSON.stringify(settings) : 'paused'} // re-trigger animation when settings change
                initial={getAnimationVariants(settings.animationType).initial}
                animate={isPlaying ? {
                  ...getAnimationVariants(settings.animationType).animate,
                  scale: parseFloat(settings.scale), 
                  rotate: parseFloat(settings.rotate),
                  opacity: parseFloat(settings.opacity),
                } : getAnimationVariants(settings.animationType).initial}
                transition={{
                  duration: parseFloat(settings.duration),
                  delay: parseFloat(settings.delay),
                  ease: settings.ease,
                  repeat: settings.repeat === "infinite" ? Infinity : Math.max(0, parseInt(settings.repeat) - 1),
                  repeatType: settings.direction === "alternate" || settings.direction === "alternate-reverse" ? "reverse" : "loop",
                }}
                style={getShapeStyle()}
                className="relative w-40 h-40 shadow-2xl flex items-center justify-center text-white font-bold text-xl border-4 border-white/20 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" style={{borderRadius: settings.shape === 'circle' ? '50%' : `${settings.borderRadius}px`}}></div>
                <span className="relative z-10">Animate</span>
              </motion.div>

              <div className="mt-8 text-center space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Duration: {settings.duration}s | Delay: {settings.delay}s
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {settings.ease} • Scale: {settings.scale}x • Rotate: {settings.rotate}°
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Code Output */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700"
        >
          <div className="px-8 py-6 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📄</span>
              </div>
              <h2 className="text-xl font-bold">Generated CSS Code</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              >
                {showCode ? '👁️ Hide' : '👁️ Show'}
              </button>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {showCode && (
              <pre className="bg-black/40 p-6 rounded-xl text-sm font-mono leading-relaxed overflow-x-auto border border-slate-600">
                <code className="text-green-400">{codeSnippet}</code>
              </pre>
            )}
            
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={copyToClipboard}
                className={`px-6 py-3 font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 ${
                  copySuccess 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>{copySuccess ? '✅' : '📋'}</span>
                <span>{copySuccess ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
              <button
                onClick={downloadCSS}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>⬇️</span>
                <span>Download CSS File</span>
              </button>
              <button
                onClick={() => window.open(`data:text/html,<html><head><style>${codeSnippet}</style></head><body><div class="motion-div">Preview</div></body></html>`, '_blank')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>🌐</span>
                <span>Open in New Tab</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center py-8"
        >
          <p className="text-slate-500 dark:text-slate-400">
            Built with React, Framer Motion, and Tailwind CSS
          </p>
        </motion.footer>
      </div>
    </motion.div>
  );
}