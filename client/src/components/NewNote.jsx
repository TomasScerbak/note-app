import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";

const NewNote = () => {
  return (
    <div className={classes.note__container}>
      <NewNoteActions />
      <NoteHeader />
      <NoteBody />
    </div>
  );
};

export default NewNote;
