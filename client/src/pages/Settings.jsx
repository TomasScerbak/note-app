import { useState } from "react";
import { useAuth } from "../contexts/authContext";

import Setting from "../components/Setting";
import CallToActionModal from "../components/modals/CallToActionModal";

import SunIcon from "../assets/icon-sun.svg";
import FontIcon from "../assets/icon-font.svg";
import LogoutIcon from "../assets/icon-logout.svg";
import LockIcon from "../assets/icon-lock.svg";

const Settings = () => {
  const { signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const settings = [
    { name: "Color Theme", image: SunIcon },
    { name: "Font Theme", image: FontIcon },
    { name: "Change Password", image: LockIcon },
    { name: "Logout", image: LogoutIcon },
  ];

  const handleSettingClick = (setting) => {
    if (setting.name === "Logout") setShowModal(true);
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
