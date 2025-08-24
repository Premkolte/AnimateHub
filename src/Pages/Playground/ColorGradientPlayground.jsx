import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful"; // A lightweight color picker component
import { Copy } from "lucide-react"; // Icon for copy button

/**
 * ColorGradientPlayground Component
 * 
 * Purpose:
 * This component provides an interactive gradient playground where users can:
 * - Pick two colors using a full-featured color picker
 * - See the gradient applied in real-time
 * - Copy the CSS for the gradient with a single click
 * - Enjoy a modern UI with Tailwind styling and subtle animations
 */
const ColorGradientPlayground = () => {
  // State for the two gradient colors
  const [color1, setColor1] = useState("#c8264c"); // Default pink color
  const [color2, setColor2] = useState("#140416"); // Default dark color

  // State to indicate when the CSS has been copied
  const [copied, setCopied] = useState(false);

  // State to manage visibility of each color picker popup
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);

  // Refs to detect clicks outside the color picker popups
  const picker1Ref = useRef();
  const picker2Ref = useRef();

  /**
   * Gradient style object
   * 
   * This defines the linear gradient background for the preview box.
   * Includes a smooth transition when colors change.
   */
  const gradientStyle = {
    background: `linear-gradient(135deg, ${color1}, ${color2})`,
    transition: "background 0.5s ease",
  };

  /**
   * copyGradient Function
   * 
   * Copies the current gradient CSS to clipboard and triggers
   * a temporary "Copied!" feedback state.
   */
  const copyGradient = () => {
    navigator.clipboard.writeText(
      `background: linear-gradient(135deg, ${color1}, ${color2});`
    );
    setCopied(true);

    // Reset the copied state after 1.5 seconds
    setTimeout(() => setCopied(false), 1500);
  };

  /**
   * ColorPickerButton Component
   * 
   * Reusable component for each color selector.
   * Props:
   * - label: Label above the color circle
   * - color: Current color value
   * - setColor: Function to update color
   * - showPicker: Boolean to toggle picker visibility
   * - setShowPicker: Function to toggle picker visibility
   * - refProp: Reference to detect clicks outside
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
      {/* Label */}
      <label className="text-gray-700 dark:text-gray-200 font-medium">
        {label}
      </label>

      {/* Color circle */}
      <div
        onClick={() => setShowPicker(!showPicker)} // Toggle picker
        className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105"
        style={{ backgroundColor: color }} // Dynamic background color
      ></div>

      {/* Color picker popup */}
      {showPicker && (
        <div
          className="absolute bottom-full mb-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
          style={{
            width: "220px",
            maxHeight: "300px",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          <HexColorPicker
            color={color} // Current color
            onChange={setColor} // Update color dynamically
            style={{
              scrollbarWidth: "none", // Hide Firefox scrollbar
            }}
          />
          {/* Hide scrollbar for Chrome, Safari, Opera */}
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        </div>
      )}
    </div>
  );

  /**
   * Close pickers when clicking outside
   * 
   * This effect listens for mousedown events on the document.
   * If the click is outside a picker, it automatically closes that picker.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (picker1Ref.current && !picker1Ref.current.contains(event.target)) {
        setShowPicker1(false);
      }
      if (picker2Ref.current && !picker2Ref.current.contains(event.target)) {
        setShowPicker2(false);
      }
    };

    // Add listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      {/* Main Container */}
      <div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-pink-600"
        style={{
          boxShadow: "0 0 10px rgba(236, 72, 153, 0.4)", // Subtle pink shadow in all directions
        }}
      >
        {/* Left Column: Controls */}
        <div className="flex flex-col gap-8 justify-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gradient Playground
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300">
            Pick two colors with a full-featured color picker. Copy the CSS with
            one click!
          </p>

          {/* Color Pickers */}
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
          </div>

          {/* Copy CSS Button */}
          <button
            onClick={copyGradient}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md
              ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 active:scale-95"
              }`}
          >
            {copied ? "Copied!" : "Copy CSS"} <Copy size={18} />
          </button>
        </div>

        {/* Right Column: Gradient Preview */}
        <div className="flex flex-col items-center gap-6">
          {/* Gradient Display Box */}
          <div
            className="w-full h-64 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-500"
            style={gradientStyle} // Real-time gradient
          ></div>

          {/* Gradient CSS Code */}
          <pre className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-100 to-pink-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-mono overflow-x-auto text-sm shadow-inner">
            {`background: linear-gradient(135deg, ${color1}, ${color2});`}
          </pre>

          {/* Additional Notes Section */}
          {/* <div className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 font-sans text-sm">
            <p>
              This preview dynamically updates as you pick different colors.
              The "Copy CSS" button lets you easily use this gradient in your
              projects.
            </p>
            <p className="mt-2">
              Click outside the color picker popups to close them automatically.
            </p>
          </div> */}
        </div>

        {/* Footer / Tips Section */}
        {/* <div className="col-span-full mt-6 p-4 bg-pink-50 dark:bg-pink-900 rounded-lg text-pink-700 dark:text-pink-200 font-mono text-sm">
          <p>
            Tip: Use subtle gradients for background overlays to make UI
            elements pop. Avoid extremely harsh color contrasts for better UX.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ColorGradientPlayground;
