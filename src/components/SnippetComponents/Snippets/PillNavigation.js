export const pillNavigationSnippets = [
    {
      label: "Basic Pills",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="pill-link active" style="padding: 8px 16px; margin: 4px; background-color: #007bff; color: white;">Item 1</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px;">Item 2</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px;">Item 3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="pill-link py-2 px-4 m-1 bg-blue-500 text-white rounded-full">Item 1</button>
          <button className="pill-link py-2 px-4 m-1 rounded-full">Item 2</button>
          <button className="pill-link py-2 px-4 m-1 rounded-full">Item 3</button>
        </div>
      `,
    },
    {
      label: "Outlined Pills",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="pill-link active" style="padding: 8px 16px; margin: 4px; border: 1px solid #007bff; color: #007bff;">Item 1</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #007bff; color: #007bff;">Item 2</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #007bff; color: #007bff;">Item 3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="pill-link py-2 px-4 m-1 border border-blue-500 text-blue-500">Item 1</button>
          <button className="pill-link py-2 px-4 m-1 border border-blue-500 text-blue-500">Item 2</button>
          <button className="pill-link py-2 px-4 m-1 border border-blue-500 text-blue-500">Item 3</button>
        </div>
      `,
    },
    {
      label: "Rounded Pills",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="pill-link active" style="padding: 8px 16px; margin: 4px; border-radius: 50px; background-color: #28a745; color: white;">Item 1</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; border-radius: 50px;">Item 2</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; border-radius: 50px;">Item 3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="pill-link py-2 px-4 m-1 rounded-full bg-green-500 text-white">Item 1</button>
          <button className="pill-link py-2 px-4 m-1 rounded-full">Item 2</button>
          <button className="pill-link py-2 px-4 m-1 rounded-full">Item 3</button>
        </div>
      `,
    },
    {
      label: "Shadowed Pills",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="pill-link active" style="padding: 8px 16px; margin: 4px; background-color: #6c757d; color: white; box-shadow: 0 0 10px rgba(0,0,0,0.1);">Item 1</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; box-shadow: 0 0 5px rgba(0,0,0,0.1);">Item 2</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; box-shadow: 0 0 5px rgba(0,0,0,0.1);">Item 3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="pill-link py-2 px-4 m-1 bg-gray-600 text-white shadow-lg">Item 1</button>
          <button className="pill-link py-2 px-4 m-1 shadow-sm">Item 2</button>
          <button className="pill-link py-2 px-4 m-1 shadow-sm">Item 3</button>
        </div>
      `,
    },
    {
      label: "Gradient Pills",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="pill-link active" style="padding: 8px 16px; margin: 4px; background-image: linear-gradient(to right, #4e54c8, #8f94fb); color: white;">Item 1</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; background-image: linear-gradient(to right, #f12711, #f5af19); color: white;">Item 2</a>
          <a href="#" class="pill-link" style="padding: 8px 16px; margin: 4px; background-image: linear-gradient(to right, #f3904f, #3b4371); color: white;">Item 3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="pill-link py-2 px-4 m-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">Item 1</button>
          <button className="pill-link py-2 px-4 m-1 bg-gradient-to-r from-red-500 to-yellow-500 text-white">Item 2</button>
          <button className="pill-link py-2 px-4 m-1 bg-gradient-to-r from-orange-500 to-blue-800 text-white">Item 3</button>
        </div>
      `,
    },
  ];
  