/* eslint-disable react-refresh/only-export-components */
// ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = document.documentElement.getAttribute("color-theme") || (prefersDark ? "dark" : "light");
    setTheme(current);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("color-theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
