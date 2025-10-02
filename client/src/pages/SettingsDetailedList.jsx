import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { isValidEmail } from "../validations/emailValidation.js";
import { getSettingsData, getSettingLabels } from "../utils/settingUtils.js";
import { useTheme } from "../contexts/themeContext/index.jsx";
import { useFontTheme } from "../contexts/fontContext/index.jsx";
import { useToast } from "../contexts/toastContext/index.jsx";

import SettingActions from "../components/SettingActions";
import SettingSubheadings from "../components/SettingSubheadings";
import SettingCard from "../components/SettingCard";
import Button from "../components/UI/Button.jsx";
import SettingDetailFooterContainer from "../components/SettingDetailFooterContainer.jsx";
import ConfirmationModal from "../components/modals/ConfirmationModal.jsx";
import Input from "../components/UI/Input.jsx";
import Modal from "../components/modals/Modal.jsx";
import DesktopSettingSubHeadings from "../components/DesktopSettingSubHeadings.jsx";

const SettingsDetailedList = ({ settingSelected, isDesktop }) => {
  const { passwordResetEmail, passwordResetSent } = useAuth();
  const { setting } = useParams();
  const currentSetting = isDesktop ? settingSelected?.label?.toLowerCase() : setting;
  const { theme, setTheme } = useTheme();
  const { setFontTheme } = useFontTheme();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const { label: settingLabel, subLabel: settingSubLabel } = getSettingLabels(currentSetting);
  const [settingsData, setSettingsData] = useState(getSettingsData(currentSetting));
  const [activeSetting, setActiveSetting] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleActiveSetting = (indexToActivate) => {
    const updatedSettings = settingsData.map((item, index) => ({
      ...item,
      active: index === indexToActivate,
    }));
    setSettingsData(updatedSettings);
    setActiveSetting(updatedSettings[indexToActivate].label);
  };

  const hanglePasswordResetEmail = async (email) => {
    if (isValidEmail(email)) {
      await passwordResetEmail(email);
    } else {
      setError({ message: "Please enter a valid email address." });
    }
  };

  const handleSettingChange = (settingName) => {
    const lowerCaseSettingName = settingName.toLowerCase();
    // Apply font family
    if (currentSetting === "font-theme") {
      switch (lowerCaseSettingName) {
        case "sans-serif":
        case "serif":
        case "monospace":
          setFontTheme(lowerCaseSettingName);
          break;
        default:
          setFontTheme("sans-serif");
      }
    }

    // Apply color theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (currentSetting === "color-theme") {
      switch (lowerCaseSettingName) {
        case "light-mode":
          setTheme("light");
          break;
        case "dark-mode":
          setTheme("dark");
          break;
        case "system":
          setTheme(prefersDark ? "dark" : "light");
          break;
        default:
          setTheme("light");
      }
    }

    addToast({
      message: "Settings updated successfully!",
      color: "positive",
      duration: 5000,
    });
  };

  useEffect(() => {
    if (isDesktop) {
      setSettingsData(getSettingsData(currentSetting));
      setActiveSetting("");
    }
  }, [currentSetting, isDesktop]);

  return (
    <div>
      {!isDesktop && <SettingActions />}
      {!isDesktop && <SettingSubheadings settingLabel={settingLabel} settingSubLabel={settingSubLabel} />}
      {isDesktop && currentSetting !== "logout" && (
        <DesktopSettingSubHeadings heading={settingLabel} subheading={settingSubLabel} />
      )}
      {settingsData.map((item, index) => (
        <SettingCard
          heading={item.heading}
          description={item.description}
          key={index}
          img={theme === "light" ? item.img2 : item.img}
          active={item.active}
          onClick={() => handleActiveSetting(index)}
        />
      ))}
      {currentSetting === "change-password" ? (
        <Input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
      ) : null}
      {currentSetting !== "logout" && (
        <SettingDetailFooterContainer>
          <Button
            type="btn"
            title={currentSetting === "change-password" ? "Send Link" : "Apply Changes"}
            hasImage={false}
            variant="primary"
            size="medium"
            onClick={
              currentSetting === "change-password"
                ? () => hanglePasswordResetEmail(email)
                : () => handleSettingChange(activeSetting)
            }
            disabled={true}
          />
        </SettingDetailFooterContainer>
      )}
      {passwordResetSent ? <ConfirmationModal /> : null}
      {error.message ? <Modal header="Please Note" message={error.message} /> : null}
    </div>
  );
};

export default SettingsDetailedList;
