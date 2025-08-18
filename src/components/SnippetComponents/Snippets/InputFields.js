export const inputFieldSnippets = [
  {
    title: "Basic Input Field",
    tags: ['input', 'form', 'basic'],
    jsxCode: `(props) => (
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter text..."
        />
      )`,
    cssCode: `<input type="text" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;" placeholder="Enter text..." />`,
  },
  {
    title: "Password Input Field",
    tags: ['input', 'form', 'password', 'secure'],
    jsxCode: `(props) => (
        <input
          type="password"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter password..."
        />
      )`,
    cssCode: `<input type="password" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;" placeholder="Enter password..." />`,
  },
  {
    title: "Search Input Field",
    tags: ['input', 'form', 'search'],
    jsxCode: `(props) => (
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Search..."
        />
      )`,
    cssCode: `<input type="text" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;" placeholder="Search..." />`,
  },
];