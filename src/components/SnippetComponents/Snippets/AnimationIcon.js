export const animatedIconSnippets = [
  {
    title: "Bouncing Icon",
    jsxCode: `(props) => {
        return (
          <div className="bouncing-icon">
            <i className="fas fa-arrow-down"></i>
          </div>
        );
      }`,
    cssCode: `.bouncing-icon {
        display: inline-block;
        animation: bounce 2s infinite;
      }
  
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
      }`,
  },
  {
    title: "Rotating Icon",
    jsxCode: `(props) => {
        return (
          <div className="rotating-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
        );
      }`,
    cssCode: `.rotating-icon {
        display: inline-block;
        animation: rotate 2s infinite linear;
      }
  
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }`,
  },
  {
    title: "Pulsing Icon",
    jsxCode: `(props) => {
        return (
          <div className="pulsing-icon">
            <i className="fas fa-heart"></i>
          </div>
        );
      }`,
    cssCode: `.pulsing-icon {
        display: inline-block;
        animation: pulse 1.5s infinite;
      }
  
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }`,
  },
  {
    title: "Pinging Icon",
    jsxCode: `(props) => {
        return (
          <div className="pinging-icon">
            <i className="fas fa-circle"></i>
          </div>
        );
      }`,
    cssCode: `.pinging-icon {
        display: inline-block;
        animation: ping 1.5s infinite;
      }
  
      @keyframes ping {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }`,
  },
  {
    title: "Shaking Icon",
    jsxCode: `(props) => {
        return (
          <div className="shaking-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
        );
      }`,
    cssCode: `.shaking-icon {
        display: inline-block;
        animation: shake 1.5s infinite;
      }
  
      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-10px);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(10px);
        }
      }`,
  },
  {
    title: "Floating Icon",
    jsxCode: `(props) => {
        return (
          <div className="floating-icon">
            <i className="fas fa-battery-full"></i>
          </div>
        );
      }`,
    cssCode: `.floating-icon {
        display: inline-block;
        animation: float 1.5s infinite;
      }
  
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }`,
  },
  {
    title: "Spinning Icon",
    jsxCode: `(props) => {
        return (
          <div className="spinning-icon">
            <i className="fas fa-spinner"></i>
          </div>
        );
      }`,
    cssCode: `.spinning-icon {
        display: inline-block;
        animation: spin 1.5s infinite linear;
      }
  
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }`,
  },
  {
    title: "Flashing Icon",
    jsxCode: `(props) => {
        return (
          <div className="flashing-icon">
            <i className="fas fa-bell"></i>
          </div>
        );
      }`,
    cssCode: `.flashing-icon {
        display: inline-block;
        animation: flash 1.5s infinite;
      }
  
      @keyframes flash {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }`,
  },
];
