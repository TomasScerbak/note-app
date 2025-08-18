import classes from "./SettingCard.module.css";

const SettingCard = ({ heading, description, img }) => {
  return (
    <div className={classes.settingCard}>
      <div className={classes.leftColumn}>
        <div className={classes.imageContainer}>
          <img src={img} alt={heading} />
        </div>
        <div>{description}</div>
      </div>
      <div className={classes.rightColumn}>
        <div>
          <button>btn test</button>
        </div>
      </div>
    </div>
  );
};

export default SettingCard;
