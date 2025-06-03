import classes from "./NoteBody.module.css";

const NoteBody = () => {
  return (
    <textarea placeholder="Start typing your note here…" className={classes.note__body__input}></textarea>
  );
};

export default NoteBody;
