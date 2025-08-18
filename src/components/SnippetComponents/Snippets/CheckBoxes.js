export const checkBoxSnippets = [
  {
    title: "Simple Checkbox Snippet",
    tags: ['checkbox', 'form', 'input', 'basic'],
    jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={(e) => console.log(e.target.checked)}
            />
            <span className="ml-2">Option 1</span>
          </label>
        </div>
      )`,
    cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <label style="display: flex; align-items: center;">
          <input type="checkbox" style="margin-right: 10px;" />
          <span>Option 1</span>
        </label>
      </div>`,
  },
  {
    title: "Grouped Checkbox Snippet",
    tags: ['checkbox', 'form', 'input', 'group'],
    jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={(e) => console.log(e.target.checked)}
              />
              <span className="ml-2">Option 1</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={(e) => console.log(e.target.checked)}
              />
              <span className="ml-2">Option 2</span>
            </label>
          </div>
        </div>
      )`,
    cssCode: `<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
        <div>
          <label style="display: flex; align-items: center; margin-bottom: 10px;">
            <input type="checkbox" style="margin-right: 10px;" />
            <span>Option 1</span>
          </label>
          <label style="display: flex; align-items: center;">
            <input type="checkbox" style="margin-right: 10px;" />
            <span>Option 2</span>
          </label>
        </div>
      </div>`,
  },
];