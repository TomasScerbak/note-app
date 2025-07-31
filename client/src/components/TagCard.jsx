import classes from "./TagCard.module.css";

import TagIcon from "../assets/icon-tag.svg";

const TagCard = ({ tag }) => {
  console.log("TagCard Rendered with tag:", tag);
  return (
    <div className={classes.tag_card}>
      <img className={classes.tag__icon} src={TagIcon} alt="Tag Icon" />
      <p className={classes.tag__label}>{tag}</p>
    </div>
  );
};

export default TagCard;
