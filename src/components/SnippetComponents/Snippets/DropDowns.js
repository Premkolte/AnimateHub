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
  {
    title: "Dropdown on hover",
    jsxCode: `(props) => (
      <div className="relative inline-block text-left">
    <div className="group">
        <button
            type="button"
            className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        >
            Open Menu
        </button>

        {/* Dropdown menu */}
        <div className="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
            </div>
        </div>
    </div>
</div>
)`,
    cssCode: `<div style="position: relative; display: inline-block; text-align: left;">
    <div style="display: inline-block;">
        <button type="button"
            style="display: inline-flex; justify-content: center; align-items: center; width: 100%; padding: 8px 16px; font-size: 14px; font-weight: 500; color: white; background-color: #2d3748; border: none; cursor: pointer; transition: background-color 0.3s;"
            onmouseover="this.style.backgroundColor='#4a5568'" onmouseout="this.style.backgroundColor='#2d3748'">
            Open Menu
        </button>

        <!-- Dropdown menu -->
        <div style="position: absolute; left: 0; width: 160px; margin-top: 4px; background-color: white; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); opacity: 0; visibility: hidden; transition: opacity 0.3s;"
            onmouseover="this.style.opacity='1'; this.style.visibility='visible'" onmouseout="this.style.opacity='0'; this.style.visibility='hidden'">
            <div style="padding: 4px 0;">
                <a href="#" style="display: block; padding: 8px 16px; font-size: 14px; color: #4a5568; text-decoration: none; transition: background-color 0.3s;"
                   onmouseover="this.style.backgroundColor='#f7fafc'" onmouseout="this.style.backgroundColor='white'">Option 1</a>
                <a href="#" style="display: block; padding: 8px 16px; font-size: 14px; color: #4a5568; text-decoration: none; transition: background-color 0.3s;"
                   onmouseover="this.style.backgroundColor='#f7fafc'" onmouseout="this.style.backgroundColor='white'">Option 2</a>
                <a href="#" style="display: block; padding: 8px 16px; font-size: 14px; color: #4a5568; text-decoration: none; transition: background-color 0.3s;"
                   onmouseover="this.style.backgroundColor='#f7fafc'" onmouseout="this.style.backgroundColor='white'">Option 3</a>
            </div>
        </div>
    </div>
</div>
`,
  },
];
