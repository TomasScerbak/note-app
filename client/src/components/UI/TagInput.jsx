// import { useState } from "react";

// import classes from "./TagInput.module.css";

// const TagInput = () => {
//   const [placeholder, setPlaceholder] = useState("Add tags separated by commas (e.g. Work, Planning)");

//   return (
//     <input
//       type="text"
//       onFocus={() => setPlaceholder("")}
//       onBlur={(event) =>
//         !event.target.value ? setPlaceholder("Add tags separated by commas (e.g. Work, Planning)") : null
//       }
//       placeholder={placeholder}
//       className={classes.note__tag__input}
//     ></input>
//   );
// };

// export default TagInput;

import { useState } from "react";
import classes from "./TagInput.module.css";

const TagInput = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <div onClick={() => setShowPlaceholder(false)} className={classes.input__container}>
      {showPlaceholder && (
        <div className={classes.placeholder}>Add tags separated by commas (e.g. Work, Planning)</div>
      )}
      <input
        type="text"
        onFocus={() => setShowPlaceholder(false)}
        onBlur={(event) => (!event.target.value ? setShowPlaceholder(true) : null)}
        className={`${classes.note__tag__input}  ${showPlaceholder ? classes.hidden : null}`}
      />
    </div>
  );
};

export default TagInput;
