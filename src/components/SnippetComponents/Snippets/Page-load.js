export const pageLoaderSnippets = [
  {
    label: "Basic Loader",
    cssCode: `
        <div style="border: 16px solid #f3f3f3; border-top: 16px solid #3498db; border-radius: 50%; width: 120px; height: 120px; animation: spin 2s linear infinite;"></div>
      `,
    jsxCode: `
        <div className="w-20 h-20 border-8 border-blue-400 border-solid rounded-full animate-spin"></div>
      `,
    cssAnimation: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
  },
  {
    label: "Circle Loader",
    cssCode: `
        <div style="width: 40px; height: 40px; border-radius: 50%; border: 4px solid #ccc; border-top-color: #3498db; animation: spin 1s ease-in-out infinite;"></div>
      `,
    jsxCode: `
        <div className="w-10 h-10 border-2 border-gray-300 border-solid rounded-full animate-spin"></div>
      `,
    cssAnimation: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
  },
  {
    label: "Pulse Loader",
    cssCode: `
        <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #3498db; animation: pulse 1s ease-in-out infinite;"></div>
      `,
    jsxCode: `
        <div className="w-12 h-12 rounded-full bg-blue-500 animate-pulse"></div>
      `,
    cssAnimation: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `,
  },
  {
    label: "Ring Loader",
    cssCode: `
        <div style="width: 50px; height: 50px; border-radius: 50%; border: 4px solid #3498db; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
      `,
    jsxCode: `
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin"></div>
      `,
    cssAnimation: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
  },
  {
    label: "Dot Loader",
    cssCode: `
      <div style="display: flex; justify-content: center; align-items: center;">
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #3498db; margin: 0 5px; animation: dot 1.2s infinite;"></div>
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #3498db; margin: 0 5px; animation: dot 1.2s infinite 0.4s;"></div>
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #3498db; margin: 0 5px; animation: dot 1.2s infinite 0.8s;"></div>
      </div>
    `,
    jsxCode: `
      <div className="flex justify-center items-center">
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mx-1 animate-pulse delay-0"></div>
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mx-1 animate-pulse delay-200"></div>
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mx-1 animate-pulse delay-400"></div>
      </div>
    `,
    cssAnimation: `
      /* Add this to your CSS for custom animation */
      @keyframes pulse {
        0%, 80%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        40% {
          transform: scale(1.5);
          opacity: 0.5;
        }
      }
    `,
  },
];

//   export default pageLoaderSnippets;
