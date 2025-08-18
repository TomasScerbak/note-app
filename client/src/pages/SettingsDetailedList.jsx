import { useParams } from "react-router";
import { useState } from "react";

import SettingActions from "../components/SettingActions";
import SettingSubheadings from "../components/SettingSubheadings";
import SettingCard from "../components/SettingCard";

import { getSettingsData, getSettingLabels } from "../utils/settingUtils.js";

const SettingsDetailedList = () => {
  const { setting } = useParams();
  const { label: settingLabel, subLabel: settingSubLabel } = getSettingLabels(setting);

  const [settingsData, setSettingsData] = useState(getSettingsData(setting));

  const handleActiveSetting = (indexToActivate) => {
    const updatedSettings = settingsData.map((item, index) => ({
      ...item,
      active: index === indexToActivate,
    }));
    setSettingsData(updatedSettings);
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
    </div>
  );
};

export default SettingsDetailedList;
