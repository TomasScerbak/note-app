import { useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  const handleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleFonts = () => {
    setFontFamily((prev) =>
      prev === "sans-serif" ? "monospace" : "sans-serif"
    );
  };

  document.querySelector("body").setAttribute("color-theme", theme);
  document.querySelector("body").setAttribute("font-family", fontFamily);

  return (
    <div>
      <button onClick={handleTheme}>{theme}</button>
      <button onClick={handleFonts}>{fontFamily}</button>
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
        repellat quod magnam sit possimus quibusdam eius consequuntur excepturi
        iusto? Laudantium voluptates voluptatum voluptate eveniet corrupti
        reiciendis quasi reprehenderit, quos doloremque!
      </h1>
    </div>
  );
}

export default App;
