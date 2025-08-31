import classes from "./TagHeader.module.css";

const TagHeader = () => {
  return (
    <p className={classes.tag__empty__text}>
      You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
    </p>
  );
};

export default TagHeader;
