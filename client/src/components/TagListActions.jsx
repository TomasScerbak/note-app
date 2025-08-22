import { Link } from "react-router";
import { useTheme } from "../contexts/themeContext/index.jsx";

import classes from "./TagListActions.module.css";
import ArroLeftIcon from "../assets/icon-arrow-left.svg";
import ArrowLeftSecondaryIcon from "../assets/icon-arrow-left-secondary.svg";

const TagListActions = () => {
  const { theme } = useTheme();
  return (
    <div className={classes.action__container}>
      <Link className={classes.go_back_container} to="/home/tag-list">
        <img
          className={classes.left_arrow}
          src={theme === "light" ? ArrowLeftSecondaryIcon : ArroLeftIcon}
          alt="All Tags"
        />
        <span className={classes.back_to_all_tags}>All Tags</span>
      </Link>
    </div>
  );
};

export default TagListActions;
