import classes from "./Tag.module.css";

const Tag = ({ tagLabel }) => {
  return <span className={classes.tag}>{tagLabel}</span>;
};

export default Tag;
