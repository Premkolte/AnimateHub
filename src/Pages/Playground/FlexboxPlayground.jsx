import React, { useState } from "react";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

const defaultItems = [
  { label: "Item 1", order: 0, grow: 1, shrink: 1, basis: "80px", align: "auto", color: "#3b82f6" },
  { label: "Item 2", order: 0, grow: 1, shrink: 1, basis: "80px", align: "auto", color: "#22d3ee" },
  { label: "Item 3", order: 0, grow: 1, shrink: 1, basis: "80px", align: "auto", color: "#f59e42" },
];

const alignSelfOptions = ["auto", "flex-start", "flex-end", "center", "baseline", "stretch"];

export default function FlexboxPlayground() {
  const [direction, setDirection] = useState("row");
  const [wrap, setWrap] = useState("nowrap");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [gap, setGap] = useState(16);
  const [items, setItems] = useState(defaultItems);
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleItemChange = (index, key, value) => {
    setItems((items) =>
      items.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addItem = () => {
    if (items.length >= 5) return;
    setItems([
      ...items,
      {
        label: `Item ${items.length + 1}`,
        order: 0,
        grow: 1,
        shrink: 1,
        basis: "80px",
        align: "auto",
        color: "#a78bfa",
      },
    ]);
  };

  const removeItem = (idx) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
    setSelected(0);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    gap: `${gap}px`,
    padding: "32px",
    borderRadius: "24px",
    minHeight: "360px",
    minWidth: "400px",
  };

  const selectedItem = items[selected];

  const itemStyle = (item) => ({
    order: item.order,
    flexGrow: item.grow,
    flexShrink: item.shrink,
    flexBasis: item.basis,
    alignSelf: item.align,
    background: item.color,
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 10,
    minWidth: 60,
    minHeight: 40,
    maxWidth: 120,
    maxHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  const containerCss = `display: flex;
flex-direction: ${direction};
flex-wrap: ${wrap};
justify-content: ${justify};
align-items: ${align};
gap: ${gap}px;`;

  const itemCss = `order: ${selectedItem.order};
flex-grow: ${selectedItem.grow};
flex-shrink: ${selectedItem.shrink};
flex-basis: ${selectedItem.basis};
align-self: ${selectedItem.align};`;

  const copyCss = () => {
    navigator.clipboard.writeText(containerCss + "\n\n" + itemCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/40 dark:bg-gray-900/50 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-gray-300 dark:border-gray-700 p-8">
        
        {/* LEFT: Controls */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-pulse">
            ✨ Flexbox Playground 
          </h1>

          {/* Container Controls */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-6 border border-gray-200/60 dark:border-gray-700/50 space-y-4">
            <h2 className="text-lg font-bold text-blue-600 dark:text-blue-300 mb-2">Container Controls</h2>
            <div className="grid grid-cols-2 gap-4">
              <label>
                Direction
                <select value={direction} onChange={(e) => setDirection(e.target.value)} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full">
                  <option value="row">row</option>
                  <option value="row-reverse">row-reverse</option>
                  <option value="column">column</option>
                  <option value="column-reverse">column-reverse</option>
                </select>
              </label>
              <label>
                Wrap
                <select value={wrap} onChange={(e) => setWrap(e.target.value)} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full">
                  <option value="nowrap">nowrap</option>
                  <option value="wrap">wrap</option>
                  <option value="wrap-reverse">wrap-reverse</option>
                </select>
              </label>
              <label>
                Justify Content
                <select value={justify} onChange={(e) => setJustify(e.target.value)} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full">
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                  <option value="space-evenly">space-evenly</option>
                </select>
              </label>
              <label>
                Align Items
                <select value={align} onChange={(e) => setAlign(e.target.value)} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full">
                  <option value="stretch">stretch</option>
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                  <option value="baseline">baseline</option>
                </select>
              </label>
              <label>
                Gap
                <input type="number" min={0} max={64} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full" />
              </label>
            </div>
          </div>

          {/* Item Controls */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-6 border border-gray-200/60 dark:border-gray-700/50 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-600 dark:text-blue-300">Item Controls</h2>
              <div className="flex gap-2">
                <button onClick={addItem} disabled={items.length >= 5} className="px-3 py-1 bg-emerald-500 text-white rounded-lg">+ Item</button>
                <button onClick={() => removeItem(selected)} disabled={items.length <= 1} className="px-3 py-1 bg-rose-500 text-white rounded-lg">− Item</button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {items.map((item, i) => (
                <button key={i} onClick={() => setSelected(i)} className={`px-3 py-1 rounded-lg ${selected === i ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label>
                Order
                <input type="number" value={selectedItem.order} onChange={(e) => handleItemChange(selected, "order", Number(e.target.value))} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full" />
              </label>
              <label>
                Grow
                <input type="number" value={selectedItem.grow} onChange={(e) => handleItemChange(selected, "grow", Number(e.target.value))} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full" />
              </label>
              <label>
                Shrink
                <input type="number" value={selectedItem.shrink} onChange={(e) => handleItemChange(selected, "shrink", Number(e.target.value))} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full" />
              </label>
              <label>
                Basis
                <input type="text" value={selectedItem.basis} onChange={(e) => handleItemChange(selected, "basis", e.target.value)} placeholder="auto, 100px, 20%" className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full" />
              </label>
              <label>
                Align Self
                <select value={selectedItem.align} onChange={(e) => handleItemChange(selected, "align", e.target.value)} className="p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 w-full">
                  {alignSelfOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              {/* Fixed Color Picker */}
              <label className="flex flex-col">
                Color
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={selectedItem.color}
                    onChange={(e) => handleItemChange(selected, "color", e.target.value)}
                    className="w-10 h-10 rounded-lg border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedItem.color}
                    onChange={(e) => handleItemChange(selected, "color", e.target.value)}
                    className="flex-1 p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* CSS Output */}
          <div className="rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] overflow-x-auto 
            bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-green-400 font-mono text-sm p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-blue-600 dark:text-blue-300">Generated CSS</h2>
              <button
                onClick={copyCss}
                className="flex items-center gap-2 px-3 py-1 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 shadow-md transition"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="leading-relaxed">
              {containerCss.split("\n").map((line, idx) => (
                <div key={idx}>
                  <span className="text-gray-400 dark:text-gray-500 pr-4 select-none">{idx + 1}</span>
                  {line}
                </div>
              ))}
              <br />
              {itemCss.split("\n").map((line, idx) => (
                <div key={idx}>
                  <span className="text-gray-400 dark:text-gray-500 pr-4 select-none">{idx + containerCss.split("\n").length + 1}</span>
                  {line}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="flex flex-col bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 relative shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">🔍 Live Preview</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Adjust flex properties & preview results instantly.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-1 w-full flex items-center justify-center bg-gradient-to-br from-white/90 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 shadow-inner min-h-[360px]"
          >
            <div style={containerStyle} className="transition-all duration-500 w-full h-full">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  style={{ ...itemStyle(item), outline: selected === i ? "3px solid #22d3ee" : "none" }}
                  onClick={() => setSelected(i)}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
