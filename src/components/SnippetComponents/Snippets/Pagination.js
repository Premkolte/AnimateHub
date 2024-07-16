export const paginationSnippets = [
    {
      label: "Basic Pagination",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">1</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">2</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="page-link py-2 px-4 m-1 border border-gray-300">1</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300">2</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300">3</button>
        </div>
      `,
    },
    {
      label: "Advanced Pagination",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd; background-color: #007bff; color: white;">1</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">2</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="page-link py-2 px-4 m-1 border border-gray-300 bg-blue-500 text-white">1</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300">2</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300">3</button>
        </div>
      `,
    },
    {
      label: "Rounded Pagination",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd; border-radius: 50%;">1</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd; border-radius: 50%;">2</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd; border-radius: 50%;">3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="page-link py-2 px-4 m-1 border border-gray-300 rounded-full">1</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300 rounded-full">2</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300 rounded-full">3</button>
        </div>
      `,
    },
    {
      label: "Colored Pagination",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd; background-color: #28a745; color: white;">1</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">2</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #ddd;">3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="page-link py-2 px-4 m-1 border border-gray-300 bg-green-500 text-white">1</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300">2</button>
          <button className="page-link py-2 px-4 m-1 border border-gray-300">3</button>
        </div>
      `,
    },
    {
      label: "Outlined Pagination",
      cssCode: `
        <div style="display: flex; list-style: none; padding: 0;">
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #007bff; color: #007bff;">1</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #007bff; color: #007bff;">2</a>
          <a href="#" class="page-link" style="padding: 8px 16px; margin: 4px; border: 1px solid #007bff; color: #007bff;">3</a>
        </div>
      `,
      jsxCode: `
        <div className="flex list-none p-0">
          <button className="page-link py-2 px-4 m-1 border border-blue-500 text-blue-500">1</button>
          <button className="page-link py-2 px-4 m-1 border border-blue-500 text-blue-500">2</button>
          <button className="page-link py-2 px-4 m-1 border border-blue-500 text-blue-500">3</button>
        </div>
      `,
    },
    // Add more pagination snippets here as needed
  ];
  