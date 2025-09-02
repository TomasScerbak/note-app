import { useCallback, useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../contexts/themeContext";
import { getDisplayData, determineActiveLabel } from "../utils/footerUtils.js";

import classes from "./Footer.module.css";

import Separator from "../components/UI/Separator.jsx";

const Footer = () => {
  const [activeLabel, setActiveLabel] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const displayData = useMemo(() => getDisplayData(theme, activeLabel), [theme, activeLabel]);

  // Set the active label based on the current path
  useEffect(() => {
    const label = determineActiveLabel(location.pathname, displayData);
    setActiveLabel(label);
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
    <footer className={classes.footer}>
      {displayData.map((item, index) => (
        <>
          <button
            onClick={() => handleClick(item.label, item.navigate)}
            onTouchStart={() => handleClick(item.label, item.navigate)}
            key={item.text}
            className={`${classes.footer__item} ${activeLabel === item.label ? classes.active : ""}`}
          >
            <div className={classes.footer__item__wrapper}>
              <img
                src={item.image}
                alt={item.text}
                className={`${classes.footer__image} ${
                  activeLabel === item.label
                    ? `${classes.footer__icon__active} ${
                        theme === "light" ? classes.active__light_mode : classes.active__dark
                      }`
                    : ""
                }`}
              />
              <p className={`${classes.footer__text} ${classes[item.textClass]}`}>{item.text}</p>
            </div>
          </button>
          {index !== displayData.length - 1 ? <Separator orientation="vertical" /> : null}
        </>
      ))}
    </footer>
  );
};

export default Footer;
