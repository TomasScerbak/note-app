import classes from "./Setting.module.css";

import RightArrowIcon from "../assets/icon-chevron-right-white.svg";

const Setting = ({ img, text, borderTop = "", onClick, isDesktop, isActive }) => {
  const containerClasses = `${classes.setting__container} ${borderTop ? classes[borderTop] : ""} ${
    isDesktop ? classes.desktop : ""
  } ${isActive ? classes.isActive : ""}`;
  return (
    <div onClick={onClick} className={containerClasses}>
      <img className={classes.setting__image} src={img} alt={text} />
      <p className={classes.setting__text}>{text}</p>
      {isDesktop && <img className={classes.rigt__arrow} src={isActive ? RightArrowIcon : null} alt="" />}
    </div>
  );
};

export default Setting;
