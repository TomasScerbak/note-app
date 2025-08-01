import classes from "../components/TagListHeaders.module.css";

const TagListHeaders = ({ tag }) => {
  return (
    <div>
      <h1 className={classes.taglist__heading}>
        Notes Taged: <span className={classes.taglist__heading__value}>{tag}</span>
      </h1>
      <p className={classes.taglist__subheading}>
        All notes with the <span className={classes.taglist__subheading__value}>{`"${tag}"`}</span> are shown
        here.
      </p>
    </div>
  );
};

export default TagListHeaders;
