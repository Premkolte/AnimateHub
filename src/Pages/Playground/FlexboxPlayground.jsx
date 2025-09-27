import React, { useState } from "react";
import { Copy, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const defaultItems = [
  { label: "Item 1", order: 0, grow: 1, shrink: 1, basis: "80px", align: "auto", color: "#8B5CF6" },
  { label: "Item 2", order: 0, grow: 1, shrink: 1, basis: "80px", align: "auto", color: "#06B6D4" },
  { label: "Item 3", order: 0, grow: 1, shrink: 1, basis: "80px", align: "auto", color: "#F59E0B" },
];

const alignSelfOptions = ["auto", "flex-start", "flex-end", "center", "baseline", "stretch"];

// Control component for consistent styling
const ControlGroup = ({ title, children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
      {title}
    </h3>
    {children}
  </div>
);

const Select = ({ label, value, onChange, options, className = "" }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className={`p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
    >
      {Array.isArray(options) 
        ? options.map(opt => <option key={opt} value={opt}>{opt}</option>)
        : Object.entries(options).map(([key, label]) => <option key={key} value={key}>{label}</option>)
      }
    </select>
  </div>
);

const Input = ({ label, type = "text", value, onChange, className = "", ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
      {...props}
    />
  </div>
);

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
    if (items.length >= 6) return;
    setItems([
      ...items,
      {
        label: `Item ${items.length + 1}`,
        order: 0,
        grow: 1,
        shrink: 1,
        basis: "80px",
        align: "auto",
        color: "#A78BFA",
      },
    ]);
  };

  const removeItem = (idx) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
    setSelected(Math.min(selected, items.length - 2));
  };

  const containerStyle = {
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    gap: `${gap}px`,
    padding: "24px",
    borderRadius: "16px",
    minHeight: "300px",
    width: "100%",
    background: "rgba(139, 92, 246, 0.05)",
    border: "2px dashed rgba(139, 92, 246, 0.3)",
  };

  const selectedItem = items[selected];

  const itemStyle = (item, index) => ({
    order: item.order,
    flexGrow: item.grow,
    flexShrink: item.shrink,
    flexBasis: item.basis,
    alignSelf: item.align,
    background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 12,
    minWidth: 60,
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: selected === index ? "3px solid #8B5CF6" : "3px solid transparent",
    boxShadow: selected === index 
      ? "0 8px 25px -5px rgba(139, 92, 246, 0.4)" 
      : "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
  });

  const containerCss = `.container {
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  justify-content: ${justify};
  align-items: ${align};
  gap: ${gap}px;
}`;

  const itemCss = `.item {
  order: ${selectedItem.order};
  flex-grow: ${selectedItem.grow};
  flex-shrink: ${selectedItem.shrink};
  flex-basis: ${selectedItem.basis};
  align-self: ${selectedItem.align};
}`;

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(containerCss + "\n\n" + itemCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const flexDirectionOptions = {
    "row": "Row →",
    "row-reverse": "Row ←",
    "column": "Column ↓", 
    "column-reverse": "Column ↑"
  };

  const justifyContentOptions = {
    "flex-start": "Flex Start",
    "center": "Center",
    "flex-end": "Flex End",
    "space-between": "Space Between",
    "space-around": "Space Around",
    "space-evenly": "Space Evenly"
  };

  const alignItemsOptions = {
    "stretch": "Stretch",
    "flex-start": "Flex Start", 
    "center": "Center",
    "flex-end": "Flex End",
    "baseline": "Baseline"
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
            Flexbox Playground
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn and experiment with CSS Flexbox properties in real-time with visual feedback.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-5 space-y-6">
            {/* Container Controls */}
            <ControlGroup title="🎛️ Container Properties">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Flex Direction"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  options={flexDirectionOptions}
                />
                <Select
                  label="Flex Wrap"
                  value={wrap}
                  onChange={(e) => setWrap(e.target.value)}
                  options={["nowrap", "wrap", "wrap-reverse"]}
                />
                <Select
                  label="Justify Content"
                  value={justify}
                  onChange={(e) => setJustify(e.target.value)}
                  options={justifyContentOptions}
                />
                <Select
                  label="Align Items"
                  value={align}
                  onChange={(e) => setAlign(e.target.value)}
                  options={alignItemsOptions}
                />
                <div className="sm:col-span-2">
                  <Input
                    label={`Gap: ${gap}px`}
                    type="range"
                    min={0}
                    max={64}
                    value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="accent-purple-600"
                  />
                </div>
              </div>
            </ControlGroup>

            {/* Item Controls */}
            <ControlGroup title="📦 Item Properties">
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selected === i
                            ? "bg-purple-600 text-white shadow-lg scale-105"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addItem}
                      disabled={items.length >= 6}
                      className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                    <button
                      onClick={() => removeItem(selected)}
                      disabled={items.length <= 1}
                      className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all"
                    >
                      <Minus size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Order"
                    type="number"
                    value={selectedItem.order}
                    onChange={(e) => handleItemChange(selected, "order", Number(e.target.value))}
                  />
                  <Input
                    label="Flex Grow"
                    type="number"
                    min={0}
                    value={selectedItem.grow}
                    onChange={(e) => handleItemChange(selected, "grow", Number(e.target.value))}
                  />
                  <Input
                    label="Flex Shrink"
                    type="number"
                    min={0}
                    value={selectedItem.shrink}
                    onChange={(e) => handleItemChange(selected, "shrink", Number(e.target.value))}
                  />
                  <Input
                    label="Flex Basis"
                    type="text"
                    value={selectedItem.basis}
                    onChange={(e) => handleItemChange(selected, "basis", e.target.value)}
                    placeholder="auto, 100px, 20%"
                  />
                  <Select
                    label="Align Self"
                    value={selectedItem.align}
                    onChange={(e) => handleItemChange(selected, "align", e.target.value)}
                    options={alignSelfOptions}
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={selectedItem.color}
                        onChange={(e) => handleItemChange(selected, "color", e.target.value)}
                        className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer bg-white dark:bg-gray-700"
                        style={{ padding: '2px' }}
                      />
                      <input
                        type="text"
                        value={selectedItem.color}
                        onChange={(e) => handleItemChange(selected, "color", e.target.value)}
                        className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-sm"
                        placeholder="#8B5CF6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ControlGroup>

            {/* CSS Output - Now with proper theme support */}
            <ControlGroup title="📝 Generated CSS">
              <div className="relative">
                <button
                  onClick={copyCss}
                  className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:scale-105 shadow-md"
                >
                  <Copy size={14} />
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
                {/* Fixed: Now uses proper light/dark theme colors */}
                <pre className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm p-6 rounded-xl overflow-x-auto leading-relaxed border border-gray-200 dark:border-gray-700">
                  <code className="text-gray-800 dark:text-gray-200">
{containerCss}

{itemCss}
                  </code>
                </pre>
              </div>
            </ControlGroup>
          </div>

          {/* Preview Panel */}
          <div className="xl:col-span-7">
            <ControlGroup title="🚀 Live Preview" className="h-full flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Click on items to select them and see their individual properties. Adjust controls to see changes in real-time.
              </p>
              <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 min-h-[400px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <motion.div
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={containerStyle}
                  className="transition-all duration-300"
                >
                  {items.map((item, i) => (
                    <motion.div
                      key={`${i}-${item.label}`}
                      layout
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={itemStyle(item, i)}
                      onClick={() => setSelected(i)}
                      className="select-none"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Selected:</strong> {selectedItem.label} • 
                  <strong> Order:</strong> {selectedItem.order} • 
                  <strong> Grow:</strong> {selectedItem.grow} • 
                  <strong> Shrink:</strong> {selectedItem.shrink} • 
                  <strong> Basis:</strong> {selectedItem.basis}
                </p>
              </div>
            </ControlGroup>
          </div>
        </div>

        {/* Quick Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-700/50"
        >
          <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
            💡 Quick Tips
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <strong className="text-blue-600 dark:text-blue-400 block mb-2">Flex Direction</strong>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Controls the main axis direction. Row = horizontal, Column = vertical.</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <strong className="text-blue-600 dark:text-blue-400 block mb-2">Justify vs Align</strong>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Justify controls main axis, Align controls cross axis alignment.</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <strong className="text-indigo-600 dark:text-indigo-400 block mb-2">Flex Grow/Shrink</strong>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Grow expands items to fill space, Shrink allows items to get smaller.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}