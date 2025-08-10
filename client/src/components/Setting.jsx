import classes from "./Setting.module.css";

const Setting = ({ img, text, borderTop = "", onClick }) => {
  const containerClasses = `${classes.setting__container} ${borderTop ? classes[borderTop] : ""}`;
  return (
    <div onClick={onClick} className={containerClasses}>
      <img className={classes.setting__image} src={img} alt={text} />
      <p className={classes.setting__text}>{text}</p>
    </div>
  );
};

export default Setting;
