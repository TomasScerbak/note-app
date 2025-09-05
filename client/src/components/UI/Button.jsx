import classes from "./Button.module.css";

const Button = ({
  type,
  title,
  hasImage,
  src,
  secondarySrc,
  variant,
  onClick,
  size,
  btnImageClass,
  btnSecondaryImageClass,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classes.btn} ${classes[`btn--${variant}`]} ${classes[`btn--${size}`]} ${
        active ? classes["btn--active"] : ""
      }`}
      type={type}
    >
      {hasImage ? <img className={`${classes[btnImageClass]}`} src={src} /> : null}
      {title}
      {active ? <img className={`${classes[btnSecondaryImageClass]}`} src={secondarySrc} /> : null}
    </button>
  );
};

export default Button;
