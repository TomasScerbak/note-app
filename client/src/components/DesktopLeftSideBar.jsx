import classes from "./DesktopLeftSideBar.module.css";

const DesktopLeftSideBar = ({ children }) => {
  return <div className={classes.desktop__left__sidebar}>{children}</div>;
};

export default DesktopLeftSideBar;
