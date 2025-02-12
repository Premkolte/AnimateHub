import { useState, useEffect } from "react";

function RippleEffectButton({ children }) {
  const [ripple, setRipple] = useState([]);

  const addRipple = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;

    setRipple([...ripple, { x, y, size }]);

    setTimeout(() => {
      setRipple([]);
    }, 600);
  };

  return (
    <button
      className="relative overflow-hidden px-6 py-2 bg-blue-500 text-white rounded-lg"
      onClick={addRipple}
    >
      {children}
      <span className="absolute inset-0">
        {ripple.map((r, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white opacity-50 transform scale-0 animate-ripple"
            style={{
              width: r.size,
              height: r.size,
              top: r.y,
              left: r.x,
            }}
          />
        ))}
      </span>
    </button>
  );
}

export default RippleEffectButton;
