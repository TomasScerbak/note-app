import classes from "./DesktopRightInnerPanel.module.css";

import ViewNotePage from "./ViewNotePage";
import NewNote from "./NewNote";
import SettingsDetailedList from "../pages/SettingsDetailedList";

const DesktopRightInnerPanel = ({
  activeBtn,
  activeNoteId,
  isNewNoteRequested,
  searchTerm,
  settingSelected,
  settingClicked,
}) => {
  return (
    <section className={classes.right_inner_panel}>
      {(activeBtn.title === "All Notes" || activeBtn.title === "Archived Notes") &&
      activeNoteId &&
      !isNewNoteRequested ? (
        <ViewNotePage isNewNoteRequested={isNewNoteRequested} isDesktop={true} deskNoteId={activeNoteId} />
      ) : null}
      {isNewNoteRequested && !searchTerm ? (
        <NewNote isDesktop={true} isNewNoteRequested={isNewNoteRequested} />
      ) : null}
      {Object.keys(settingSelected).length && settingClicked ? (
        <SettingsDetailedList settingSelected={settingSelected} isDesktop={true} />
      ) : null}
    </section>
  );
};

export default DesktopRightInnerPanel;
