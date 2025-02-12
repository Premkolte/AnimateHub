// Snippets/GlassmorphismCard.js

export const glassmorphismCardSnippet = [
    {
      title: "Glassmorphism Card",
      jsxCode: `(props) => (
        <div className="glass-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Glassmorphism Card</h2>
          <p className="text-gray-100">A beautiful frosted-glass effect.</p>
        </div>
      )`,
      cssCode: `<style>
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      </style>`,
    },
  ];
  