import { useState, useEffect } from "react";
import classes from "./TagInput.module.css";

const TagInput = ({ clearValues, handleClearValues, tags, setTags }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    if (clearValues) {
      setTags([]);
      setShowPlaceholder(true);
      handleClearValues(false);
    }
  }, [clearValues, handleClearValues, setTags]);

  return (
    <div onClick={() => setShowPlaceholder(false)} className={classes.input__container}>
      {showPlaceholder && (
        <div className={classes.placeholder}>Add tags separated by commas (e.g. Work, Planning)</div>
      )}
      <input
        value={tags}
        onChange={(event) => {
          setTags(event.target.value.split(",").map((tag) => tag.trim()));
        }}
        type="text"
        onFocus={() => setShowPlaceholder(false)}
        onBlur={(event) => {
          !event.target.value ? setShowPlaceholder(true) : null;
          setTags(event.target.value.split(",").map((tag) => tag.trim()));
        }}
        className={`${classes.note__tag__input}  ${showPlaceholder ? classes.hidden : null}`}
      />
    </div>
  );
};

export default TagInput;
