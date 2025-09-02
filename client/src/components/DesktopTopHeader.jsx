import classes from "./DesktopTopHeader.module.css";

const DesktopTopHeader = ({ children }) => {
  return <div className={classes.desktop__top__header}>{children}</div>;
};

export default DesktopTopHeader;
