import classes from "./TagCard.module.css";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/themeContext/index.jsx";

import TagIcon from "../assets/icon-tag.svg";
import TagDarkGrey from "../assets/icon-tag-dark-grey.svg";

const TagCard = ({ tag }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleTagClick = () => {
    navigate(`/home/tag-detailed-list/${tag}`);
  };
  return (
    <div onClick={handleTagClick} className={classes.tag_card}>
      <img className={classes.tag__icon} src={theme === "light" ? TagDarkGrey : TagIcon} alt="Tag Icon" />
      <p className={classes.tag__label}>{tag}</p>
    </div>
  );
};

export default TagCard;
