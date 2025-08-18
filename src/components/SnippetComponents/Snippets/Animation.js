// Snippets/Animation.js

export const animationSnippets = [
    {
      title: 'Pulse Animation',
      tags: ['animation', 'pulse', 'scale'],
      jsxCode: `(props) => (
        <div className="animate-pulse">
          <p className="text-lg font-bold">Pulse Animation Example</p>
          <p className="text-gray-600">This element pulses with a subtle scale animation.</p>
        </div>
      )`,
      cssCode: `<style>
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      </style>`
    },{
      title: 'Bounce Animation',
      tags: ['animation', 'bounce', 'transform'],
      jsxCode: `(props) => (
        <div className="animate-bounce">
          <p className="text-lg font-bold">Bounce Animation Example</p>
          <p className="text-gray-600">This element bounces up and down.</p>
        </div>
      )`,
      cssCode: `<style>
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      </style>`
    }
  ];