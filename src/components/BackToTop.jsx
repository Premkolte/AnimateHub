import React, { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 205);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M12 5.5l-6.5 6.5 1.4 1.4L12 8.3l5.1 5.1 1.4-1.4L12 5.5z" />
      </svg>
    </button>
  );
};

export default BackToTop;
