import HomeImageWhite from "../assets/icon-home-white.svg";
import HomeImageBlue from "../assets/icon-home-blue.svg";
import HomeImageDark from "../assets/icon-home-dark-grey.svg";
import ArchiveImageWhite from "../assets/icon-archive-white.svg";
import ArchiveImageBlue from "../assets/icon-archive-blue.svg";
import ArchiveImageDark from "../assets/icon-archive-dark-grey.svg";
import RightChevronWhite from "../assets/icon-chevron-right-white.svg";

export const initialBtnData = [
  {
    id: 1,
    title: "All Notes",
    img: null,
    img2: RightChevronWhite,
    active: true,
    type: "button",
    variant: "desktop-primary",
    size: "max",
  },
  {
    id: 2,
    title: "Archived Notes",
    img: null,
    img2: RightChevronWhite,
    active: false,
    type: "button",
    variant: "desktop-primary",
    size: "max",
  },
];

export const getBtnImages = (btnData, theme) => {
  if (!Object.keys(btnData).length || !theme) {
    return {
      img: null,
    };
  }

  if (theme === "dark") {
    if (btnData && btnData.title === "All Notes") {
      return {
        img: btnData.active ? HomeImageBlue : HomeImageWhite,
      };
    }
    if (btnData && btnData.title === "Archived Notes") {
      return {
        img: btnData.active ? ArchiveImageBlue : ArchiveImageWhite,
      };
    }
  }

  if (theme === "light") {
    if (btnData && btnData.title === "All Notes") {
      return {
        img: btnData.active ? HomeImageBlue : HomeImageDark,
      };
    }
    if (btnData && btnData.title === "Archived Notes") {
      return {
        img: btnData.active ? ArchiveImageBlue : ArchiveImageDark,
      };
    }
  }
};
