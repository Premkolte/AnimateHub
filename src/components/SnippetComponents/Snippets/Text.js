// Assuming this is in a file named `textSnippets.js` or similar
export const textSnippets = [
    {
      label: "Fancy Heading",
      cssCode:
        '<h1 style="font-family: Arial, sans-serif; font-size: 36px; color: #333; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">Fancy Heading</h1>',
      jsxCode:
        '<h1 className="font-serif text-4xl text-gray-800 shadow-lg">Fancy Heading</h1>',
    },
    {
      label: "Italicized Paragraph",
      cssCode:
        '<p style="font-family: Helvetica, sans-serif; font-size: 18px; color: #555; font-style: italic;">This is an italicized paragraph.</p>',
      jsxCode:
        '<p className="font-sans text-lg text-gray-600 italic">This is an italicized paragraph.</p>',
    },
    {
      label: "Highlighted Text",
      cssCode:
        '<span style="background-color: yellow; padding: 2px;">Highlighted Text</span>',
      jsxCode:
        '<span className="bg-yellow-200 px-1">Highlighted Text</span>',
    },
    {
      label: "Underlined Text",
      cssCode:
        '<span style="text-decoration: underline;">Underlined Text</span>',
      jsxCode:
        '<span className="underline">Underlined Text</span>',
    },
  ];
  