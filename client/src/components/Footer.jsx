import { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import classes from "./Footer.module.css";

import HomeImage from "../assets/icon-home.svg";
import SearchImage from "../assets/icon-search.svg";
import ArchiveImage from "../assets/icon-archive.svg";
import TagImage from "../assets/icon-tag.svg";
import SettingsImage from "../assets/icon-settings.svg";

const displayData = [
  {
    text: "Home",
    label: "home",
    image: HomeImage,
    navigate: "all-notes",
  },
  {
    text: "Search",
    label: "search",
    image: SearchImage,
    navigate: "search-notes",
  },
  {
    text: "Archive",
    label: "archive",
    image: ArchiveImage,
    navigate: "archive-notes",
  },
  {
    text: "Tags",
    label: "tags",
    image: TagImage,
    navigate: "tag-list",
  },
  {
    text: "Settings",
    label: "settings",
    image: SettingsImage,
    navigate: "settings",
  },
];

const Footer = () => {
  const [activeLabel, setActiveLabel] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  // Set the active label based on the current path
  useEffect(() => {
    const activeItem = displayData.find((item) => location.pathname.includes(item.navigate));
    if (activeItem) {
      setActiveLabel(activeItem.label);
    }
  }, [location.pathname]);

  const handleClick = useCallback(
    (label, path) => {
      setActiveLabel(label);
      if (location.pathname !== path) {
        navigate(path);
      }
    },
    [navigate, location.pathname]
  );

  return (
    <div className={classes.footer}>
      {displayData.map((item) => (
        <button
          onClick={() => handleClick(item.label, item.navigate)}
          key={item.text}
          className={`${classes.footer__item} ${activeLabel === item.label ? classes.active : ""}`}
        >
          <img
            src={item.image}
            alt={item.text}
            className={`${classes.footer__icon} ${
              activeLabel === item.label ? classes.footer__icon__active : ""
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Footer;
