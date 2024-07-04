// Snippets/ColorPickerSnippets.js
export const colorPickerSnippets = [
    {
      title: "Simple Color Picker",
      jsxCode: `(props) => (
        <input
          type="color"
          className="w-16 h-16 border-none"
          onChange={(e) => console.log(e.target.value)}
        />
      )`,
      cssCode: `<input
        type="color"
        style="width: 64px; height: 64px; border: none;"
        onchange="console.log(this.value)"
      />`,
    },
    {
      title: "Color Picker with Label",
      jsxCode: `(props) => (
        <div className="flex items-center space-x-4">
          <label htmlFor="colorPicker" className="text-sm font-medium">
            Choose Color:
          </label>
          <input
            type="color"
            id="colorPicker"
            className="w-16 h-16 border-none"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      )`,
      cssCode: `<div style="display: flex; align-items: center; gap: 16px;">
        <label for="colorPicker" style="font-size: 14px; font-weight: 500;">
          Choose Color:
        </label>
        <input
          type="color"
          id="colorPicker"
          style="width: 64px; height: 64px; border: none;"
          onchange="console.log(this.value)"
        />
      </div>`,
    },
    {
      title: "Advanced Color Picker",
      jsxCode: `(props) => {
        const [color, setColor] = React.useState("#000000");
        return (
          <div>
            <input
              type="color"
              value={color}
              className="w-16 h-16 border-none"
              onChange={(e) => setColor(e.target.value)}
            />
            <div
              className="w-16 h-16 mt-4"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        );
      }`,
      cssCode: `<div>
        <input
          type="color"
          value="#000000"
          style="width: 64px; height: 64px; border: none;"
          onchange="document.getElementById('colorDisplay').style.backgroundColor = this.value"
        />
        <div
          id="colorDisplay"
          style="width: 64px; height: 64px; margin-top: 16px; background-color: #000000;"
        ></div>
      </div>`,
    },
  ];
  