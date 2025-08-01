import classes from "./TagCard.module.css";
import { useNavigate } from "react-router";

import TagIcon from "../assets/icon-tag.svg";

const TagCard = ({ tag }) => {
  const navigate = useNavigate();

  const handleTagClick = () => {
    navigate(`/home/tag-detailed-list/${tag}`);
  };
  return (
    <div onClick={handleTagClick} className={classes.tag_card}>
      <img className={classes.tag__icon} src={TagIcon} alt="Tag Icon" />
      <p className={classes.tag__label}>{tag}</p>
    </div>
  );
};

export default TagCard;
