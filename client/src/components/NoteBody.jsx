import { useState, useEffect } from "react";

import classes from "./NoteBody.module.css";

const NoteBody = ({ clearValues, handleClearValues }) => {
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing your note here…");

  useEffect(() => {
    if (clearValues) {
      setText(""); // Reset title
      setPlaceholder("Start typing your note here…");
      handleClearValues(false);
    }
  }, [clearValues, handleClearValues]);
  return (
    <textarea
      onChange={(event) => setText(event.target.value)}
      value={text}
      placeholder={placeholder}
      className={classes.note__body__input}
    ></textarea>
  );
};

export default NoteBody;
