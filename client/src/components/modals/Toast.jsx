import ReactDOM from "react-dom";
import { useState } from "react";

import ButtonNoOutline from "../UI/ButtonNoOutline";

import classes from "./Toast.module.css";

import CheckMarkIcon from "../../assets/icon-checkmark.svg";
import CrossIcon from "../../assets/icon-cross.svg";

const Toast = ({ message, color }) => {
  const [isActive, setIsActive] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(false);

  const handleClose = () => {
    setHideAnimation(true);
    setTimeout(() => {
      setIsActive(false);
    }, 1000); // Match animation duration
  };

  return (
    isActive && (
      <dialog open className={`${classes.toast} ${hideAnimation ? classes.hide : ""}`}>
        <div className={classes.toast__container}>
          <div className={classes.toast__container__left}>
            <img
              src={color === "positive" ? CheckMarkIcon : CrossIcon}
              className={classes.toast__image}
              alt={color === "positive" ? "Success" : "Error"}
            />
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
    )
  );
};

const DefaultToast = ({ message, color }) => {
  return ReactDOM.createPortal(<Toast message={message} color={color} />, document.querySelector("#modal"));
};

export default DefaultToast;
