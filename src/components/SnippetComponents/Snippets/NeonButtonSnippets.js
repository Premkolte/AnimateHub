export const NeonButtonSnippets = [
  {
    title: "Neon Glow Button",
    jsxCode: `<button class="neon-button">Click Me</button>`,
    cssCode: `<style>
      .neon-button {
        font-size: 18px;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        color: white;
        background-color: transparent;
        text-transform: uppercase;
        letter-spacing: 2px;
        cursor: pointer;
        transition: 0.3s;
        outline: none;
        position: relative;
        overflow: hidden;
      }

      /* Light Mode (default) */
      .neon-button {
        box-shadow: 0 0 10px rgba(0, 128, 255, 0.6);
      }
      .neon-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          rgba(0, 128, 255, 0.5),
          rgba(0, 128, 255, 1)
        );
        transition: 0.5s;
      }
      .neon-button:hover::before {
        left: 100%;
      }
      .neon-button:hover {
        box-shadow: 0 0 20px rgba(0, 128, 255, 1);
      }

      /* Dark Mode */
      .dark .neon-button {
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
      }
      .dark .neon-button::before {
        background: linear-gradient(
          120deg,
          rgba(168, 85, 247, 0.5),
          rgba(168, 85, 247, 1)
        );
      }
      .dark .neon-button:hover {
        box-shadow: 0 0 20px rgba(168, 85, 247, 1);
      }
    </style>`,
  },
];
