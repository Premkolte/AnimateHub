export const responsivenessSnippets = [
    {
      title: 'Responsive Grid Layout',
      jsxCode: `(props) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 p-4 text-white rounded-lg">Column 1</div>
          <div className="bg-green-500 p-4 text-white rounded-lg">Column 2</div>
          <div className="bg-red-500 p-4 text-white rounded-lg">Column 3</div>
        </div>
      )`,
      cssCode: `<div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
        <div style="background-color: #007bff; padding: 1rem; color: white; border-radius: 5px;">Column 1</div>
        <div style="background-color: #28a745; padding: 1rem; color: white; border-radius: 5px;">Column 2</div>
        <div style="background-color: #dc3545; padding: 1rem; color: white; border-radius: 5px;">Column 3</div>
      </div>
      <style>
        @media (min-width: 640px) {
          div { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          div { grid-template-columns: repeat(3, 1fr); }
        }
      </style>`
    },
    {
      title: 'Responsive Flex Layout',
      jsxCode: `(props) => (
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="bg-yellow-500 p-4 text-white rounded-lg mb-4 md:mb-0">Item 1</div>
          <div className="bg-purple-500 p-4 text-white rounded-lg mb-4 md:mb-0">Item 2</div>
          <div className="bg-pink-500 p-4 text-white rounded-lg">Item 3</div>
        </div>
      )`,
      cssCode: `<div style="display: flex; flex-direction: column;">
        <div style="background-color: #ffc107; padding: 1rem; color: white; border-radius: 5px; margin-bottom: 1rem;">Item 1</div>
        <div style="background-color: #6f42c1; padding: 1rem; color: white; border-radius: 5px; margin-bottom: 1rem;">Item 2</div>
        <div style="background-color: #e83e8c; padding: 1rem; color: white; border-radius: 5px;">Item 3</div>
      </div>
      <style>
        @media (min-width: 768px) {
          div { flex-direction: row; gap: 1rem; }
        }
      </style>`
    }
  ];
  