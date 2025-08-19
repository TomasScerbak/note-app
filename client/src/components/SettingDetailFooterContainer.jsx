import classes from "./SettingDetailFooterContainer.module.css";

const SettingDetailFooterContainer = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default SettingDetailFooterContainer;
