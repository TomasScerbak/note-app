import HomeImageWhite from "../assets/icon-home-white.svg";
import HomeImageBlue from "../assets/icon-home-blue.svg";
import HomeImageDark from "../assets/icon-home-dark-grey.svg";
import ArchiveImageWhite from "../assets/icon-archive-white.svg";
import ArchiveImageBlue from "../assets/icon-archive-blue.svg";
import ArchiveImageDark from "../assets/icon-archive-dark-grey.svg";
import RightChevronWhite from "../assets/icon-chevron-right-white.svg";
import DeleteImageWhite from "../assets/icon-delete-white.svg";
import DeleteImageDark from "../assets/icon-delete-dark-grey.svg";

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

export const btnActionsData = [
  {
    id: 1,
    title: "Archive Note",
    img: null,
    img2: null,
    active: false,
    type: "button",
    variant: "desktop-secondary",
    size: "max",
  },
  {
    id: 2,
    title: "Delete Note",
    img: null,
    img2: null,
    active: false,
    type: "button",
    variant: "desktop-secondary",
    size: "max",
  },
];

export const newNoteFooterBtns = [
  {
    id: 1,
    title: "Save Note",
    img: null,
    img2: null,
    active: false,
    type: "button",
    variant: "footer-primary",
    size: "",
  },
  {
    id: 2,
    title: "Cancel",
    img: null,
    img2: null,
    active: false,
    type: "button",
    variant: "footer-secondary",
    size: "",
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
    if (btnData && btnData.title === "Archive Note") {
      return {
        img: ArchiveImageWhite,
      };
    }
    if (btnData && btnData.title === "Delete Note") {
      return {
        img: DeleteImageWhite,
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
    if (btnData && btnData.title === "Archive Note") {
      return {
        img: ArchiveImageDark,
      };
    }
    if (btnData && btnData.title === "Delete Note") {
      return {
        img: DeleteImageDark,
      };
    }
  }

  return { img: null };
};
