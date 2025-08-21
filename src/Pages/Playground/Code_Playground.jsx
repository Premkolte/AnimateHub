import { useState, useEffect } from "react";
import { Code, Eye, Play, Maximize2, Copy, Check, Sun, Moon } from "lucide-react";

export default function Playground() {
  const [html, setHtml] = useState(`
    <div class="welcome-container">
      <h1 class="welcome-text">
        <span class="word welcome-word">
          <span class="letter">W</span>
          <span class="letter">e</span>
          <span class="letter">l</span>
          <span class="letter">c</span>
          <span class="letter">o</span>
          <span class="letter">m</span>
          <span class="letter">e</span>
        </span>
        <span class="word to-word">
          <span class="letter">t</span>
          <span class="letter">o</span>
        </span>
        <span class="word animate-word">
          <span class="letter glow">A</span>
          <span class="letter glow">n</span>
          <span class="letter glow">i</span>
          <span class="letter glow">m</span>
          <span class="letter glow">a</span>
          <span class="letter glow">t</span>
          <span class="letter glow">e</span>
          <span class="letter glow">H</span>
          <span class="letter glow">u</span>
          <span class="letter glow">b</span>
        </span>
      </h1>
      <div class="sparkles">
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
      </div>
    </div>
  `);
  
  const [css, setCss] = useState(`
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .welcome-text {
      font-size: 4rem;
      font-weight: bold;
      text-align: center;
      margin: 0;
      padding: 20px;
      font-family: 'Arial Black', Arial, sans-serif;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      animation: textFloat 4s ease-in-out infinite;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5em;
    }

    .word {
      display: inline-flex;
    }

    .letter {
      display: inline-block;
      animation: bounce 2s infinite;
      color: #ffffff;
      transition: all 0.3s ease;
    }

    .letter:nth-child(1) { animation-delay: 0.1s; }
    .letter:nth-child(2) { animation-delay: 0.2s; }
    .letter:nth-child(3) { animation-delay: 0.3s; }
    .letter:nth-child(4) { animation-delay: 0.4s; }
    .letter:nth-child(5) { animation-delay: 0.5s; }
    .letter:nth-child(6) { animation-delay: 0.6s; }
    .letter:nth-child(7) { animation-delay: 0.7s; }
    .letter:nth-child(8) { animation-delay: 0.8s; }
    .letter:nth-child(9) { animation-delay: 0.9s; }
    .letter:nth-child(10) { animation-delay: 1s; }

    .letter.glow {
      background: linear-gradient(45deg, #4ecdc4, #45b7d1, #667eea, #764ba2);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: bounce 2s infinite, gradientShift 3s ease-in-out infinite;
      text-shadow: 0 0 30px rgba(70, 176, 209, 0.5);
    }

    .letter:hover {
      transform: scale(1.3) rotate(10deg);
      text-shadow: 0 0 30px currentColor;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) rotateZ(0deg);
      }
      40% {
        transform: translateY(-20px) rotateZ(5deg);
      }
      60% {
        transform: translateY(-10px) rotateZ(-3deg);
      }
    }

    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes textFloat {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .sparkles {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .sparkle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #ffffff;
      border-radius: 50%;
      animation: sparkleFloat 4s infinite linear;
      opacity: 0;
    }

    .sparkle:nth-child(1) {
      left: 20%;
      top: 20%;
      animation-delay: 0s;
      animation-duration: 3s;
    }

    .sparkle:nth-child(2) {
      left: 80%;
      top: 30%;
      animation-delay: 1s;
      animation-duration: 4s;
    }

    .sparkle:nth-child(3) {
      left: 60%;
      top: 70%;
      animation-delay: 2s;
      animation-duration: 3.5s;
    }

    .sparkle:nth-child(4) {
      left: 30%;
      top: 80%;
      animation-delay: 1.5s;
      animation-duration: 4.5s;
    }

    .sparkle:nth-child(5) {
      left: 90%;
      top: 60%;
      animation-delay: 0.5s;
      animation-duration: 3.8s;
    }

    @keyframes sparkleFloat {
      0% {
        opacity: 0;
        transform: translateY(0) scale(0);
      }
      10% {
        opacity: 1;
        transform: translateY(-10px) scale(1);
      }
      90% {
        opacity: 1;
        transform: translateY(-100px) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-120px) scale(0);
      }
    }

    /* Pulse effect for the entire container */
    .welcome-container::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 3s infinite;
    }

    @keyframes pulse {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.7;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.7;
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .welcome-text {
        font-size: 2.5rem;
        flex-direction: column;
        gap: 0.2em;
      }
    }

    @media (max-width: 480px) {
      .welcome-text {
        font-size: 1.8rem;
        flex-direction: column;
        gap: 0.1em;
      }
    }
  `);
  
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
      <div className="flex flex-col xl:flex-row h-auto xl:h-96 p-4 sm:p-6 gap-6 sm:gap-8 xl:gap-10 bg-blue-200/50 dark:bg-gray-900/50 mb-4 sm:mb-6">
        {/* HTML Editor */}
        <div className="flex flex-col w-full xl:w-1/2 h-64 sm:h-72 xl:h-full">
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
        <div className="flex flex-col w-full xl:w-1/2 h-64 sm:h-72 xl:h-full">
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