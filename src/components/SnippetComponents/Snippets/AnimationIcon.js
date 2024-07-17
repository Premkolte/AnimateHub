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
      }`
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
      }`
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
      }`
    }
  ];
  