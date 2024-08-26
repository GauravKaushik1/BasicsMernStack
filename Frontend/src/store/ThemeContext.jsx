import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('orange');

  const changeTheme = (newTheme) => {
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };

  const changeAccentColor = (color) => {
    document.documentElement.classList.remove(accentColor);
    document.documentElement.classList.add(color);
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider value={{ changeTheme, changeAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
