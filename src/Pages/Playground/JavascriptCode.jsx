import React, { useState } from "react";
import { Copy, Check, Code, Play } from "lucide-react";

const JavascriptCode = () => {
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [copiedJs, setCopiedJs] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedJs(true);
    setTimeout(() => setCopiedJs(false), 1500);
  };

  const runCode = (isDarkMode) => {
  const source = `
    <html>
      <head>
        <style>
          body { 
            font-family: sans-serif; 
            padding: 10px; 
            background-color: ${isDarkMode ? '#111827' : '#ffffff'};
            color: ${isDarkMode ? '#ff99ccff' : '#000000'};
          }
        </style>
      </head>
      <body>
        <div id="output"></div>
        <script>
          const outputDiv = document.getElementById("output");
          const log = (...args) => {
            outputDiv.innerHTML += args.join(" ") + "<br/>";
          };
          console.log = log;
          try {
            ${js}
          } catch (err) {
            outputDiv.innerHTML += '<pre style="color:red;">' + err + '</pre>';
          }
        </script>
      </body>
    </html>
  `;
  setSrcDoc(source);
};



  return (
<div className="flex flex-col xl:flex-row w-full h-72 xl:h-96 gap-4 p-4 sm:p-6">
      {/* JS Editor */}
      <div className="flex flex-col w-full xl:w-1/2">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <h2 className="font-semibold text-sm sm:text-lg text-black dark:text-white">
              JavaScript
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(js)}
              className="p-1.5 sm:p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 rounded-lg backdrop-blur-sm transition-all duration-200 group/btn"
              title="Copy JavaScript"
            >
              {copiedJs ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 group-hover/btn:text-yellow-600" />
              )}
            </button>
            <button
              onClick={() => runCode(document.documentElement.classList.contains("dark"))}
              className="p-1.5 sm:p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center gap-1"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Run</span>
            </button>
          </div>
        </div>

        <div className="relative flex-1 rounded-lg sm:rounded-xl overflow-hidden shadow-xl border border-gray-300/50 dark:border-gray-600/50">
          <textarea
            value={js}
            onChange={(e) => setJs(e.target.value)}
            className="w-full h-full p-2 sm:p-4 bg-gray-900/95 backdrop-blur-sm text-yellow-400 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-200"
            placeholder="// Write your JavaScript here"
          />
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-30">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col w-full xl:w-1/2">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            <h2 className="font-semibold text-base sm:text-xl text-black dark:text-white">
  Output
</h2>

          </div>
        </div>
        <div className="relative flex-1 rounded-lg sm:rounded-xl overflow-hidden shadow-xl border border-gray-300/50 dark:border-gray-600/50">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            className="w-full h-full bg-white dark:bg-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

export default JavascriptCode;
