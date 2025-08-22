import { Link } from "react-router";
import { useTheme } from "../contexts/themeContext/index.jsx";

import ArrowLeftIcon from "../assets/icon-arrow-left.svg";
import ArrowLeftSecondaryIcon from "../assets/icon-arrow-left-secondary.svg";

import classes from "./SettingActions.module.css";

const SettingActions = () => {
  const { theme } = useTheme();
  return (
    <div className={classes.action__container}>
      <Link className={classes.go_back_container} to="/home/settings">
        <img
          className={classes.left_arrow}
          src={theme === "light" ? ArrowLeftSecondaryIcon : ArrowLeftIcon}
          alt="Settings"
        />
        <span className={classes.back_to_all_tags}>Settings</span>
      </Link>
    </div>
  );
};

export default SettingActions;
