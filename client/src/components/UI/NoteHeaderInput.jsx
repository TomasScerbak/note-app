import { useState, useEffect } from "react";

import classes from "./NoteHeaderInput.module.css";

const NoteHeaderInput = ({ clearValues, handleClearValues }) => {
  const [placeholder, setPlaceholder] = useState("Enter a title...");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (clearValues) {
      setTitle(""); // Reset title
      setPlaceholder("Enter a title...");
      handleClearValues(false);
    }
  }, [clearValues, handleClearValues]);

  return (
    <input
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      type="text"
      onFocus={() => setPlaceholder("")}
      onBlur={(event) => (!event.target.value ? setPlaceholder("Enter a title...") : null)}
      placeholder={placeholder}
      className={classes.note__header__input}
    ></input>
  );
};

export default NoteHeaderInput;
