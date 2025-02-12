import React, { useState } from "react";
import "./RippleEffect.css"; // Import the CSS file

const RippleEffect = ({ children, className, ...props }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      size,
      x,
      y,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((r) => r.id !== newRipple.id));
    }, 600); // Remove ripple after animation
  };

  return (
    <button className={`ripple-btn ${className}`} onClick={handleClick} {...props}>
      {children}
      <div className="ripple-container">
        {ripples.map(({ id, x, y, size }) => (
          <span key={id} className="ripple" style={{ left: x, top: y, width: size, height: size }} />
        ))}
      </div>
    </button>
  );
};

export default RippleEffect;
