import classes from "./PasswordInfoMessage.module.css";

import InfoIcon from "../../assets/icon-info.svg";

const PasswordInfoMessage = () => {
  return (
    <div className={classes.info__container}>
      <img className={classes.info__image} src={InfoIcon} alt="" />
      <p className={classes.info__text}>At least 8 characters</p>
    </div>
  );
};

export default PasswordInfoMessage;
