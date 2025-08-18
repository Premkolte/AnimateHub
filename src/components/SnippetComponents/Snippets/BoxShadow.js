export const boxShadowSnippets = [
  {
    label: "Subtle Shadow",
    tags: ['shadow', 'ui', 'subtle', 'basic'],
    cssCode:
      '<div style="box-shadow: 0 2px 8px rgba(0,0,0,0.15); width: 120px; height: 120px; background-color: white; border-radius: 8px; margin: 20px auto;"></div>',
    jsxCode:
      '<div className="shadow-md w-32 h-32 bg-white rounded-lg my-6 mx-auto flex items-center justify-center text-gray-500">Subtle Shadow</div>',
  },
  {
    label: "Soft Glow",
    tags: ['shadow', 'ui', 'glow', 'colored'],
    cssCode:
      '<div style="box-shadow: 0 0 25px rgba(59, 130, 246, 0.6); width: 120px; height: 120px; background-color: white; border-radius: 8px; margin: 20px auto;"></div>',
    jsxCode:
      '<div className="shadow-[0_0_25px_rgba(59,130,246,0.6)] w-32 h-32 bg-white rounded-lg my-6 mx-auto flex items-center justify-center text-gray-500">Soft Glow</div>',
  },
  {
    label: "Inner Shadow",
    tags: ['shadow', 'ui', 'inner', 'inset'],
    cssCode:
      '<div style="box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4); width: 120px; height: 120px; background-color: white; border-radius: 8px; margin: 20px auto;"></div>',
    jsxCode:
      '<div className="shadow-inner shadow-gray-500/40 w-32 h-32 bg-white rounded-lg my-6 mx-auto flex items-center justify-center text-gray-500">Inner Shadow</div>',
  },
  {
    label: "Multiple Shadows",
    tags: ['shadow', 'ui', 'multiple', 'layered'],
    cssCode:
      '<div style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.3); width: 120px; height: 120px; background-color: white; border-radius: 8px; margin: 20px auto;"></div>',
    jsxCode:
      '<div className="shadow-[0_0_10px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.3)] w-32 h-32 bg-white rounded-lg my-6 mx-auto flex items-center justify-center text-gray-500">Multiple</div>',
  },
];