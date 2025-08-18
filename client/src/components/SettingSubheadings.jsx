import classes from "./SettingSubheadings.module.css";

const SettingSubheadings = ({ settingLabel, settingSubLabel }) => {
  return (
    <div>
      <h1 className={classes.setting__label}>{settingLabel}</h1>
      <p className={classes.setting__sublabel}>{settingSubLabel}</p>
    </div>
  );
};

export default SettingSubheadings;
