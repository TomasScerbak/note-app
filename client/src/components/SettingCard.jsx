import classes from "./SettingCard.module.css";

import RadioButton from "./UI/RadioButtion";

const SettingCard = ({ heading, description, img, active, onClick }) => {
  return (
    <button className={`${classes.settingCard} ${active ? classes.active : ""}`} onClick={onClick}>
      <div className={classes.leftColumn}>
        <div className={classes.imageContainer}>
          <img className={classes.setting__image} src={img} alt={heading} />
        </div>
        <div className={classes.descriptionContainer}>
          <h4 className={classes.descriptionHeading}>{heading}</h4>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
      <div className={classes.rightColumn}>
        <RadioButton name="setting" value={heading} checked={active} onChange={() => {}} />
      </div>
    </button>
  );
};

export default SettingCard;
