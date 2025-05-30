import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";

const NewNote = () => {
  return (
    <div className={classes.note__container}>
      <NewNoteActions />
    </div>
  );
};

export default NewNote;
