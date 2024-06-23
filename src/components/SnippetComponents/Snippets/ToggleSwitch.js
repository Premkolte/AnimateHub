// Snippets/ToggleSwitch.js

export const toggleSwitchSnippets = [
    {
      title: 'Simple Toggle Switch',
      jsxCode: `(props) => (
        <label className="flex items-center space-x-2 cursor-pointer">
          <span className="text-gray-600">Toggle Switch:</span>
          <input type="checkbox" className="form-checkbox h-6 w-6 text-green-500" />
          <span className="text-green-500">Toggle</span>
        </label>
      )`,
      cssCode: `<style>
        .form-checkbox {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: 1px solid #ccc;
          border-radius: 9999px;
          display: inline-block;
          height: 1.5rem;
          width: 3rem;
          vertical-align: middle;
          transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          cursor: pointer;
        }
        .form-checkbox:checked {
          background-color: #4caf50;
          border-color: #4caf50;
        }
      </style>`
    },
    {
      title: 'Custom Toggle Switch',
      jsxCode: `(props) => (
        <label className="flex items-center space-x-2 cursor-pointer">
          <span className="text-gray-600">Custom Toggle:</span>
          <input type="checkbox" className="form-checkbox-custom" />
          <span className="custom-toggle-slider"></span>
        </label>
      )`,
      cssCode: `<style>
        .form-checkbox-custom {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: 2px solid #ccc;
          border-radius: 9999px;
          display: inline-block;
          height: 2rem;
          width: 4rem;
          vertical-align: middle;
          position: relative;
          cursor: pointer;
        }
        .custom-toggle-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          border-radius: 9999px;
          transition: 0.4s;
        }
        .form-checkbox-custom:checked + .custom-toggle-slider {
          background-color: #2196f3;
        }
      </style>`
    }
  ];
  