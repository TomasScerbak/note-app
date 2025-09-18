import classes from "./DesktopSettingButton.module.css";

import SettingImage from "../assets/icon-settings.svg";
import SettingImageDark from "../assets/icon-settings-dark.svg";

import Button from "./UI/Button";

const DesktopSettingButton = ({ theme, handleSettingClicked }) => {
  return (
    <div className={classes.setting__button__container}>
      <Button
        type="button"
        hasImage={true}
        src={theme === "dark" ? SettingImage : SettingImageDark}
        size="tiny"
        variant="setting"
        onClick={handleSettingClicked}
      />
    </div>
  );
};

export default DesktopSettingButton;
