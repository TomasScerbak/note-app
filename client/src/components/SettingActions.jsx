import { Link } from "react-router";
import ArroLeftIcon from "../assets/icon-arrow-left.svg";

import classes from "./SettingActions.module.css";

const SettingActions = () => {
  return (
    <div className={classes.action__container}>
      <Link className={classes.go_back_container} to="/home/settings">
        <img className={classes.left_arrow} src={ArroLeftIcon} alt="Settings" />
        <span className={classes.back_to_all_tags}>Settings</span>
      </Link>
    </div>
  );
};

export default SettingActions;
