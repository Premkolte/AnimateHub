// Assuming this is in a file named `boxShadowSnippets.js` or similar
export const boxShadowSnippets = [
    {
      label: "Subtle Shadow",
      cssCode:
        '<div style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 100px; height: 100px;"></div>',
      jsxCode:
        '<div className="shadow-md w-32 h-32 bg-white"></div>',
    },
    {
      label: "Soft Glow",
      cssCode:
        '<div style="box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); width: 100px; height: 100px;"></div>',
      jsxCode:
        '<div className="shadow-lg w-32 h-32 bg-white"></div>',
    },
    {
      label: "Inner Shadow",
      cssCode:
        '<div style="box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); width: 100px; height: 100px;"></div>',
      jsxCode:
        '<div className="shadow-inner w-32 h-32 bg-white"></div>',
    },
    {
      label: "Multiple Shadows",
      cssCode:
        '<div style="box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 2px 10px rgba(0, 0, 0, 0.1); width: 100px; height: 100px;"></div>',
      jsxCode:
        '<div className="shadow-xs shadow-md w-32 h-32 bg-white"></div>',
    },
  ];
  