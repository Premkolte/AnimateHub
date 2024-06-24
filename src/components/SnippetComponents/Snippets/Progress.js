export const progressBarSnippets = [
    {
      label: "Default Progress Bar",
      cssCode:
        '<div style="width: 100%; height: 20px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">\n  <div style="width: 50%; height: 100%; background-color: #6b7280;"></div>\n</div>',
      jsxCode:
        '<div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">\n  <div className="h-full bg-gray-600" style={{ width: "50%" }}></div>\n</div>',
    },
    {
      label: "Custom Progress Bar (Blue)",
      cssCode:
        '<div style="width: 100%; height: 20px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">\n  <div style="width: 70%; height: 100%; background-color: #3b82f6;"></div>\n</div>',
      jsxCode:
        '<div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">\n  <div className="h-full bg-blue-500" style={{ width: "70%" }}></div>\n</div>',
    },
    {
      label: "Progress Bar with Animation",
      cssCode:
        '<div style="width: 100%; height: 20px; background-color: #e5e7eb; border-radius: 4px; overflow: hidden;">\n  <div style="width: 0%; height: 100%; background-color: #10b981; animation: progressAnimation 2s ease-out forwards;"></div>\n</div>\n\n@keyframes progressAnimation {\n  from { width: 0%; }\n  to { width: 80%; }\n}',
      jsxCode:
        '<div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">\n  <div className="h-full bg-green-500 animate-progress" style={{ width: "80%" }}></div>\n</div>',
    },
  ];
  