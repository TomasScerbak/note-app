import classes from "./ButtonNoOutline.module.css";

const ButtonNoOutline = ({ type, title, hasImage, src, variant, onClick, size, btnImageClass }) => {
  return (
    <button
      onClick={onClick}
      className={`${classes.btn} ${classes[`btn--${variant}`]} ${classes[`btn--${size}`]}`}
      type={type}
    >
      {hasImage ? <img className={`${classes[btnImageClass]}`} src={src} /> : null}
      {title}
    </button>
  );
};

export default ButtonNoOutline;
