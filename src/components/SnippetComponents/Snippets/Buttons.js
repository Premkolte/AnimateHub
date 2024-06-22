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
];
