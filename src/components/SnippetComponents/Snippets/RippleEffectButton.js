// Snippets/RippleEffectButton.js

export const rippleEffectButtonSnippet = [
    {
      title: "Ripple Effect Button",
      jsxCode: `(props) => (
        <button className="ripple-button">Click Me</button>
      )`,
      cssCode: `<style>
        .ripple-button {
          position: relative;
          overflow: hidden;
        }
        .ripple-button::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      </style>`,
    },
  ];
  