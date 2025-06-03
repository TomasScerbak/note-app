import { useState } from "react";
import classes from "./TagInput.module.css";

const TagInput = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [tags, setTags] = useState([]);

  return (
    <div onClick={() => setShowPlaceholder(false)} className={classes.input__container}>
      {showPlaceholder && (
        <div className={classes.placeholder}>Add tags separated by commas (e.g. Work, Planning)</div>
      )}
      <input
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
