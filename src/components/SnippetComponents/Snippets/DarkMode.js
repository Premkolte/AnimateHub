export const darkModeSnippets = [
    {
      title: 'Simple Dark Mode Toggle',
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
  