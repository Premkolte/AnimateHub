export const RippleEffectButtonSnippets = [
  {
    title: "Ripple Effect Button",
    jsxCode: `<button className="ripple-button">Click Me</button>`,
    cssCode: `
      .ripple-button {
        position: relative;
        overflow: hidden;
        background: #3498db;
        color: white;
        padding: 12px 24px;
        font-size: 18px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        outline: none;
      }

      .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        border-radius: 50%;
        animation: ripple-animation 0.6s linear;
      }

      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `,
  },
];
