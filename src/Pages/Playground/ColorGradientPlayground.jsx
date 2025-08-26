import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful"; // External lightweight color picker component
import { Copy } from "lucide-react"; // Copy icon for the button

/**
 * ColorGradientPlayground Component
 *
 * 🎨 Purpose:
 * - A playground to create beautiful linear gradients using **four colors**.
 * - Provides real-time preview of gradient changes.
 * - Lets users copy gradient CSS code with a single click.
 * - Uses TailwindCSS for modern UI styling.
 * - Includes popup color pickers that can be toggled open/close.
 */
const ColorGradientPlayground = () => {
  // ------------------- State Management -------------------

  // Gradient color states
  const [color1, setColor1] = useState("#c8264c"); // Default pink
  const [color2, setColor2] = useState("#140416"); // Default dark purple/black
  const [color3, setColor3] = useState("#1c92d2"); // Default steel blue
  const [color4, setColor4] = useState("#f2fcfe"); // Default light white-blue

  // State to track "Copy" button feedback
  const [copied, setCopied] = useState(false);

  // Boolean flags to show/hide each color picker
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);

  // ------------------- Refs for Detecting Outside Clicks -------------------

  // Each picker needs a ref to detect outside clicks
  const picker1Ref = useRef();
  const picker2Ref = useRef();
  const picker3Ref = useRef();
  const picker4Ref = useRef();

  // ------------------- Gradient Style -------------------

  /**
   * CSS object that defines the preview gradient.
   * Gradient angle = 135deg.
   * Includes smooth transition animation when colors update.
   */
  const gradientStyle = {
    background: `linear-gradient(135deg, ${color1}, ${color2}, ${color3}, ${color4})`,
    transition: "background 0.5s ease",
  };

  // ------------------- Copy Gradient Function -------------------

  /**
   * Copies the gradient CSS rule to clipboard.
   * Provides temporary "Copied!" feedback on the button.
   */
  const copyGradient = () => {
    // Write text to clipboard
    navigator.clipboard.writeText(
      `background: linear-gradient(135deg, ${color1}, ${color2}, ${color3}, ${color4});`
    );

    // Trigger feedback
    setCopied(true);

    // Reset feedback after 1.5 seconds
    setTimeout(() => setCopied(false), 1500);
  };

  // ------------------- Color Picker Button Subcomponent -------------------

  /**
   * ColorPickerButton Component
   *
   * Reusable UI component for each color circle + popup color picker.
   *
   * Props:
   * - label       → Text label (e.g., "Color 1")
   * - color       → Current selected color value
   * - setColor    → State setter function for color
   * - showPicker  → Boolean, controls picker visibility
   * - setShowPicker → Function to toggle picker visibility
   * - refProp     → Ref for detecting outside clicks
   */
  const ColorPickerButton = ({
    label,
    color,
    setColor,
    showPicker,
    setShowPicker,
    refProp,
  }) => (
    <div className="flex flex-col items-center gap-2 relative" ref={refProp}>
      {/* Label above the color circle */}
      <label className="text-gray-700 dark:text-gray-200 font-medium">
        {label}
      </label>

      {/* Circular color swatch (click to open/close picker) */}
      <div
        onClick={() => setShowPicker(!showPicker)}
        className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105"
        style={{ backgroundColor: color }}
      ></div>

      {/* Popup color picker (appears when showPicker=true) */}
      {showPicker && (
        <div
          className="absolute bottom-full mb-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
          style={{
            width: "220px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {/* Hex color picker from react-colorful */}
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </div>
  );

  // ------------------- Close Pickers on Outside Click -------------------

  /**
   * Effect hook:
   * Listens for clicks anywhere in the document.
   * If click happens outside a picker → close that picker.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (picker1Ref.current && !picker1Ref.current.contains(event.target))
        setShowPicker1(false);

      if (picker2Ref.current && !picker2Ref.current.contains(event.target))
        setShowPicker2(false);

      if (picker3Ref.current && !picker3Ref.current.contains(event.target))
        setShowPicker3(false);

      if (picker4Ref.current && !picker4Ref.current.contains(event.target))
        setShowPicker4(false);
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------- Component UI -------------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-pink-600"
        style={{
          boxShadow: "0 0 10px rgba(236, 72, 153, 0.4)", // Subtle pink glowing shadow
        }}
      >
        {/* ---------------- Left Column: Controls ---------------- */}
        <div className="flex flex-col gap-8 justify-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gradient Playground
          </h1>

          {/* Short description */}
          <p className="text-gray-600 dark:text-gray-300">
            Pick four colors and generate a stunning gradient. Copy the CSS in
            one click!
          </p>

          {/* Color pickers in one row */}
          <div className="flex gap-6">
            <ColorPickerButton
              label="Color 1"
              color={color1}
              setColor={setColor1}
              showPicker={showPicker1}
              setShowPicker={setShowPicker1}
              refProp={picker1Ref}
            />

            <ColorPickerButton
              label="Color 2"
              color={color2}
              setColor={setColor2}
              showPicker={showPicker2}
              setShowPicker={setShowPicker2}
              refProp={picker2Ref}
            />

            <ColorPickerButton
              label="Color 3"
              color={color3}
              setColor={setColor3}
              showPicker={showPicker3}
              setShowPicker={setShowPicker3}
              refProp={picker3Ref}
            />

            <ColorPickerButton
              label="Color 4"
              color={color4}
              setColor={setColor4}
              showPicker={showPicker4}
              setShowPicker={setShowPicker4}
              refProp={picker4Ref}
            />
          </div>

          {/* Copy CSS button */}
          <button
            onClick={copyGradient}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md
              ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 active:scale-95"
              }`}
          >
            {/* Dynamic button text */}
            {copied ? "Copied!" : "Copy CSS"}

            {/* Copy icon */}
            <Copy size={18} />
          </button>
        </div>

        {/* ---------------- Right Column: Preview ---------------- */}
        <div className="flex flex-col items-center gap-6">
          {/* Gradient preview box */}
          <div
            className="w-full h-64 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-500"
            style={gradientStyle}
          ></div>

          {/* CSS code preview */}
          <pre className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-100 to-pink-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-mono overflow-x-auto text-sm shadow-inner">
            {`background: linear-gradient(135deg, ${color1}, ${color2}, ${color3}, ${color4});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ColorGradientPlayground;
