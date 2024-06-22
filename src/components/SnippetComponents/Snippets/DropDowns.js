export const dropDownSnippets = [
  {
    title: "Simple Dropdown Snippet",
    jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="">Select an option...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      )`,
    cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <select style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;">
          <option value="">Select an option...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>`,
  },
  {
    title: "Grouped Dropdown Snippet",
    jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            onChange={(e) => console.log(e.target.value)}
          >
            <optgroup label="Group 1">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </optgroup>
            <optgroup label="Group 2">
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </optgroup>
          </select>
        </div>
      )`,
    cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <select style="border: 1px solid #ccc; padding: 8px; border-radius: 4px;">
          <optgroup label="Group 1">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </optgroup>
        </select>
      </div>`,
  },
  {
    title: "Custom Styled Dropdown Snippet",
    jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <select
            className="border border-purple-500 rounded-lg px-4 py-2 bg-purple-50 text-purple-900 shadow-md focus:outline-none"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="">Select an option...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      )`,
    cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <select style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; background-color: #F3E5F5; color: #6A1B9A;">
          <option value="">Select an option...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>`,
  },
];
