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

export const getDisplayData = (theme, activeLabel) => [
  {
    text: "Home",
    label: "home",
    image: theme === "dark" && activeLabel === "home" ? HomeBlue : theme === "light" ? HomeBlue : HomeImage,
    navigate: "all-notes",
  },
  {
    text: "Search",
    label: "search",
    image:
      theme === "dark" && activeLabel === "search"
        ? SearchBlue
        : theme === "light"
        ? SearchBlue
        : SearchImage,
    navigate: "search-notes",
  },
  {
    text: "Archive",
    label: "archive",
    image:
      theme === "dark" && activeLabel === "archive"
        ? ArchiveBlue
        : theme === "light"
        ? ArchiveBlue
        : ArchiveImage,
    navigate: "archive-notes",
  },
  {
    text: "Tags",
    label: "tags",
    image: theme === "dark" && activeLabel === "tags" ? TagBlue : theme === "light" ? TagBlue : TagImage,
    navigate: "tag-list",
  },
  {
    text: "Settings",
    label: "settings",
    image:
      theme === "dark" && activeLabel === "settings"
        ? SettingsBlue
        : theme === "light"
        ? SettingsBlue
        : SettingsImage,
    navigate: "settings",
  },
];

export const determineActiveLabel = (pathname, displayData) => {
  const activeItem = displayData.find((item) => pathname.includes(item.navigate));
  return activeItem ? activeItem.label : "home";
};
