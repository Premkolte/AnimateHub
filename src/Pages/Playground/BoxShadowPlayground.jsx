import React, { useState } from "react";
import { Copy, PlusCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

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
  const [bgColor, setBgColor] = useState("#f1f5f9");
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: "Soft", value: "4px 6px 12px rgba(0,0,0,0.12)" },
    {
      name: "Card",
      value:
        "0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.06)",
    },
    { name: "Floating", value: "0px 10px 30px rgba(0,0,0,0.2)" },
    {
      name: "Neumorph",
      value:
        "-8px -8px 18px rgba(255,255,255,0.7), 8px 8px 18px rgba(0,0,0,0.15)",
    },
    { name: "Strong", value: "0px 20px 40px rgba(0,0,0,0.4)" },
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
    const parts = css.split(",").map((p) => p.trim());
    const parsed = parts.map((p, i) => {
      const colorMatch = p.match(/(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8})/);
      const color = colorMatch ? colorMatch[0] : "rgba(0,0,0,0.25)";
      const remain = p.replace(color, "").trim();
      const inset = remain.includes("inset");
      const nums = remain
        .replace(/inset/i, "")
        .trim()
        .split(/\s+/)
        .map((n) => parseFloat(n));
      const [x = 0, y = 0, blur = 0, spread = 0] = nums;
      return { id: Date.now() + i, inset, x, y, blur, spread, color };
    });
    setShadows(parsed);
  }

  function buildBoxShadowCSS() {
    return shadows
      .map(
        (s) =>
          `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
      )
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
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-10 px-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-md">
            Box Shadow Playground
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            🎨 Design and export complex box-shadows visually.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 w-full"
        >
          {/* Left: Controls */}
          <div className="col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                Shadows
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={addShadow}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm shadow-md hover:shadow-lg"
                >
                  <PlusCircle size={16} /> Add
                </button>
                <button
                  onClick={() => setShadows([])}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm shadow-md hover:shadow-lg"
                >
                  <Trash2 size={16} /> Clear
                </button>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {presets.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.value)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium shadow-sm transition ${
                    idx % 2 === 0
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  } hover:shadow-lg`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Shadows */}
            <div className="space-y-4">
              {shadows.length === 0 && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  No shadows. Click Add or pick a preset.
                </div>
              )}

              {shadows.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-inner"
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm text-gray-800 dark:text-gray-100">
                      Shadow
                    </strong>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Inset
                      </label>
                      <input
                        type="checkbox"
                        checked={s.inset}
                        onChange={() => toggleInset(s.id)}
                        className="h-4 w-4 accent-pink-500"
                      />
                      <button
                        onClick={() => removeShadow(s.id)}
                        className="ml-2 text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        label: "X",
                        key: "x",
                        min: -50,
                        max: 50,
                        accent: "accent-blue-500",
                      },
                      {
                        label: "Y",
                        key: "y",
                        min: -50,
                        max: 50,
                        accent: "accent-purple-500",
                      },
                      {
                        label: "Blur",
                        key: "blur",
                        min: 0,
                        max: 200,
                        accent: "accent-pink-500",
                      },
                      {
                        label: "Spread",
                        key: "spread",
                        min: -50,
                        max: 50,
                        accent: "accent-green-500",
                      },
                    ].map((slider) => (
                      <div key={slider.key}>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {slider.label} ({s[slider.key]}px)
                        </label>
                        <input
                          type="range"
                          min={slider.min}
                          max={slider.max}
                          value={s[slider.key]}
                          onChange={(e) =>
                            updateShadow(s.id, {
                              [slider.key]: Number(e.target.value),
                            })
                          }
                          className={`w-full ${slider.accent}`}
                        />
                      </div>
                    ))}

                    <div className="col-span-2 flex items-center gap-3 mt-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Color
                      </label>
                      <input
                        type="color"
                        value={rgbaToHex(s.color)}
                        onChange={(e) =>
                          updateShadow(s.id, { color: e.target.value })
                        }
                        className="w-10 h-8 rounded-md border"
                      />
                      <input
                        type="text"
                        value={s.color}
                        onChange={(e) =>
                          updateShadow(s.id, { color: e.target.value })
                        }
                        className="flex-1 p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyCSS}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all shadow-md ${
                  copied
                    ? "bg-green-500 text-white animate-pulse"
                    : "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:shadow-lg"
                }`}
              >
                <Copy size={16} /> {copied ? "Copied!" : "Copy CSS"}
              </motion.button>
            </div>
          </div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-6 items-center justify-center border border-gray-200 dark:border-gray-700"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Background
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-8 rounded-md border"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Box
                </label>
                <input
                  type="color"
                  value={boxColor}
                  onChange={(e) => setBoxColor(e.target.value)}
                  className="w-10 h-8 rounded-md border"
                />
              </div>
            </div>

            <div
              className="w-full h-64 rounded-lg flex items-center justify-center"
              style={{ background: bgColor }}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="w-48 h-32 rounded-xl"
                style={{ background: boxColor, boxShadow: boxShadowCSS }}
              ></motion.div>
            </div>

            <div className="w-full">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                CSS
              </label>
              <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm shadow-inner overflow-x-auto border border-gray-200 dark:border-gray-700">
                {`box-shadow: ${boxShadowCSS};`}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function rgbaToHex(value) {
  try {
    if (value.startsWith("#")) return value;
    const m = value.match(/rgba?\(([^)]+)\)/);
    if (!m) return value;
    const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
    const [r, g, b] = parts;
    const hex = [r, g, b]
      .map((n) => {
        const v = Math.round(n).toString(16);
        return v.length === 1 ? `0${v}` : v;
      })
      .join("");
    return `#${hex}`;
  } catch {
    return value;
  }
}
