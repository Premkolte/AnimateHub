// Snippets/NeonButton.js

export const neonButtonSnippet = [
    {
      title: "Neon Button",
      jsxCode: `(props) => (
        <button className="neon-button">Click Me</button>
      )`,
      cssCode: `<style>
        .neon-button {
          background: black;
          color: white;
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 10px #0ff, 0 0 40px #0ff;
        }
        .neon-button:hover {
          box-shadow: 0 0 20px #0ff, 0 0 60px #0ff;
        }
      </style>`,
    },
  ];
  