import classes from "./Footer.module.css";

import HomeImage from "../assets/icon-home.svg";
import SearchImage from "../assets/icon-search.svg";
import ArchiveImage from "../assets/icon-archive.svg";
import SettingsImage from "../assets/icon-settings.svg";

const Footer = () => {
  const displayData = [
    {
      text: "Home",
      isActive: true,
      image: HomeImage,
    },
    {
      text: "Search",
      isActive: false,
      image: SearchImage,
    },
    {
      text: "Archive",
      isActive: false,
      image: ArchiveImage,
    },
    {
      text: "Settings",
      isActive: false,
      image: SettingsImage,
    },
  ];
  return (
    <div className={classes.footer}>
      {displayData.map((item) => {
        return (
          <div key={item.text} className={`${classes.footer__item} ${item.isActive ? classes.active : ""}`}>
            <img src={item.image} alt={item.text} className={classes.footer__icon} />
            {/* {item.text} */}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
