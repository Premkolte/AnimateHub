import React, { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Copy, Plus, Trash2, RotateCcw, Check, ChevronDown, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to interpolate colors
const interpolateColor = (color1, color2, factor) => {
  if (factor === 0) return color1;
  if (factor === 1) return color2;

  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Helper: Get shades of a color (lighter/darker)
const getShades = (hex) => {
  const shades = [];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  for (let i = -2; i <= 2; i++) {
    const factor = i * 20;
    const nr = Math.min(255, Math.max(0, r + factor));
    const ng = Math.min(255, Math.max(0, g + factor));
    const nb = Math.min(255, Math.max(0, b + factor));
    shades.push("#" + ((1 << 24) + (nr << 16) + (ng << 8) + nb).toString(16).slice(1));
  }
  return shades;
};


const ColorGradientPlayground = () => {
  // --- State ---
  const [stops, setStops] = useState([
    { id: "1", color: "#6366f1", position: 0 },
    { id: "2", color: "#ec4899", position: 50 },
    { id: "3", color: "#f59e0b", position: 100 },
  ]);
  const [activeStopId, setActiveStopId] = useState("2");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState("linear");
  const [copied, setCopied] = useState(false);
  const [presetsOpen, setPresetsOpen] = useState(false);

  // --- Refs ---
  const barRef = useRef(null);

  // --- Derived State ---
  const activeStop = stops.find((s) => s.id === activeStopId) || stops[0];
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);

  const gradientCSS = (() => {
    const stopsStr = sortedStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    if (type === "linear") return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (type === "radial") return `radial-gradient(circle, ${stopsStr})`;
    if (type === "conic") return `conic-gradient(from ${angle}deg, ${stopsStr})`;
    return "";
  })();

  // --- Handlers ---

  const handleAddStop = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100)));

    // Find surrounding stops to interpolate color
    const leftStop = sortedStops.reduce((prev, curr) => (curr.position <= percent && curr.position > (prev?.position || -1)) ? curr : prev, null);
    const rightStop = sortedStops.reduce((prev, curr) => (curr.position >= percent && curr.position < (prev?.position || 101)) ? curr : prev, null);

    let newColor = "#ffffff";
    if (leftStop && rightStop && leftStop.id !== rightStop.id) {
      const range = rightStop.position - leftStop.position;
      const factor = range === 0 ? 0 : (percent - leftStop.position) / range;
      newColor = interpolateColor(leftStop.color, rightStop.color, factor);
    } else if (leftStop) {
      newColor = leftStop.color;
    } else if (rightStop) {
      newColor = rightStop.color;
    }

    const newStop = {
      id: generateId(),
      color: newColor,
      position: percent,
    };

    setStops([...stops, newStop]);
    setActiveStopId(newStop.id);
  };

  const updateStop = (id, updates) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const removeStop = (id) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
    if (activeStopId === id) setActiveStopId(stops[0].id);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandom = () => {
    const count = Math.floor(Math.random() * 3) + 2;
    const newStops = [];
    for (let i = 0; i < count; i++) {
      newStops.push({
        id: generateId(),
        color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
        position: Math.round((i / (count - 1)) * 100)
      })
    }
    setStops(newStops);
    setActiveStopId(newStops[0].id);
    setAngle(Math.floor(Math.random() * 360));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8 font-sans">
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Editor Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 tracking-tight">
                Gradient <span className="text-slate-700 dark:text-slate-200">Playground</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                🎨 Design stunning gradients with interactive controls & real-time preview.
              </p>
            </div>

            <motion.button
              onClick={generateRandom}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all font-semibold"
            >
              <Wand2 size={18} className="text-indigo-500" />
              <span className="hidden sm:inline">Randomize</span>
            </motion.button>
          </div>

          {/* Preview Panel */}
          <div className="relative group bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 overflow-hidden">

            {/* The Gradient Box */}
            <div
              className="w-full h-64 md:h-96 rounded-2xl shadow-inner relative overflow-hidden"
              style={{ background: gradientCSS }}
            >
              {/* Grid pattern overlay for transparent parts */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              ></div>
            </div>

            {/* Floating Code Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:min-w-[400px] flex items-center gap-3 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl transition-transform transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              <code className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-mono flex-1 whitespace-pre-wrap break-all max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                {`background: ${gradientCSS};`}
              </code>
              <button
                onClick={copyToClipboard}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${copied
                  ? "bg-green-500 text-white"
                  : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                  }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Detailed Controls */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-8">

            {/* Gradient Bar Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Gradient Stops</label>
                <span className="text-xs text-slate-400">Click bar to add stop • Drag to move</span>
              </div>

              <div
                ref={barRef}
                onClick={handleAddStop}
                className="relative h-12 rounded-xl cursor-crosshair shadow-inner border border-slate-200 dark:border-slate-600"
                style={{
                  background: `linear-gradient(to right, ${sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                }}
              >
                {stops.map((stop) => (
                  <motion.div
                    key={stop.id}
                    drag="x"
                    dragConstraints={barRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={(event, info) => {
                      if (!barRef.current) return;
                      const rect = barRef.current.getBoundingClientRect();
                      const newPos = Math.min(100, Math.max(0, ((info.point.x - rect.left) / rect.width) * 100));
                      updateStop(stop.id, { position: Math.round(newPos) });
                    }}
                    onDragStart={() => setActiveStopId(stop.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStopId(stop.id);
                    }}
                    className={`absolute top-0 bottom-0 w-4 -ml-2 cursor-grab active:cursor-grabbing z-10 group outline-none`}
                    style={{ left: `${stop.position}%` }}
                  >
                    <div className={`
                                w-full h-full bg-white dark:bg-slate-700 border-2 shadow-lg rounded-md transition-transform
                                ${activeStopId === stop.id ? 'border-indigo-500 scale-110 z-20 ring-4 ring-indigo-500/20' : 'border-slate-300 dark:border-slate-500'}
                            `}>
                      <div className="w-full h-full" style={{ backgroundColor: stop.color, opacity: 0.5 }}></div>
                    </div>

                    {/* Tooltip Position */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold">
                      {stop.position}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Setting Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: General Settings */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Type & Angle</label>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl flex flex-wrap gap-4 items-center border border-slate-100 dark:border-slate-700">
                    {/* Type Select */}
                    <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-600 shadow-sm">
                      {['linear', 'radial', 'conic'].map(t => (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${type === t
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Angle Input */}
                    {type !== 'radial' && (
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={angle}
                          onChange={(e) => setAngle(Number(e.target.value))}
                          className="flex-1 accent-indigo-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 w-16 justify-center">
                          <input
                            type="number"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="w-full text-center bg-transparent text-sm font-bold text-slate-700 dark:text-white outline-none"
                          />
                          <span className="text-xs text-slate-400">°</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Active Stop Color */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Selected Color</label>
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(activeStopId)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={12} /> Remove Stop
                    </button>
                  )}
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600"
                        style={{ backgroundColor: activeStop.color }}
                      ></div>
                      <input
                        type="text"
                        value={activeStop.color.toUpperCase()}
                        onChange={(e) => updateStop(activeStop.id, { color: e.target.value })}
                        className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm font-mono font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none uppercase"
                      />
                    </div>

                    {/* Suggested Shades */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {getShades(activeStop.color).map((shade, idx) => (
                        <button
                          key={idx}
                          onClick={() => updateStop(activeStop.id, { color: shade })}
                          className="w-6 h-6 rounded-md border border-slate-100 dark:border-slate-600 hover:scale-110 transition-transform"
                          style={{ backgroundColor: shade }}
                          title={shade}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Controls (Color Picker) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 sticky top-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Color Picker</h3>
            <div className="flex flex-col items-center">
              <div className="custom-picker w-full mb-6">
                <HexColorPicker
                  color={activeStop.color}
                  onChange={(color) => updateStop(activeStop.id, { color })}
                  style={{ width: '100%', height: '200px' }}
                />
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Input Hex</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 rounded-xl px-3 border border-slate-200 dark:border-slate-600 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <span className="text-slate-400">#</span>
                    <input
                      value={activeStop.color.replace('#', '').toUpperCase()}
                      onChange={(e) => updateStop(activeStop.id, { color: '#' + e.target.value })}
                      className="w-full bg-transparent p-3 outline-none font-mono text-slate-700 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Stop Position</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={activeStop.position}
                      onChange={(e) => updateStop(activeStop.id, { position: Number(e.target.value) })}
                      className="flex-1 accent-indigo-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-mono font-bold w-10 text-right text-slate-700 dark:text-slate-300">{activeStop.position}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase">Quick Palettes</h4>
              <div className="grid grid-cols-5 gap-2">
                {[
                  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
                  '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'
                ].map(c => (
                  <button
                    key={c}
                    onClick={() => updateStop(activeStop.id, { color: c })}
                    className="w-8 h-8 rounded-full border border-slate-200 shadow-sm transition-transform hover:scale-110 active:scale-95"
                    style={{ backgroundColor: c }}
                  ></button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ColorGradientPlayground;
