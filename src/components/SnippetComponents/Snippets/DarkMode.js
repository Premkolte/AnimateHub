export const darkModeSnippets = [
    {
      title: 'Simple Dark Mode Toggle',
      tags: ['dark mode', 'toggle', 'ui', 'theme', 'basic'],
      jsxCode: `(props) => (
        <div className="flex items-center">
          <input type="checkbox" id="dark-mode-toggle" className="sr-only" onChange={props.onToggle} />
          <label htmlFor="dark-mode-toggle" className="cursor-pointer relative">
            
          </label>
        </div>
      )`,
      cssCode: `<style>
        input[type="checkbox"].sr-only {
          position: absolute;
          left: -9999px;
        }
        .dot {
          transform: translateX(0);
        }
        input[type="checkbox"]:checked + label .dot {
          transform: translateX(6px);
        }
        body.dark-mode {
          background-color: #333;
          color: #fff;
        }
      </style>`
    },
    {
      title: 'Dark Mode Toggle with Theme Switch',
      tags: ['dark mode', 'toggle', 'ui', 'theme', 'switch'],
      jsxCode: `(props) => (
        <div className="flex items-center">
          <input type="checkbox" id="dark-mode-toggle" className="sr-only" onChange={props.onToggle} />
          <label htmlFor="dark-mode-toggle" className="cursor-pointer relative">
            
          </label>
        </div>
      )`,
      cssCode: `<style>
        input[type="checkbox"].sr-only {
          position: absolute;
          left: -9999px;
        }
        .dot {
          transform: translateX(0);
        }
        input[type="checkbox"]:checked + label .dot {
          transform: translateX(6px);
        }
        body.dark-mode {
          background-color: #333;
          color: #fff;
        }
      </style>`
    }
  ];