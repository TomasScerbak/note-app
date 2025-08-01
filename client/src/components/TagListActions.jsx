import { Link } from "react-router";

import classes from "./TagListActions.module.css";
import ArroLeftIcon from "../assets/icon-arrow-left.svg";

const TagListActions = () => {
  return (
    <div className={classes.action__container}>
      <Link className={classes.go_back_container} to="/home/tag-list">
        <img className={classes.left_arrow} src={ArroLeftIcon} alt="All Tags" />
        <span className={classes.back_to_all_tags}>All Tags</span>
      </Link>
    </div>
  );
};

export default TagListActions;
