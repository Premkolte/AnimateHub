// Snippets/BadgeSnippets.js
export const badgeSnippets = [
    {
      title: "Simple Badge Snippet",
      jsxCode: `(props) => (
        <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          New
        </span>
      )`,
      cssCode: `<span style="display: inline-block; background-color: #3490dc; color: #fff; font-size: 12px; padding: 4px 8px; border-radius: 9999px;">
        New
      </span>`,
    },
    {
      title: "Button Badge Snippet",
      jsxCode: `(props) => (
        <button className="relative inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md">
          Messages
          <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            3
          </span>
        </button>
      )`,
      cssCode: `<button style="position: relative; display: inline-flex; align-items: center; padding: 8px 16px; background-color: #2d3748; color: #fff; border-radius: 5px;">
        Messages
        <span style="position: absolute; top: 0; right: 0; display: inline-block; background-color: #e3342f; color: #fff; font-size: 12px; padding: 4px 8px; border-radius: 9999px;">
          3
        </span>
      </button>`,
    },
  ];
  