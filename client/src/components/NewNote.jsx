import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";
import NoteHeader from "./NoteHeader";

const NewNote = () => {
  return (
    <div className={classes.note__container}>
      <NewNoteActions />
      <NoteHeader />
    </div>
  );
};

export default NewNote;
