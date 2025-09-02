import HomeLight from "../assets/icon-home.svg";
import HomeDark from "../assets/icon-home-dark.svg";
import HomeBlue from "../assets/icon-home-blue.svg";
import SearchLight from "../assets/icon-search.svg";
import SearchDark from "../assets/icon-search-dark.svg";
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
    image: theme === "dark" && activeLabel === "home" ? HomeBlue : theme === "light" ? HomeDark : HomeLight,
    textClass:
      theme === "dark"
        ? activeLabel === "home"
          ? "text__blue"
          : "text__white"
        : activeLabel === "home"
        ? "text__blue"
        : "text__neutral600",
    navigate: "all-notes",
  },
  {
    text: "Search",
    label: "search",
    image:
      theme === "dark" && activeLabel === "search"
        ? SearchBlue
        : theme === "light"
        ? SearchDark
        : SearchLight,
    textClass:
      theme === "dark"
        ? activeLabel === "search"
          ? "text__blue"
          : "text__white"
        : activeLabel === "search"
        ? "text__blue"
        : "text__neutral600",
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
    textClass:
      theme === "dark"
        ? activeLabel === "archive"
          ? "text__blue"
          : "text__white"
        : activeLabel === "archive"
        ? "text__blue"
        : "text__neutral600",
    navigate: "archive-notes",
  },
  {
    text: "Tags",
    label: "tags",
    image: theme === "dark" && activeLabel === "tags" ? TagBlue : theme === "light" ? TagBlue : TagImage,
    textClass:
      theme === "dark"
        ? activeLabel === "tags"
          ? "text__blue"
          : "text__white"
        : activeLabel === "tags"
        ? "text__blue"
        : "text__neutral600",
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
    textClass:
      theme === "dark"
        ? activeLabel === "settings"
          ? "text__blue"
          : "text__white"
        : activeLabel === "settings"
        ? "text__blue"
        : "text__neutral600",
    navigate: "settings",
  },
];

export const determineActiveLabel = (pathname, displayData) => {
  const activeItem = displayData.find((item) => pathname.includes(item.navigate));
  return activeItem ? activeItem.label : "home";
};
