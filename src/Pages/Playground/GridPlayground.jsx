import React, { useState, useRef } from "react";

export default function GridPlayground() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(10);
  const [items, setItems] = useState(6);
  const [itemHeight, setItemHeight] = useState(100);
  const [alignment, setAlignment] = useState("center");
  const [justifyContent, setJustifyContent] = useState("center");
  const [itemColors, setItemColors] = useState({});
  const [gridTemplate, setGridTemplate] = useState("equal");
  const [customColumns, setCustomColumns] = useState("1fr 2fr 1fr");
  const [customRows, setCustomRows] = useState("100px auto 50px");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemSpans, setItemSpans] = useState({});
  const [autoFlow, setAutoFlow] = useState("row");
  const [showGridLines, setShowGridLines] = useState(true);
  const [presetTemplate, setPresetTemplate] = useState("custom");
  const gridRef = useRef(null);

  const presets = {
    sidebar: { columns: 4, rows: 3, customColumns: "250px 1fr 1fr 1fr", items: 8 },
    header: { columns: 1, rows: 3, customRows: "80px 1fr 60px", items: 3 },
    cards: { columns: 3, rows: 2, gap: 20, items: 6 },
    masonry: { columns: 4, rows: 3, customColumns: "repeat(4, 1fr)", autoFlow: "row dense", items: 10 },
    dashboard: { columns: 4, rows: 3, customColumns: "200px 1fr 1fr 200px", customRows: "60px 1fr 40px", items: 8 }
  };

  const getItemColor = (index) => {
    return itemColors[index] || `hsl(${(index * 137.5) % 360}, 70%, 55%)`;
  };

  const getItemSpan = (index) => {
    return itemSpans[index] || { colSpan: 1, rowSpan: 1 };
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: gridTemplate === "equal" ? `repeat(${columns}, 1fr)` : customColumns,
    gridTemplateRows: gridTemplate === "equal" ? `repeat(${rows}, ${itemHeight}px)` : customRows,
    gap: `${gap}px`,
    padding: "20px",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    border: "2px dashed #64748b",
    borderRadius: "16px",
    minHeight: "300px",
    position: "relative",
    overflow: "hidden",
    alignItems: alignment,
    justifyContent: justifyContent,
    gridAutoFlow: autoFlow,
  };

  const containerCss = `display: grid;
grid-template-columns: ${gridTemplate === "equal" ? `repeat(${columns}, 1fr)` : customColumns};
grid-template-rows: ${gridTemplate === "equal" ? `repeat(${rows}, ${itemHeight}px)` : customRows};
gap: ${gap}px;
align-items: ${alignment};
justify-content: ${justifyContent};
grid-auto-flow: ${autoFlow};`;

  const addItem = () => setItems(items + 1);
  const removeItem = () => setItems(items > 1 ? items - 1 : 1);
  
  const randomizeColors = () => {
    const newColors = {};
    for (let i = 0; i < items; i++) {
      newColors[i] = `hsl(${Math.random() * 360}, ${60 + Math.random() * 20}%, ${45 + Math.random() * 20}%)`;
    }
    setItemColors(newColors);
  };

  const resetGrid = () => {
    setColumns(3);
    setRows(2);
    setGap(10);
    setItems(6);
    setItemHeight(100);
    setAlignment("center");
    setJustifyContent("center");
    setItemColors({});
    setGridTemplate("equal");
    setCustomColumns("1fr 2fr 1fr");
    setCustomRows("100px auto 50px");
    setSelectedItem(null);
    setItemSpans({});
    setAutoFlow("row");
    setPresetTemplate("custom");
  };

  const exportCSS = () => {
    const css = `.grid-container {
  ${containerCss.split('\n').join('\n  ')}
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
  color: white;
  transition: all 0.2s ease;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}`;
    
    navigator.clipboard.writeText(css);
    alert("CSS copied to clipboard!");
  };

  const applyPreset = (preset) => {
    const config = presets[preset];
    if (config) {
      setColumns(config.columns);
      setRows(config.rows || rows);
      setGap(config.gap || gap);
      setItems(config.items);
      if (config.customColumns) {
        setCustomColumns(config.customColumns);
        setGridTemplate("custom");
      }
      if (config.customRows) {
        setCustomRows(config.customRows);
        setGridTemplate("custom");
      }
      if (config.autoFlow) {
        setAutoFlow(config.autoFlow);
      }
      setPresetTemplate(preset);
    }
  };

  const updateItemSpan = (index, type, value) => {
    setItemSpans(prev => ({
      ...prev,
      [index]: {
        ...getItemSpan(index),
        [type]: Math.max(1, Math.min(value, type === 'colSpan' ? columns : rows))
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            🟦 Advanced Grid Playground
          </h1>
          <p className="text-slate-600 text-lg">Professional CSS Grid visualization tool with advanced features</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Basic Controls */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                ⚙️ Basic Controls
              </h2>

              {/* Presets */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  Quick Presets
                </label>
                <select
                  value={presetTemplate}
                  onChange={(e) => applyPreset(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all duration-200"
                >
                  <option value="custom">Custom</option>
                  <option value="sidebar">Sidebar Layout</option>
                  <option value="header">Header/Content/Footer</option>
                  <option value="cards">Card Grid</option>
                  <option value="masonry">Masonry Style</option>
                  <option value="dashboard">Dashboard Layout</option>
                </select>
              </div>

              {/* Template Type */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  Grid Template
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGridTemplate("equal")}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                      gridTemplate === "equal" 
                        ? "bg-blue-500 text-white" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Equal
                  </button>
                  <button
                    onClick={() => setGridTemplate("custom")}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                      gridTemplate === "custom" 
                        ? "bg-blue-500 text-white" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {gridTemplate === "equal" ? (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Columns</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={columns}
                      onChange={(e) => setColumns(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Rows</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rows}
                      onChange={(e) => setRows(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Custom Columns</label>
                    <input
                      type="text"
                      value={customColumns}
                      onChange={(e) => setCustomColumns(e.target.value)}
                      placeholder="1fr 2fr 1fr"
                      className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Custom Rows</label>
                    <input
                      type="text"
                      value={customRows}
                      onChange={(e) => setCustomRows(e.target.value)}
                      placeholder="100px auto 50px"
                      className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Gap: {gap}px</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Height: {itemHeight}px</label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={itemHeight}
                    onChange={(e) => setItemHeight(Number(e.target.value))}
                    className="w-full"
                    disabled={gridTemplate === "custom"}
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={addItem}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all"
                >
                  + Add ({items})
                </button>
                <button
                  onClick={removeItem}
                  disabled={items <= 1}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-xl transition-all"
                >
                  − Remove
                </button>
              </div>
            </div>

            {/* Advanced Controls */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                🎛️ Advanced Controls
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Align Items</label>
                  <select
                    value={alignment}
                    onChange={(e) => setAlignment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all"
                  >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Justify Content</label>
                  <select
                    value={justifyContent}
                    onChange={(e) => setJustifyContent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all"
                  >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                    <option value="space-evenly">Space Evenly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Auto Flow</label>
                  <select
                    value={autoFlow}
                    onChange={(e) => setAutoFlow(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 transition-all"
                  >
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                    <option value="row dense">Row Dense</option>
                    <option value="column dense">Column Dense</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Show Grid Lines</label>
                  <button
                    onClick={() => setShowGridLines(!showGridLines)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      showGridLines ? "bg-blue-500" : "bg-slate-300"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      showGridLines ? "translate-x-6" : "translate-x-0.5"
                    }`}></div>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={randomizeColors}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                  >
                    🎨 Random Colors
                  </button>
                  <button
                    onClick={resetGrid}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-xl transition-all"
                  >
                    🔄 Reset
                  </button>
                </div>

                <button
                  onClick={exportCSS}
                  className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all"
                >
                  📋 Export CSS
                </button>
              </div>
            </div>
          </div>

          {/* MIDDLE: Preview */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  🔍 Live Preview
                </h2>
                <div className="bg-slate-100 px-3 py-1 rounded-full text-sm font-semibold text-slate-600">
                  {items} items
                </div>
              </div>
              
              <div className="relative">
                {showGridLines && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: `
                      linear-gradient(to right, #64748b 1px, transparent 1px),
                      linear-gradient(to bottom, #64748b 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}></div>
                )}
                
                <div ref={gridRef} style={containerStyle}>
                  {Array.from({ length: items }).map((_, i) => {
                    const span = getItemSpan(i);
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedItem(selectedItem === i ? null : i)}
                        className={`relative flex items-center justify-center text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden group ${
                          selectedItem === i ? "ring-4 ring-yellow-400 ring-opacity-75" : ""
                        }`}
                        style={{
                          background: getItemColor(i),
                          gridColumn: span.colSpan > 1 ? `span ${span.colSpan}` : undefined,
                          gridRow: span.rowSpan > 1 ? `span ${span.rowSpan}` : undefined,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <span className="relative z-10 text-lg font-black">
                          {i + 1}
                        </span>
                        
                        {(span.colSpan > 1 || span.rowSpan > 1) && (
                          <div className="absolute top-1 left-1 text-xs bg-black/20 px-1 rounded">
                            {span.colSpan}×{span.rowSpan}
                          </div>
                        )}
                        
                        <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-600 font-medium">
                  Template: {gridTemplate === "equal" ? `${columns}×${rows}` : "Custom"} • 
                  Gap: {gap}px • Items: {items} • Flow: {autoFlow}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Item Controls & CSS */}
          <div className="space-y-6">
            {/* Item Controls */}
            {selectedItem !== null && (
              <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  🎯 Item #{selectedItem + 1} Controls
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={getItemColor(selectedItem)}
                        onChange={(e) => setItemColors(prev => ({
                          ...prev,
                          [selectedItem]: e.target.value
                        }))}
                        className="w-12 h-10 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                      <button
                        onClick={() => {
                          const newColors = { ...itemColors };
                          delete newColors[selectedItem];
                          setItemColors(newColors);
                        }}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all text-sm font-medium"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Column Span: {getItemSpan(selectedItem).colSpan}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max={columns}
                        value={getItemSpan(selectedItem).colSpan}
                        onChange={(e) => updateItemSpan(selectedItem, 'colSpan', Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Row Span: {getItemSpan(selectedItem).rowSpan}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max={rows}
                        value={getItemSpan(selectedItem).rowSpan}
                        onChange={(e) => updateItemSpan(selectedItem, 'rowSpan', Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const newSpans = { ...itemSpans };
                      delete newSpans[selectedItem];
                      setItemSpans(newSpans);
                    }}
                    className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
                  >
                    Reset Item Spans
                  </button>
                </div>
              </div>
            )}

            {/* CSS Output */}
            <div className="bg-slate-900/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-slate-700/20">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-white">📝 Generated CSS</h3>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 max-h-80 overflow-y-auto">
                <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                  <code className="text-blue-400">.grid-container</code> {`{`}
                  {'\n  '}<code className="text-emerald-400">display</code>: <code className="text-yellow-400">grid</code>;
                  {'\n  '}<code className="text-emerald-400">grid-template-columns</code>: <code className="text-yellow-400">{gridTemplate === "equal" ? `repeat(${columns}, 1fr)` : customColumns}</code>;
                  {'\n  '}<code className="text-emerald-400">grid-template-rows</code>: <code className="text-yellow-400">{gridTemplate === "equal" ? `repeat(${rows}, ${itemHeight}px)` : customRows}</code>;
                  {'\n  '}<code className="text-emerald-400">gap</code>: <code className="text-yellow-400">{gap}px</code>;
                  {alignment !== "center" && `\n  `}<code className="text-emerald-400">{alignment !== "center" ? "align-items" : ""}</code>{alignment !== "center" ? ": " : ""}<code className="text-yellow-400">{alignment !== "center" ? alignment : ""}</code>{alignment !== "center" ? ";" : ""}
                  {justifyContent !== "center" && `\n  `}<code className="text-emerald-400">{justifyContent !== "center" ? "justify-content" : ""}</code>{justifyContent !== "center" ? ": " : ""}<code className="text-yellow-400">{justifyContent !== "center" ? justifyContent : ""}</code>{justifyContent !== "center" ? ";" : ""}
                  {autoFlow !== "row" && `\n  `}<code className="text-emerald-400">{autoFlow !== "row" ? "grid-auto-flow" : ""}</code>{autoFlow !== "row" ? ": " : ""}<code className="text-yellow-400">{autoFlow !== "row" ? autoFlow : ""}</code>{autoFlow !== "row" ? ";" : ""}
                  {'\n'}{`}`}
                  
                  {Object.entries(itemSpans).length > 0 && (
                    <>
                      {'\n\n'}
                      {Object.entries(itemSpans).map(([index, span]) => (
                        <React.Fragment key={index}>
                          <code className="text-blue-400">.grid-item-{Number(index) + 1}</code> {`{`}
                          {span.colSpan > 1 && `\n  `}<code className="text-emerald-400">{span.colSpan > 1 ? "grid-column" : ""}</code>{span.colSpan > 1 ? ": " : ""}<code className="text-yellow-400">{span.colSpan > 1 ? `span ${span.colSpan}` : ""}</code>{span.colSpan > 1 ? ";" : ""}
                          {span.rowSpan > 1 && `\n  `}<code className="text-emerald-400">{span.rowSpan > 1 ? "grid-row" : ""}</code>{span.rowSpan > 1 ? ": " : ""}<code className="text-yellow-400">{span.rowSpan > 1 ? `span ${span.rowSpan}` : ""}</code>{span.rowSpan > 1 ? ";" : ""}
                          {'\n'}{`}`}{'\n\n'}
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}