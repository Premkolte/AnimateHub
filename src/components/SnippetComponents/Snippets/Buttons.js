export const buttonSnippets = [
  {
    label: "Move Right",
    cssCode:
      '<button style="transform: translateX(5px); background-color: #271FE0; color: white; padding: 10px;">Move Right</button>',
    jsxCode:
      "<button className={`hover:translate-x-5 motion-reduce:hover:transform-none bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Right</button>",
  },
  {
    label: "Move Left",
    cssCode:
      '<button style="transform: translateX(-5px); background-color: #271FE0; color: white; padding: 10px;">Move Left</button>',
    jsxCode:
      "<button className={`hover:-translate-x-5 motion-reduce:hover:transform-none bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Left</button>",
  },
  {
    label: "Move Up",
    cssCode:
      '<button style="transform: translateY(-5px); background-color: #271FE0; color: white; padding: 10px;">Move Up</button>',
    jsxCode:
      "<button className={`hover:-translate-y-5 motion-reduce:hover:transform-none bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Up</button>",
  },
  {
    label: "Move Down",
    cssCode:
      '<button style="transform: translateY(5px); background-color: #271FE0; color: white; padding: 10px;">Move Down</button>',
    jsxCode:
      "<button className={`hover:translate-y-5 motion-reduce:hover:transform-none bg-[#271FE0] text-white py-2 px-4 rounded`}>Move Down</button>",
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
    cssCode: `<div style="display: flex; justify-content: center;">
      <button style="background-color: #3b82f6; color: white; padding: 10px; border: none; border-radius: 5px; margin-right: 5px;">Prev</button>
      <button style="background-color: #3b82f6; color: white; padding: 10px; border: none; border-radius: 5px;">Next</button>
    </div>`,
    jsxCode: `<div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md mr-2 hover:bg-blue-600 focus:outline-none">Prev</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">Next</button>
    </div>`,
  },
  {
    label: "Hover me",
    cssCode: `.button {
    padding: 1rem 2rem;
    z-index: 30;
    background-color: #f43f5e;
    border-radius: 0.375rem;
    color: white;
    position: relative;
    font-weight: 600;
    font-family: sans-serif;
    text-shadow: 3px 5px 2px #be123c;
    font-size: 1.5rem;
    overflow: hidden;
    transition: all 0.7s;
}

.button::after {
    content: '';
    z-index: -20;
    position: absolute;
    height: 0.25rem;
    width: 0.25rem;
    background-color: #7c2d12;
    left: 1.25rem;
    bottom: 0;
    border-radius: 0.375rem;
    transform: translateY(100%);
    transition: all 0.7s;
}

.button:hover::after {
    transform: scale(3) translateY(0);
    transition: all 0.7s;
}

.button:hover {
    text-shadow: 2px 2px 2px #fda4af;
}
`,
    jsxCode:
      '<button className="px-8 z-30 py-4 bg-rose-400 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl motion-reduce:transition-none motion-reduce:after:transition-none">Hover Me</button>',
  },
  {
    label: "Zoom out",
    cssCode: `<button style="background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.2s, transform 0.2s; outline: none;" onmouseover="this.style.backgroundColor='#2563eb'; this.style.transform='scale(1.1';" onmouseout="this.style.backgroundColor='#3b82f6'; this.style.transform='scale(1)'">Zoom out</button>`,
    jsxCode: `<button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:scale-110 motion-reduce:hover:transform-none focus:outline-none">Zoom out</button>`,
  },
  {
    label: "Zoom in",
    cssCode: `<button style="background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.2s, transform 0.2s; outline: none;" onmouseover="this.style.backgroundColor='#2563eb'; this.style.transform='scale(0.95)';" onmouseout="this.style.backgroundColor='#3b82f6'; this.style.transform='scale(1)'">Zoom in</button>`,
    jsxCode: `<button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:scale-95 motion-reduce:hover:transform-none focus:outline-none">Zoom in</button>`,
  },
  {
    label: "Bounce",
    cssCode: `.button {
    background-color: #22c55e;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    outline: none;
}

.button:hover {
    animation: bounce 0.2s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-0.25rem);
    }
}
`,
    jsxCode: `<button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md transform transition-all duration-200 focus:outline-none hover:animate-bounce motion-reduce:hover:animate-none">Bounce</button>`,
  },
  {
    label: "Rotate",
    cssCode:
      '<button style="background-color: #3b82f6; color: white; padding: 10px; border-radius: 5px; transition: transform 0.2s;">Rotate</button>',
    jsxCode:
      '<button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform duration-200 hover:rotate-12 motion-reduce:transition-none motion-reduce:hover:transform-none">Rotate</button>',
  },
  {
    label: "Expand",
    cssCode:
      '<button style="background-color: #a855f7; color: white; padding: 10px; border-radius: 5px;">Expand</button>',
    jsxCode:
      '<button className="bg-purple-500 text-white py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-110 motion-reduce:transition-none motion-reduce:hover:transform-none">Expand</button>',
  },
  {
    label: "Glow",
    cssCode:
      '<button style="background-color: #d97706; color: white; padding: 10px; border-radius: 5px;">Glow</button>',
    jsxCode:
      '<button className="bg-yellow-600 text-white py-2 px-4 rounded-lg transition-shadow duration-200 hover:shadow-lg hover:shadow-yellow-500 motion-reduce:transition-none">Glow</button>',
  },
  {
    label: "Slide",
    cssCode:
      '<button style="background-color: #4f46e5; color: white; padding: 10px; border-radius: 5px; transition: transform 0.2s;">Slide</button>',
    jsxCode:
      '<button className="bg-indigo-600 text-white py-2 px-4 rounded-lg transition-transform duration-200 hover:translate-x-3 motion-reduce:transition-none motion-reduce:hover:transform-none">Slide</button>',
  }
];