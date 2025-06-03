import { useState, useRef } from "react";
import classes from "./TagInput.module.css";

const TagInput = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const tagRef = useRef(null);
  return (
    <div onClick={() => setShowPlaceholder(false)} className={classes.input__container}>
      {showPlaceholder && (
        <div className={classes.placeholder}>Add tags separated by commas (e.g. Work, Planning)</div>
      )}
      <input
        ref={tagRef}
        type="text"
        onFocus={() => setShowPlaceholder(false)}
        onBlur={(event) => (!event.target.value ? setShowPlaceholder(true) : null)}
        className={`${classes.note__tag__input}  ${showPlaceholder ? classes.hidden : null}`}
      />
    </div>
  );
};

export default TagInput;
