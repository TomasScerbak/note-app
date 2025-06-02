import { useState } from "react";

import classes from "./NoteHeaderInput.module.css";

const NoteHeaderInput = () => {
  const [placeholder, setPlaceholder] = useState("Enter a title...");

  return (
    <input
      type="text"
      onFocus={() => setPlaceholder("")}
      onBlur={(event) => (!event.target.value ? setPlaceholder("Enter a title...") : null)}
      placeholder={placeholder}
      className={classes.note__header__input}
    ></input>
  );
};

export default NoteHeaderInput;
