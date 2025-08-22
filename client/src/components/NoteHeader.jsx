import { useTheme } from "../contexts/themeContext/index.jsx";

import NoteHeaderInput from "./UI/NoteHeaderInput";
import TagInput from "./UI/TagInput";

import classes from "./NoteHeader.module.css";
import TagIcon from "../assets/icon-tag.svg";
import TagIconDark from "../assets/icon-tag-dark-grey.svg";
import ClockIcon from "../assets/icon-clock.svg";
import ClockIconDark from "../assets/icon-clock-dark-grey.svg";

const NoteHeader = ({ clearValues, handleClearValues, title, setTitle, tags, setTags, updatedAt }) => {
  const { theme } = useTheme();
  return (
    <div className={classes.note__header_container}>
      <div className={classes.title__container}>
        <NoteHeaderInput
          title={title}
          setTitle={setTitle}
          clearValues={clearValues}
          handleClearValues={handleClearValues}
        />
      </div>
      <div className={classes.note__header__item}>
        <img className={classes.left__icon} src={theme === "light" ? TagIconDark : TagIcon} alt="tag icon" />
        <div className={classes.left__text}>Tags</div>
        <div className={classes.right__input}>
          <TagInput
            tags={tags}
            setTags={setTags}
            clearValues={clearValues}
            handleClearValues={handleClearValues}
          />
        </div>
      </div>
      <div className={classes.note__header__item}>
        <img
          className={classes.left__icon}
          src={theme === "light" ? ClockIconDark : ClockIcon}
          alt="clock icon"
        />
        <div className={classes.left__text}>Last Edited</div>
        <div className={classes.right__input}>{updatedAt}</div>
      </div>
    </div>
  );
};

export default NoteHeader;
