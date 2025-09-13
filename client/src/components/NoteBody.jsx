import { useState, useEffect } from "react";

import classes from "./NoteBody.module.css";

import NoteFooter from "./NoteFooter";

const NoteBody = ({
  clearValues,
  onSaveNote,
  handleClearValues,
  noteText,
  setNoteText,
  isDesktop,
  isNewNoteRequested,
}) => {
  const [placeholder, setPlaceholder] = useState("Start typing your note here…");
  console.log("isDesktop", isDesktop);
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
      {isDesktop ? (
        <NoteFooter
          onSaveNote={onSaveNote}
          handleClearValues={handleClearValues}
          isNewNoteRequested={isNewNoteRequested}
        />
      ) : null}
    </div>
  );
};

export default NoteBody;
