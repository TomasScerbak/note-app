import SansSerifImage from "../assets/icon-font-sans-serif-white.svg";
import SansSerifImageDark from "../assets/icon-font-sans-serif.svg";
import SerifImage from "../assets/icon-font-serif-white.svg";
import SerifImageDark from "../assets/icon-font-serif.svg";
import Monospace from "../assets/icon-font-monospace-white.svg";
import MonospaceDark from "../assets/icon-font-monospace.svg";

import SunImage from "../assets/icon-sun.svg";
import SunImageDarkGrey from "../assets/icon-sun-dark-grey.svg";
import MoonImage from "../assets/icon-moon-white.svg";
import MoonImageDarkGrey from "../assets/icon-moon.svg";
import SystemImage from "../assets/icon-system-theme-white.svg";
import SystemImageDarkGrey from "../assets/icon-system-theme.svg";

const settingsData = {
  "font-theme": [
    {
      heading: "Sans-Serif",
      description: "Clean and modern, easy to read.",
      img: SansSerifImage,
      img2: SansSerifImageDark,
      active: false,
    },
    {
      heading: "Serif",
      description: "Classic and elegant for a timeless feel.",
      img: SerifImage,
      img2: SerifImageDark,
      active: false,
    },
    {
      heading: "Monospace",
      description: "Code-like, great for a technical vibe.",
      img: Monospace,
      img2: MonospaceDark,
      active: true,
    },
  ],
  "color-theme": [
    {
      heading: "Light Mode",
      description: "Pick a clean and classic light theme",
      img: SunImage,
      img2: SunImageDarkGrey,
      active: false,
    },
    {
      heading: "Dark Mode",
      description: "Select a sleek and modern dark theme",
      img: MoonImage,
      img2: MoonImageDarkGrey,
      active: false,
    },
    {
      heading: "System",
      description: "Adapts to your device’s theme",
      img: SystemImage,
      img2: SystemImageDarkGrey,
      active: true,
    },
  ],
};

export const getSettingLabels = (setting) => {
  switch (setting) {
    case "color-theme":
      return {
        label: "Color Theme",
        subLabel: "Choose your color theme:",
      };
    case "font-theme":
      return {
        label: "Font Theme",
        subLabel: "Select your preferred font style",
      };
    case "change-password":
      return {
        label: "Change Password",
        subLabel: "Update your account password by sending a reset link to your email.",
      };
    default:
      return {
        label: "Settings",
        subLabel: "Manage your application settings",
      };
  }
};

export const getSettingsData = (setting) => {
  return settingsData[setting] || [];
};
