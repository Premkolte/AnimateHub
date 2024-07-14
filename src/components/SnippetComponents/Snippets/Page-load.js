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
    // Add more loader snippets as needed
  ];
  
//   export default pageLoaderSnippets;
  