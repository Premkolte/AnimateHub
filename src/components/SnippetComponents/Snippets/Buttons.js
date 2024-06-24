export const buttonSnippets = [
  {
    label: "Move Right",
    cssCode:
      '<button style="transform: translateX(5px); background-color: #271FE0; color: white; padding: 10px;">Move Right</button>',
    jsxCode:
      "<button className={`hover:translate-x-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Right</button>",
  },
  {
    label: "Move Left",
    cssCode:
      '<button style="transform: translateX(-5px); background-color: #271FE0; color: white; padding: 10px;">Move Left</button>',
    jsxCode:
      "<button className={`hover:-translate-x-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Left</button>",
  },
  {
    label: "Move Up",
    cssCode:
      '<button style="transform: translateY(-5px); background-color: #271FE0; color: white; padding: 10px;">Move Up</button>',
    jsxCode:
      "<button className={`hover:-translate-y-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Up</button>",
  },
  {
    label: "Move Down",
    cssCode:
      '<button style="transform: translateY(5px); background-color: #271FE0; color: white; padding: 10px;">Move Down</button>',
    jsxCode:
      "<button className={`hover:translate-y-5 bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Down</button>",
  },
  {
    label: "Loading Button",
    cssCode:
      '<button style="background-color: #3b82f6; color: white; padding: 10px; border: none; border-radius: 5px;">Loading...</button>',
    jsxCode:
      '<button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">Loading...</button>',
  },
  {
    label: "Download Button",
    cssCode:
      '<button style="background-color: #10b981; color: white; padding: 10px; border: none; border-radius: 5px;">Download</button>',
    jsxCode:
      '<button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">Download</button>',
  },
  {
    label: "Prev/Next Buttons",
    cssCode:
      `<div style="display: flex; justify-content: center;">
        <button style="background-color: #3b82f6; color: white; padding: 10px; border: none; border-radius: 5px; margin-right: 5px;">Prev</button>
        <button style="background-color: #3b82f6; color: white; padding: 10px; border: none; border-radius: 5px;">Next</button>
      </div>`,
    jsxCode:
      `<div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md mr-2 hover:bg-blue-600 focus:outline-none">Prev</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">Next</button>
      </div>`,
  },
];
