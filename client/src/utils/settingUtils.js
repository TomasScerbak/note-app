import SansSerifImage from "../assets/icon-font-sans-serif.svg";
import SerifImage from "../assets/icon-font-serif.svg";
import Monospace from "../assets/icon-font-monospace.svg";

import SunImage from "../assets/icon-sun.svg";
import MoonImage from "../assets/icon-moon-white.svg";
import SystemImage from "../assets/icon-system-theme-white.svg";

const settingsData = {
  "font-theme": [
    {
      heading: "Sans-Serif",
      description: "Clean and modern, easy to read.",
      img: SansSerifImage,
      active: true,
    },
    {
      heading: "Serif",
      description: "Classic and elegant for a timeless feel.",
      img: SerifImage,
      active: false,
    },
    {
      heading: "Monospace",
      description: "Code-like, great for a technical vibe.",
      img: Monospace,
      active: false,
    },
  ],
  "color-theme": [
    {
      heading: "Light Mode",
      description: "Pick a clean and classic light theme",
      img: SunImage,
      active: false,
    },
    {
      heading: "Dark Mode",
      description: "Select a sleek and modern dark theme",
      img: MoonImage,
      active: false,
    },
    {
      heading: "System",
      description: "Adapts to your device’s theme",
      img: SystemImage,
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
        subLabel: "Update your account password",
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
