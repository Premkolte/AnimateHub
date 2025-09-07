import React, { useState } from "react";

const defaultItems = [
  { label: "Item 1", order: 0, grow: 1, shrink: 1, basis: "auto", align: "auto", color: "#3b82f6" },
  { label: "Item 2", order: 0, grow: 1, shrink: 1, basis: "auto", align: "auto", color: "#22d3ee" },
  { label: "Item 3", order: 0, grow: 1, shrink: 1, basis: "auto", align: "auto", color: "#f59e42" },
];

const alignSelfOptions = [
  "auto",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
  "stretch",
];

export  default  function FlexboxPlayground() {
  const [direction, setDirection] = useState("row");
  const [wrap, setWrap] = useState("nowrap");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [gap, setGap] = useState(16);
  const [items, setItems] = useState(defaultItems);
  const [selected, setSelected] = useState(0);

  const handleItemChange = (index, key, value) => {
    setItems(items =>
      items.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
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
        basis: "auto",
        align: "auto",
        color: "#a78bfa",
      },
    ]);
  };

  const removeItem = idx => {
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
    background: "linear-gradient(135deg, #f0f4f8 0%, #c7d2fe 100%)",
    padding: "32px",
    borderRadius: "24px",
    minHeight: "260px",
    minWidth: "280px",
    marginBottom: "32px",
    boxShadow: "0 8px 32px rgba(59,130,246,0.06)",
    transition: "all 0.3s",
  };

  const selectedItem = items[selected];

  const itemStyle = item => ({
    order: item.order,
    flexGrow: item.grow,
    flexShrink: item.shrink,
    flexBasis: item.basis,
    alignSelf: item.align,
    background: item.color,
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
    borderRadius: 12,
    minWidth: 80,
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    transition: "all 0.2s",
    cursor: "pointer",
    outline: "2px solid transparent",
    outlineOffset: "-2px",
  });

  // CSS code generation
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

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 w-full max-w-7xl mx-auto">
      {/* Controls */}
      <div className="flex-1 space-y-10">
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-6 border border-gray-200/60 dark:border-gray-700/50">
          <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Container Controls</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Direction</label>
              <select value={direction} onChange={e => setDirection(e.target.value)} className="block mt-1 w-full rounded border p-2">
                <option value="row">row</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column">column</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Wrap</label>
              <select value={wrap} onChange={e => setWrap(e.target.value)} className="block mt-1 w-full rounded border p-2">
                <option value="nowrap">nowrap</option>
                <option value="wrap">wrap</option>
                <option value="wrap-reverse">wrap-reverse</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Justify</label>
              <select value={justify} onChange={e => setJustify(e.target.value)} className="block mt-1 w-full rounded border p-2">
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Align Items</label>
              <select value={align} onChange={e => setAlign(e.target.value)} className="block mt-1 w-full rounded border p-2">
                <option value="stretch">stretch</option>
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="baseline">baseline</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Gap (px)</label>
              <input type="number" min={0} max={64} value={gap} onChange={e => setGap(Number(e.target.value))} className="block mt-1 w-full rounded border p-2" />
            </div>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-6 border border-gray-200/60 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">Item Controls</h2>
            <div className="flex gap-2">
              <button
                onClick={addItem}
                disabled={items.length >= 5}
                className="bg-emerald-500 text-white px-3 py-1 rounded disabled:opacity-40"
              >
                + Item
              </button>
              <button
                onClick={() => removeItem(selected)}
                disabled={items.length <= 1}
                className="bg-rose-500 text-white px-3 py-1 rounded disabled:opacity-40"
              >
                − Item
              </button>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {items.map((item, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${selected === i ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                onClick={() => setSelected(i)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Order</label>
              <input type="number" value={selectedItem.order} min={-10} max={10}
                onChange={e => handleItemChange(selected, "order", Number(e.target.value))}
                className="block mt-1 w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="font-semibold">Flex Grow</label>
              <input type="number" value={selectedItem.grow} min={0} max={10}
                onChange={e => handleItemChange(selected, "grow", Number(e.target.value))}
                className="block mt-1 w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="font-semibold">Flex Shrink</label>
              <input type="number" value={selectedItem.shrink} min={0} max={10}
                onChange={e => handleItemChange(selected, "shrink", Number(e.target.value))}
                className="block mt-1 w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="font-semibold">Flex Basis</label>
              <input type="text" value={selectedItem.basis}
                onChange={e => handleItemChange(selected, "basis", e.target.value)}
                className="block mt-1 w-full rounded border p-2"
                placeholder="auto, 100px, 20%"
              />
            </div>
            <div>
              <label className="font-semibold">Align Self</label>
              <select value={selectedItem.align}
                onChange={e => handleItemChange(selected, "align", e.target.value)}
                className="block mt-1 w-full rounded border p-2"
              >
                {alignSelfOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold">Color</label>
              <input type="color" value={selectedItem.color}
                onChange={e => handleItemChange(selected, "color", e.target.value)}
                className="w-12 h-12 border-2 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview and CSS */}
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Live Preview</h2>
          <div style={containerStyle}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  ...itemStyle(item),
                  outlineColor: selected === i ? "#22d3ee" : "transparent",
                }}
                onClick={() => setSelected(i)}
                tabIndex={0}
                aria-label={item.label}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">CSS Output</h2>
          <div className="bg-gray-900 text-green-200 rounded-xl p-4 text-sm font-mono mb-2">
            <span className="text-yellow-300">{/* Container */}</span>
            <br />
            {containerCss.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
            <br />
            <span className="text-yellow-300">{/* {selectedItem.label} */}</span>
            <br />
            {itemCss.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}