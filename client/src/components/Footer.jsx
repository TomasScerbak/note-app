import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import classes from "./Footer.module.css";

import HomeImage from "../assets/icon-home.svg";
import SearchImage from "../assets/icon-search.svg";
import ArchiveImage from "../assets/icon-archive.svg";
import TagImage from "../assets/icon-tag.svg";
import SettingsImage from "../assets/icon-settings.svg";

const Footer = () => {
  const [activeLabel, setActiveLabel] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);

  const handleClick = useCallback((label) => {
    setActiveLabel(label);
  }, []);

  const displayData = [
    {
      text: "Home",
      label: "home",
      isActive: true,
      image: HomeImage,
      navigate: "/home/all-notes",
    },
    {
      text: "Search",
      label: "search",
      isActive: false,
      image: SearchImage,
      navigate: "home/search-notes",
    },
    {
      text: "Archive",
      label: "archive",
      isActive: false,
      image: ArchiveImage,
      navigate: "home/archive-notes",
    },
    {
      text: "Tags",
      label: "tags",
      isActive: false,
      image: TagImage,
      navigate: "home/tag-list",
    },
    {
      text: "Settings",
      label: "settings",
      isActive: false,
      image: SettingsImage,
      navigate: "home/settings",
    },
  ];
  return (
    <div className={classes.footer}>
      {displayData.map((item) => {
        return (
          <button
            onClick={() => {
              handleClick(item.label);
              location.pathname !== item.navigate ? navigate(item.navigate) : null;
            }}
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
        );
      })}
    </div>
  );
};

export default Footer;
