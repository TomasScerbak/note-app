import { useParams } from "react-router";

import SettingActions from "../components/SettingActions";
import SettingSubheadings from "../components/SettingSubheadings";
import SettingCard from "../components/SettingCard";

import { getSettingsData, getSettingLabels } from "../utils/settingUtils.js";

const SettingsDetailedList = () => {
  const { setting } = useParams();

  const { label: settingLabel, subLabel: settingSubLabel } = getSettingLabels(setting);

  return (
    <div>
      <SettingActions />
      <SettingSubheadings settingLabel={settingLabel} settingSubLabel={settingSubLabel} />
      {getSettingsData(setting).map((item, index) => (
        <SettingCard
          heading={item.heading}
          description={item.description}
          key={index}
          img={item.img}
          active={item.active}
        />
      ))}
    </div>
  );
};

export default SettingsDetailedList;
