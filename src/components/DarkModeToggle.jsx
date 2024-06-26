import React, { useState, useEffect } from 'react';
import DarkReader from 'react-darkreader';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return <DarkReader dark={isDarkMode} onChange={setIsDarkMode} />;
};

export default DarkModeToggle;
