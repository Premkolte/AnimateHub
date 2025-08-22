import React, { useState } from "react";
import { Copy, Check, Code, Play } from "lucide-react";

const JavascriptCode = () => {
  const [js, setJs] = useState("console.log('Hello, World!');\nconsole.log('Welcome to the JavaScript playground!');\n\n// Try writing some code here:");
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
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              padding: 16px; 
              margin: 0;
              background-color: ${isDarkMode ? '#0f172a' : '#f8fafc'};
              color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
              line-height: 1.6;
            }
            pre {
              background-color: ${isDarkMode ? '#1e293b' : '#f1f5f9'};
              padding: 12px;
              border-radius: 8px;
              border-left: 4px solid ${isDarkMode ? '#3b82f6' : '#2563eb'};
              margin: 8px 0;
            }
          </style>
        </head>
        <body>
          <div id="output"></div>
          <script>
            const outputDiv = document.getElementById("output");
            const log = (...args) => {
              const content = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(" ");
              outputDiv.innerHTML += '<pre>' + content + '</pre>';
            };
            console.log = log;
            console.error = (err) => {
              outputDiv.innerHTML += '<pre style="color: #ef4444; border-left-color: #ef4444;">' + err + '</pre>';
            };
            try {
              ${js}
            } catch (err) {
              console.error('Error: ' + err.message);
            }
          </script>
        </body>
      </html>
    `;
    setSrcDoc(source);
  };

  return (
    <div className="w-full max-h-max bg-transparent p-4 sm:p-6 lg:p-8">
      {/* Run Button - Top Center */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => runCode(document.documentElement.classList.contains("dark"))}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
        >
          <Play className="w-5 h-5" />
          <span className="text-lg">Run Code</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* JavaScript Editor */}
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full shadow-sm"></div>
              <h2 className="font-bold text-xl text-slate-800 dark:text-slate-200">
                JavaScript
              </h2>
            </div>
            <button
              onClick={() => copyToClipboard(js)}
              className="p-3 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-xl backdrop-blur-sm transition-all duration-200 shadow-md hover:shadow-lg group"
              title="Copy JavaScript"
            >
              {copiedJs ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <Copy className="w-5 h-5 text-amber-500 group-hover:text-amber-600" />
              )}
            </button>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            <textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              className="w-full h-64 p-6 bg-slate-900/95 backdrop-blur-sm text-amber-300 font-mono text-sm lg:text-base resize-none focus:outline-none focus:ring-4 focus:ring-amber-400/30 transition-all duration-200 leading-relaxed"
              placeholder=""
            />
            <div className="absolute top-4 right-4 opacity-30">
              <Code className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
              <h2 className="font-bold text-xl text-slate-800 dark:text-slate-200 my-2">
                Output
              </h2>
            </div>
          </div>
          
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              className="w-full h-64 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800"
            />
            {!srcDoc && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Click "Run Code" to see output
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavascriptCode;