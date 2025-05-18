// import { signInWiGoogle } from "../../firebase/auth";

import classes from "./Button.module.css";

const Button = ({ type, title, hasImage, src, variant, onClick }) => {
  return (
    <button onClick={onClick} className={`${classes.btn} ${classes[`btn--${variant}`]}`} type={type}>
      {hasImage ? <img className={classes.btn__image} src={src} /> : null}
      {title}
    </button>
  );
};

export default Button;
