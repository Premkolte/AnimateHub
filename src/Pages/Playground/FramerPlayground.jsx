import React, { useState } from "react";
import { motion } from "framer-motion";

const FramerPlayground = () => {
  // Default code snippet for the editor
  // Provides a live preview with gradient background, heading, paragraph, and clickable button

  const [code, setCode] = useState(
    `<div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: linear-gradient(135deg, #f66582ff 0%, #fda085 100%);
      color: #fff;
      font-family: Arial, sans-serif;
      text-align: center;
      border-radius: 12px;
      padding: 20px;


      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
      overflow: hidden;
  ">
    
    <h1 style="font-size: 2rem; margin-bottom: 10px; animation: fadeIn 1s ease-out;">Welcome to Framer Playground!</h1>
    <p style="font-size: 1rem; margin-bottom: 20px; animation: fadeIn 1.5s ease-out;">Edit this code and see live results instantly!</p>
    
    <button style="
        margin-bottom: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        
        background-color: #f53e50ff;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s;
    " 
    onclick="alert('Hello from Framer Playground!'); this.style.transform='scale(1.1)'; setTimeout(()=>{this.style.transform='scale(1)';},200);">
      Click Me
    </button>
    
    <div style="
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
    ">
      <div style="

          width: 60px; height: 60px; background: #6a11cb; border-radius: 50%;
          animation: bounce 1s infinite alternate;
      "></div>
      <div style="
          width: 60px; height: 60px; background: #f754c9ff; border-radius: 50%;
          animation: bounce 1s 0.2s infinite alternate;
      "></div>
      <div style="
          width: 60px; height: 60px; background: #f53e50ff; border-radius: 50%;
          animation: bounce 1s 0.4s infinite alternate;
      "></div>
    </div>


    <style>
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes bounce {
        0% { transform: translateY(0); }
        100% { transform: translateY(-15px); }
      }
    </style>

  </div>`
  );


  

  // Current device for preview
  const [device, setDevice] = useState("desktop");

  // Widths for different devices
  const deviceSizes = {
    desktop: "100%",
    tablet: "768px",
    phone: "375px",
  };

  const devices = ["desktop", "tablet", "phone"];

  return (
    <div className="flex flex-col space-y-6">
      {/* Main Heading */}
      <div className="text-center py-8 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-600 drop-shadow-md">
          Framer Playground
        </h1>
        <p className="mt-6 text-base text-gray-400 max-w-xl mx-auto">
          "Experiment with your HTML & CSS live and see instant results."
        </p>
      </div>

      {/* Code Editor Heading */}
      <div className="text-left px-2 md:px-6 lg:px-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-black">
          Code Editor (HTML / CSS)
        </h2>
      </div>

      {/* Code Editor Textarea */}
      <div className="px-2 md:px-6 lg:px-12">
        <textarea
          className="w-full h-64 p-6 border-0 rounded-xl bg-[#0f1b2b] text-[#f8f8f2] font-mono text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 resize-none leading-relaxed"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Device Switcher Buttons */}

      <div className="flex justify-center gap-4">
        {devices.map((d) => (
          <motion.button
            key={d}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-md ${
              device === d
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-400 hover:to-blue-400"
            }`}
            onClick={() => setDevice(d)}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Live Preview */}

      <motion.div
        className="border-2 border-gray-400 rounded-xl overflow-auto shadow-lg bg-white dark:bg-[#1a1f2b] transition-all duration-500"
        style={{
          width: deviceSizes[device],
          height: "500px",
        }}
        layout
      >
        <iframe
          title="preview"
          className="w-full h-full p-3 bg-white dark:bg-[#1a1f2b] rounded-xl"
          srcDoc={code}
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin"
        />
      </motion.div>
    </div>
  );
};

export default FramerPlayground;