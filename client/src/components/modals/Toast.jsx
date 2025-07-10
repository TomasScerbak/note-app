import ReactDOM from "react-dom";
import { useState } from "react";

import ButtonNoOutline from "../UI/ButtonNoOutline";

import classes from "./Toast.module.css";

import CheckMarkIcon from "../../assets/icon-checkmark.svg";
import CrossIcon from "../../assets/icon-cross.svg";

const Toast = ({ message, color }) => {
  const [isActive, setIsActive] = useState(true);

  const handleClose = () => {
    setIsActive(false);
  };
  return (
    <dialog open={isActive} className={classes.toast}>
      <div className={classes.toast__container}>
        <div className={classes.toast__container__left}>
          <img src={color === "positive" ? CheckMarkIcon : CrossIcon} className={classes.toast__image} />
          <p className={classes.toast_message}>{message}</p>
        </div>
        <div className={classes.toast__container__right}>
          <ButtonNoOutline
            type="button"
            hasImage={true}
            src={CrossIcon}
            size="small"
            variant="primary"
            title=""
            onClick={handleClose}
            btnImageClass={classes.close__toast__button}
          />
        </div>
      </div>
    </dialog>
  );
};

const DefaultToast = ({ message, color }) => {
  return ReactDOM.createPortal(<Toast message={message} color={color} />, document.querySelector("#modal"));
};

export default DefaultToast;
