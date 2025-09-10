import React, { useState } from "react";
import { Copy, PlusCircle, Trash2, Shuffle } from "lucide-react";

export default function BoxShadowPlayground() {
  const defaultShadow = {
    id: Date.now(),
    inset: false,
    x: 4,
    y: 6,
    blur: 10,
    spread: 0,
    color: "rgba(0,0,0,0.35)",
  };

  const [shadows, setShadows] = useState([defaultShadow]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxColor, setBoxColor] = useState("#f8fafc");
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: "Soft Elevation", value: "4px 6px 12px rgba(0,0,0,0.12)" },
    { name: "Card", value: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)" },
    { name: "Floating", value: "0 10px 30px rgba(0,0,0,0.2)" },
    { name: "Neumorphism", value: "-8px -8px 18px rgba(255,255,255,0.7), 8px 8px 18px rgba(0,0,0,0.15)" },
    { name: "Strong", value: "0 20px 40px rgba(0,0,0,0.4)" },
  ];

  function updateShadow(id, patch) {
    setShadows((s) => s.map((sh) => (sh.id === id ? { ...sh, ...patch } : sh)));
  }

  function addShadow() {
    setShadows((s) => [
      ...s,
      {
        id: Date.now() + Math.random(),
        inset: false,
        x: 0,
        y: 6,
        blur: 10,
        spread: 0,
        color: "rgba(0,0,0,0.25)",
      },
    ]);
  }

  function removeShadow(id) {
    setShadows((s) => s.filter((sh) => sh.id !== id));
  }

  function toggleInset(id) {
    updateShadow(id, { inset: !shadows.find((sh) => sh.id === id).inset });
  }

  function applyPreset(css) {
    // Convert preset CSS to internal shadows array (naive split by comma)
    const parts = css.split(",").map((p) => p.trim());
    const parsed = parts.map((p, i) => {
      // attempt to extract rgba or hex color at end
      const colorMatch = p.match(/(rgba?\([^\)]+\)|#\w{3,8})$/i);
      const color = colorMatch ? colorMatch[0] : "rgba(0,0,0,0.25)";
      const remain = p.replace(color, "").trim();
      const inset = /inset$/i.test(remain);
      const nums = remain.replace(/inset/i, "").trim().split(/\s+/).map(Number);
      const [x = 0, y = 0, blur = 0, spread = 0] = nums;
      return {
        id: Date.now() + i + Math.random(),
        inset,
        x,
        y,
        blur,
        spread,
        color,
      };
    });
    setShadows(parsed);
  }

  function buildBoxShadowCSS() {
    return shadows
      .map((s) => `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
      .join(", ");
  }

  const boxShadowCSS = buildBoxShadowCSS();

  function copyCSS() {
    const cssText = `box-shadow: ${boxShadowCSS};`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Box Shadow Playground</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Design and export complex box-shadow easily.</p>
          </div>
          <div className="flex gap-2 items-center">
            <select
              onChange={(e) => applyPreset(e.target.value)}
              className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
            >
              <option value="">Presets</option>
              {presets.map((p) => (
                <option key={p.name} value={p.value}>{p.name}</option>
              ))}
            </select>
            <button
              onClick={() => setShadows([defaultShadow])}
              className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-sm text-sm"
            >
              Reset
            </button>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          {/* Left: Controls */}
          <section className="col-span-2 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">Shadows</h2>
              <div className="flex gap-2">
                <button onClick={addShadow} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500 text-white text-sm">
                  <PlusCircle size={16} /> Add
                </button>
                <button onClick={() => { setShadows([]); }} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500 text-white text-sm">
                  <Trash2 size={16} /> Clear
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {shadows.length === 0 && (
                <div className="text-sm text-gray-500">No shadows. Click Add to create one or pick a preset.</div>
              )}

              {shadows.map((s) => (
                <div key={s.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm text-gray-800 dark:text-gray-100">Shadow</strong>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400">Inset</label>
                      <input type="checkbox" checked={s.inset} onChange={() => toggleInset(s.id)} className="h-4 w-4" />
                      <button onClick={() => removeShadow(s.id)} className="ml-2 text-red-500 text-sm">Remove</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">X ({s.x}px)</label>
                      <input type="range" min={-50} max={50} value={s.x} onChange={(e) => updateShadow(s.id, { x: Number(e.target.value) })} className="w-full range-slider" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Y ({s.y}px)</label>
                      <input type="range" min={-50} max={50} value={s.y} onChange={(e) => updateShadow(s.id, { y: Number(e.target.value) })} className="w-full range-slider" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Blur ({s.blur}px)</label>
                      <input type="range" min={0} max={200} value={s.blur} onChange={(e) => updateShadow(s.id, { blur: Number(e.target.value) })} className="w-full range-slider" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Spread ({s.spread}px)</label>
                      <input type="range" min={-50} max={50} value={s.spread} onChange={(e) => updateShadow(s.id, { spread: Number(e.target.value) })} className="w-full range-slider" />
                    </div>

                    <div className="col-span-2 flex items-center gap-3 mt-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400">Color</label>
                      <input type="color" value={rgbaToHex(s.color)} onChange={(e) => updateShadow(s.id, { color: e.target.value })} className="w-10 h-8 rounded-md border" />
                      <input type="text" value={s.color} onChange={(e) => updateShadow(s.id, { color: e.target.value })} className="flex-1 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button onClick={copyCSS} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white">
                <Copy size={16} /> {copied ? "Copied" : "Copy box-shadow CSS"}
              </button>

              <button onClick={() => { setShadows([defaultShadow]); setBoxColor('#f8fafc'); setBgColor('#ffffff'); }} className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm">
                Reset Visuals
              </button>
            </div>
          </section>

          {/* Right: Preview */}
          <aside className="flex flex-col items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">Background</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-8 rounded-md border" />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">Box</label>
                <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="w-10 h-8 rounded-md border" />
              </div>
            </div>

            <div className="w-full h-64 rounded-lg flex items-center justify-center" style={{ background: bgColor }}>
              <div className="w-48 h-32 rounded-md transition-all" style={{ background: boxColor, boxShadow: boxShadowCSS }}>
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs text-gray-500 dark:text-gray-400">CSS</label>
              <pre className="p-3 rounded-md bg-gray-50 dark:bg-gray-800 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">{`box-shadow: ${boxShadowCSS};`}</pre>
            </div>
          </aside>
        </main>
      </div>

      {/* Inline styles for range slider to ensure theme-friendly track */}
      <style >{`
        .range-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          background: #e5e7eb;
        }
        .dark .range-slider { background: #374151; }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
        .range-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}

// helper to convert rgba(...) to hex if possible, fallback to given value
function rgbaToHex(value) {
  try {
    if (value.startsWith("#")) return value;
    const m = value.match(/rgba?\(([^)]+)\)/);
    if (!m) return value;
    const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
    const [r, g, b] = parts;
    const hex = [r, g, b].map((n) => {
      const v = Math.round(n).toString(16);
      return v.length === 1 ? `0${v}` : v;
    }).join("");
    return `#${hex}`;
  } catch (e) {
    return value;
  }
}
