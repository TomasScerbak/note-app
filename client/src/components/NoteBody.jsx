import { useState, useEffect } from "react";

import classes from "./NoteBody.module.css";

import NewNoteFooter from "./NewNoteFooter";

const NoteBody = ({ clearValues, onSaveNote, handleClearValues, noteText, setNoteText, isDesktop }) => {
  const [placeholder, setPlaceholder] = useState("Start typing your note here…");

  useEffect(() => {
    if (clearValues) {
      setNoteText(""); // Reset title
      setPlaceholder("Start typing your note here…");
      handleClearValues(false);
    }
  }, [clearValues, handleClearValues, noteText, setNoteText]);
  return (
    <div className={classes.note__body}>
      <textarea
        onChange={(event) => setNoteText(event.target.value)}
        value={noteText}
        placeholder={placeholder}
        className={classes.note__body__input}
      ></textarea>
      {isDesktop ? <NewNoteFooter onSaveNote={onSaveNote} handleClearValues={handleClearValues} /> : null}
    </div>
  );
};

export default NoteBody;
