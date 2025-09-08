import React, { useState } from "react";

export default function GridPlayground() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(10);
  const [items, setItems] = useState(6);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 100px)`,
    gap: `${gap}px`,
    padding: "20px",
    background: "#f3f4f6",
    border: "2px dashed #9ca3af",
    borderRadius: "12px",
    minHeight: "300px",
  };

  const containerCss = `display: grid;
grid-template-columns: repeat(${columns}, 1fr);
grid-template-rows: repeat(${rows}, 100px);
gap: ${gap}px;`;

  const addItem = () => setItems(items + 1);
  const removeItem = () => setItems(items > 1 ? items - 1 : 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: Controls */}
        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold">🟦 Grid Playground</h1>

          <label className="block">
            Columns
            <input
              type="number"
              min="1"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Rows
            <input
              type="number"
              min="1"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Gap
            <input
              type="number"
              min="0"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </label>

          <div className="flex gap-2">
            <button
              onClick={addItem}
              className="px-3 py-1 bg-emerald-500 text-white rounded"
            >
              + Add Item
            </button>
            <button
              onClick={removeItem}
              className="px-3 py-1 bg-rose-500 text-white rounded"
            >
              − Remove Item
            </button>
          </div>

          <div className="bg-gray-100 p-3 rounded font-mono text-sm">
            <pre>{containerCss}</pre>
          </div>
        </div>

        {/* RIGHT: Preview */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">🔍 Live Preview</h2>
          <div style={containerStyle}>
            {Array.from({ length: items }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center bg-blue-500 text-white font-bold rounded"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
