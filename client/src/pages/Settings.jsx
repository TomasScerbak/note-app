import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";

import Setting from "../components/Setting";
import CallToActionModal from "../components/modals/CallToActionModal";

import SunIcon from "../assets/icon-sun.svg";
import FontIcon from "../assets/icon-font.svg";
import LogoutIcon from "../assets/icon-logout.svg";
import LockIcon from "../assets/icon-lock.svg";

const Settings = () => {
  const { signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const settings = [
    { name: "Color Theme", label: "color-theme", image: SunIcon },
    { name: "Font Theme", label: "font-theme", image: FontIcon },
    { name: "Change Password", label: "change-password", image: LockIcon },
    { name: "Logout", label: "logout", image: LogoutIcon },
  ];

  const handleSettingClick = (setting) => {
    if (setting.label === "logout") setShowModal(true);

    const validSettings = ["color-theme", "font-theme", "change-password"];
    if (validSettings.includes(setting.label)) {
      navigate(`/home/settings-detailed-list/${setting.label}`);
    }
  };

  return (
    <>
      <div>
        <h1>Settings</h1>
        {settings.map((setting, index) => (
          <Setting
            key={index}
            img={setting.image}
            text={setting.name}
            borderTop={setting.name === "Logout" ? "borderTop" : ""}
            onClick={() => handleSettingClick(setting)}
          />
        ))}
      </div>
      {showModal && (
        <CallToActionModal
          header="Leaving so soon?"
          message="Logging out will end your current session. You can always come back later. Want to continue or stay a bit longer?"
          btnsArr={[
            { title: "Cancel", variant: "cancel", onClick: () => setShowModal(false) },
            {
              title: "Logout",
              variant: "delete",
              onClick: () => signOut(),
            },
          ]}
          image={LogoutIcon}
        />
      )}
    </>
  );
};

export default Settings;
