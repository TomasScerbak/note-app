import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import ButtonNoOutline from "../UI/ButtonNoOutline";

import classes from "./Toast.module.css";

import CheckMarkIcon from "../../assets/icon-checkmark.svg";
import CrossIcon from "../../assets/icon-cross.svg";

const Toast = ({ message, color, duration = 5000, onRemove }) => {
  // const [isActive, setIsActive] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(false);

  useEffect(() => {
    // Start fade-out 1s before auto-removal
    const startFadeOut = setTimeout(() => {
      setHideAnimation(true);
      // Remove toast after fade-out animation finishes
      const removeTimer = setTimeout(() => {
        () => onRemove();
      }, 1000); // match fadeOut duration
      return () => clearTimeout(removeTimer);
    }, duration - 1000);
    return () => clearTimeout(startFadeOut);
  }, [duration, onRemove]);

  const handleClose = () => {
    setHideAnimation(true);
  };

  return (
    <dialog open className={`${classes.toast} ${hideAnimation ? classes.hide : ""}`}>
      <div className={classes.toast__container}>
        <div className={classes.toast__container__left}>
          <img
            src={color === "positive" ? CheckMarkIcon : CrossIcon}
            className={color === "positive" ? classes.green_filtered_icon : classes.red_filtered_icon}
            alt={color === "positive" ? "Success" : "Error"}
          />
          <p className={classes.toast__message}>{message}</p>
        </div>
        <div className={classes.toast__container__right}>
          <ButtonNoOutline
            type="button"
            hasImage={true}
            src={CrossIcon}
            size="small"
            variant="white-cross"
            title=""
            onClick={handleClose}
            btnImageClass="white-toast-cross"
          />
        </div>
      </div>
    </dialog>
  );
};

const DefaultToast = ({ message, color }) => {
  return ReactDOM.createPortal(<Toast message={message} color={color} />, document.querySelector("#toast"));
};

export default DefaultToast;
