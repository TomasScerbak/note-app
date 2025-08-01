import Setting from "../components/Setting";

import SunIcon from "../assets/icon-sun.svg";
import FontIcon from "../assets/icon-font.svg";
import LogoutIcon from "../assets/icon-logout.svg";
import LockIcon from "../assets/icon-lock.svg";

const Settings = () => {
  const settings = [
    { name: "Color Theme", image: SunIcon },
    { name: "Font Theme", image: FontIcon },
    { name: "Change Password", image: LockIcon },
    { name: "Logout", image: LogoutIcon },
  ];

  return (
    <div>
      <h1>Settings</h1>
      {settings.map((setting, index) => (
        <Setting
          key={index}
          img={setting.image}
          text={setting.name}
          borderTop={setting.name === "Logout" ? "borderTop" : ""}
        />
      ))}
    </div>
  );
};

export default Settings;
