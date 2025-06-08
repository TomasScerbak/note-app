import { useState, useEffect } from "react";

import classes from "./NoteBody.module.css";

const NoteBody = ({ clearValues, handleClearValues, noteText, setNoteText }) => {
  const [placeholder, setPlaceholder] = useState("Start typing your note here…");

  useEffect(() => {
    if (clearValues) {
      setNoteText(""); // Reset title
      setPlaceholder("Start typing your note here…");
      handleClearValues(false);
    }
  }, [clearValues, handleClearValues, noteText, setNoteText]);
  return (
    <textarea
      onChange={(event) => setNoteText(event.target.value)}
      value={noteText}
      placeholder={placeholder}
      className={classes.note__body__input}
    ></textarea>
  );
};

export default NoteBody;
