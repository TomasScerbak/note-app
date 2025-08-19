/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const FontThemeContext = createContext();

export const FontThemeProvider = ({ children }) => {
  const [fontTheme, setFontTheme] = useState("sans-serif");

  useEffect(() => {
    const currentFont =
      getComputedStyle(document.documentElement).getPropertyValue("--app-font-family").trim() || "sans-serif";
    setFontTheme(currentFont);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--app-font-family", fontTheme);
  }, [fontTheme]);

  return (
    <FontThemeContext.Provider value={{ fontTheme, setFontTheme }}>{children}</FontThemeContext.Provider>
  );
};

export const useFontTheme = () => useContext(FontThemeContext);
