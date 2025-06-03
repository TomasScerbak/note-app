import { useState } from "react";

import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";

const NewNote = () => {
  const [clearValues, setClearValues] = useState(false);

  const handleClearValues = () => {
    setClearValues((prev) => !prev);
  };

  return (
    <div className={classes.note__container}>
      <NewNoteActions handleClearValues={handleClearValues} />
      <NoteHeader clearValues={clearValues} handleClearValues={handleClearValues} />
      <NoteBody clearValues={clearValues} handleClearValues={handleClearValues} />
    </div>
  );
};

export default NewNote;
