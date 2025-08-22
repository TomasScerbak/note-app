import { useCallback, useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../contexts/themeContext";

import classes from "./Footer.module.css";

import HomeImage from "../assets/icon-home.svg";
import HomeBlue from "../assets/icon-home-blue.svg";
import SearchImage from "../assets/icon-search.svg";
import SearchBlue from "../assets/icon-search-blue.svg";
import ArchiveImage from "../assets/icon-archive.svg";
import ArchiveBlue from "../assets/icon-archive-blue.svg";
import TagImage from "../assets/icon-tag.svg";
import TagBlue from "../assets/icon-tag-blue.svg";
import SettingsImage from "../assets/icon-settings.svg";
import SettingsBlue from "../assets/icon-settings-blue.svg";

const Footer = () => {
  const [activeLabel, setActiveLabel] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const displayData = useMemo(
    () => [
      {
        text: "Home",
        label: "home",
        image: theme === "light" ? HomeBlue : HomeImage,
        navigate: "all-notes",
      },
      {
        text: "Search",
        label: "search",
        image: theme === "light" ? SearchBlue : SearchImage,
        navigate: "search-notes",
      },
      {
        text: "Archive",
        label: "archive",
        image: theme === "light" ? ArchiveBlue : ArchiveImage,
        navigate: "archive-notes",
      },
      {
        text: "Tags",
        label: "tags",
        image: theme === "light" ? TagBlue : TagImage,
        navigate: "tag-list",
      },
      {
        text: "Settings",
        label: "settings",
        image: theme === "light" ? SettingsBlue : SettingsImage,
        navigate: "settings",
      },
    ],
    [theme]
  );

  // Set the active label based on the current path
  useEffect(() => {
    const activeItem = displayData.find((item) => location.pathname.includes(item.navigate));
    if (activeItem) {
      setActiveLabel(activeItem.label);
    }
  }, [location.pathname, displayData]);

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
            className={`${classes.footer__item} ${
              activeLabel === item.label
                ? theme === "light"
                  ? classes.active__light_mode
                  : classes.active__dark_mode
                : ""
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Footer;
