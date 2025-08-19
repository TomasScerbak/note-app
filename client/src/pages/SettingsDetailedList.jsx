import { useParams } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { isValidEmail } from "../validations/emailValidation.js";
import { getSettingsData, getSettingLabels } from "../utils/settingUtils.js";

import SettingActions from "../components/SettingActions";
import SettingSubheadings from "../components/SettingSubheadings";
import SettingCard from "../components/SettingCard";
import Button from "../components/UI/Button.jsx";
import SettingDetailFooterContainer from "../components/SettingDetailFooterContainer.jsx";
import ConfirmationModal from "../components/modals/ConfirmationModal.jsx";
import Input from "../components/UI/Input.jsx";
import Modal from "../components/modals/Modal.jsx";

const SettingsDetailedList = () => {
  const { passwordResetEmail, passwordResetSent } = useAuth();
  const { setting } = useParams();

  const [email, setEmeil] = useState("");
  const [error, setError] = useState({});

  const { label: settingLabel, subLabel: settingSubLabel } = getSettingLabels(setting);
  const [settingsData, setSettingsData] = useState(getSettingsData(setting));

  const handleEmailChange = (event) => {
    setEmeil(event.target.value);
  };

  const handleActiveSetting = (indexToActivate) => {
    const updatedSettings = settingsData.map((item, index) => ({
      ...item,
      active: index === indexToActivate,
    }));
    setSettingsData(updatedSettings);
  };

  const hanglePasswordResetEmail = async (email) => {
    if (isValidEmail(email)) {
      await passwordResetEmail(email);
    } else {
      setError({ message: "Please enter a valid email address." });
    }
  };

  return (
    <div>
      <SettingActions />
      <SettingSubheadings settingLabel={settingLabel} settingSubLabel={settingSubLabel} />
      {settingsData.map((item, index) => (
        <SettingCard
          heading={item.heading}
          description={item.description}
          key={index}
          img={item.img}
          active={item.active}
          onClick={() => handleActiveSetting(index)}
        />
      ))}
      {setting === "change-password" ? (
        <Input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
      ) : null}
      <SettingDetailFooterContainer>
        <Button
          type="btn"
          title={setting === "change-password" ? "Send Link" : "Apply Changes"}
          hasImage={false}
          variant="primary"
          size="medium"
          onClick={setting === "change-password" ? () => hanglePasswordResetEmail(email) : null}
          disabled={true}
        />
      </SettingDetailFooterContainer>
      {passwordResetSent ? <ConfirmationModal /> : null}
      {error.message ? <Modal header="Please Note" message={error.message} /> : null}
    </div>
  );
};

export default SettingsDetailedList;
