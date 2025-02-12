// Snippets/GlowingBorderInput.js

export const glowingBorderInputSnippet = [
    {
      title: "Glowing Border Input",
      jsxCode: `(props) => (
        <input type="text" className="glowing-input" placeholder="Enter text..." />
      )`,
      cssCode: `<style>
        .glowing-input {
          padding: 10px;
          font-size: 16px;
          border: 2px solid transparent;
          outline: none;
          background: black;
          color: white;
          transition: border-color 0.3s ease-in-out;
        }
        .glowing-input:focus {
          border-color: cyan;
          box-shadow: 0 0 8px cyan;
        }
      </style>`,
    },
  ];
  