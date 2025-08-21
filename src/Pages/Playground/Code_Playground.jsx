import { useState, useEffect } from "react";
import { Code, Eye, Play, Maximize2, Copy, Check, Sun, Moon } from "lucide-react";

export default function Playground() {
  const [html, setHtml] = useState("<h1>Welcome to AnimateHub</h1>");
  const [css, setCss] = useState("h1 { color: Blue; text-align: center; }");
  const [srcDoc, setSrcDoc] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [previewTheme, setPreviewTheme] = useState('light');

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'html') {
        setCopiedHtml(true);
        setTimeout(() => setCopiedHtml(false), 2000);
      } else {
        setCopiedCss(true);
        setTimeout(() => setCopiedCss(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const themeStyles = previewTheme === 'dark' ? `
        body { 
          background-color: #1a1a1a; 
          color: #ffffff; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 8px;
        }
        * { color: inherit; }
      ` : `
        body { 
          background-color: #ffffff; 
          color: #000000; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 8px;
        }
        * { color: inherit; }
      `;
      
      setSrcDoc(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              ${themeStyles}
              ${css}
            </style>
          </head>
          <body>${html}</body>
        </html>
      `);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html, css, previewTheme]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <header className="py-3 px-3 sm:py-6 sm:px-6 text-center bg-white/90 backdrop-blur-sm text-black dark:bg-gray-800/90 dark:text-white shadow-xl border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Code className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
            <span className="hidden sm:inline">React HTML & CSS Playground</span>
            <span className="sm:hidden">HTML & CSS Playground</span>
          </h1>
        </div>
      </header>

      {/* Enhanced Preview Section - Now on Top */}
      <div className="h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[480px] 2xl:h-[560px] mx-2 sm:mx-4 mt-4 sm:mt-6 mb-8 sm:mb-12 lg:mb-20 xl:mb-28 2xl:mb-32 relative group">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="font-semibold text-sm sm:text-lg text-black dark:text-white">Live Preview</h2>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
              className="p-1.5 sm:p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 rounded-lg backdrop-blur-sm transition-all duration-200"
              title={`Switch to ${previewTheme === 'light' ? 'dark' : 'light'} theme`}
            >
              {previewTheme === 'light' ? (
                <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 sm:p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        <div className={`h-full rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-300/50 dark:border-gray-600/50 relative ${
          previewTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Browser-like header */}
          <div className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-2 sm:px-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white dark:bg-gray-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                <Eye className="w-2 h-2 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">Preview</span>
              </div>
            </div>
          </div>
          
          <iframe
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            title="output"
            className={`w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] ${previewTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
          />
        </div>
      </div>

      {/* Enhanced Editor Section - Now at Bottom */}
      <div className="flex flex-col md:flex-row h-auto md:h-64 lg:h-72 xl:h-96 p-4 sm:p-6 gap-6 sm:gap-8 md:gap-10 bg-blue-200/50 dark:bg-gray-900/50 mb-4 sm:mb-6">
        {/* HTML Editor */}
        <div className="flex flex-col w-full md:w-1/2 h-64 sm:h-72 md:h-full">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
              <h2 className="font-semibold text-sm sm:text-lg text-black dark:text-white">HTML</h2>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 transition-opacity duration-200">
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">
                Structure
              </div>
              <button
                onClick={() => copyToClipboard(html, 'html')}
                className="p-1.5 sm:p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 rounded-lg backdrop-blur-sm transition-all duration-200 group/btn"
                title="Copy HTML"
              >
                {copiedHtml ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 group-hover/btn:text-orange-600" />
                )}
              </button>
            </div>
          </div>
          <div className="relative flex-1 rounded-lg sm:rounded-xl overflow-hidden shadow-xl border border-gray-300/50 dark:border-gray-600/50">
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="w-full h-full p-2 sm:p-4 bg-gray-900/95 backdrop-blur-sm text-green-400 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-200"
              placeholder="<!-- Write your HTML here -->"
            />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-30">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            </div>
          </div>
        </div>

        {/* CSS Editor */}
        <div className="flex flex-col w-full md:w-1/2 h-64 sm:h-72 md:h-full">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
              <h2 className="font-semibold text-sm sm:text-lg text-black dark:text-white">CSS</h2>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 transition-opacity duration-200">
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">
                Styling
              </div>
              <button
                onClick={() => copyToClipboard(css, 'css')}
                className="p-1.5 sm:p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 rounded-lg backdrop-blur-sm transition-all duration-200 group/btn"
                title="Copy CSS"
              >
                {copiedCss ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 group-hover/btn:text-blue-600" />
                )}
              </button>
            </div>
          </div>
          <div className="relative flex-1 rounded-lg sm:rounded-xl overflow-hidden shadow-xl border border-gray-300/50 dark:border-gray-600/50">
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="w-full h-full p-2 sm:p-4 bg-gray-900/95 backdrop-blur-sm text-blue-400 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
              placeholder="/* Write your CSS here */"
            />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-30">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="p-2 sm:p-4 text-center text-xs sm:text-sm bg-gray-800/90 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-300">
          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          <span>Built with</span>
          <span className="text-red-400">❤️</span>
          <span className="hidden xs:inline">in</span>
          <span>React</span>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}