import classes from "./DesktopLeftInnerPanel.module.css";

import Button from "./UI/Button";
import AllNotes from "./AllNotes";
import ArchiveHeader from "./ArchiveHeader";
import Loader from "./UI/Loader";
import Settings from "../pages/Settings";

const DesktopLeftInnerPanel = ({
  handleCreateNewNote,
  searchTerm,
  message,
  activeBtn,
  activeNoteId,
  setActiveNoteId,
  setIsNewNoteRequested,
  filteredNotes,
  filteredArchivedNotes,
  archivedNotes,
  isLoading,
  renderNoteCards,
  settingClicked,
  handleSettingSelected,
}) => {
  return (
    <section className={classes.left_inner_panel}>
      {settingClicked ? (
        <Settings isDesktop={true} handleSettingSelected={handleSettingSelected} />
      ) : (
        <>
          <Button onClick={handleCreateNewNote} size="large" variant="primary" title="Create New Note " />
          {searchTerm ? message : null}
          {searchTerm || activeBtn.title !== "All Notes" ? null : (
            <AllNotes
              isDesktop={true}
              activeNoteId={activeNoteId}
              setActiveNoteId={setActiveNoteId}
              setIsNewNoteRequested={setIsNewNoteRequested}
            />
          )}
          {searchTerm &&
            activeBtn.title === "All Notes" &&
            renderNoteCards({
              notes: filteredNotes,
              onCardClick: (id) => setActiveNoteId(id),
              activeNoteId,
            })}
          {searchTerm &&
            activeBtn.title === "Archived Notes" &&
            renderNoteCards({
              notes: filteredArchivedNotes,
              onCardClick: (id) => setActiveNoteId(id),
              activeNoteId,
            })}
          {activeBtn.title === "Archived Notes" && !searchTerm && !filteredArchivedNotes.length ? (
            <ArchiveHeader isDesktop={true} archivedNotes={archivedNotes} />
          ) : null}
          {activeBtn.title === "Archived Notes" &&
            !searchTerm &&
            renderNoteCards({
              notes: archivedNotes,
              onCardClick: (id) => setActiveNoteId(id),
              activeNoteId,
            })}
          {isLoading ? <Loader /> : null}
        </>
      )}
    </section>
  );
};

export default DesktopLeftInnerPanel;
