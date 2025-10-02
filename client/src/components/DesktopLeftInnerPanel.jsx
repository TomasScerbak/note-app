import classes from "./DesktopLeftInnerPanel.module.css";

import Button from "./UI/Button";
import AllNotes from "./AllNotes";
import ArchiveHeader from "./ArchiveHeader";
import Loader from "./UI/Loader";
import Settings from "../pages/Settings";
import TagListHeaders from "./TagListHeaders";

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
  filteredNotesByTag,
  tag,
}) => {
  return (
    <section className={classes.left_inner_panel}>
      <Button onClick={handleCreateNewNote} size="large" variant="primary" title="Create New Note " />
      {searchTerm ? message : null}
      {settingClicked ? (
        <Settings isDesktop={true} handleSettingSelected={handleSettingSelected} />
      ) : tag && !searchTerm ? (
        <TagListHeaders isDesktop={true} tag={tag} />
      ) : null}
      {tag ? (
        renderNoteCards({
          notes: filteredNotesByTag,
          onCardClick: (id) => setActiveNoteId(id),
          activeNoteId,
        })
      ) : (
        <>
          {/* All Notes Section */}
          {!searchTerm && activeBtn.title === "All Notes" && (
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

          {/* Archived Notes Section */}
          {searchTerm &&
            activeBtn.title === "Archived Notes" &&
            renderNoteCards({
              notes: filteredArchivedNotes,
              onCardClick: (id) => setActiveNoteId(id),
              activeNoteId,
            })}

          {activeBtn.title === "Archived Notes" && !searchTerm && !filteredArchivedNotes.length && (
            <ArchiveHeader isDesktop={true} archivedNotes={archivedNotes} />
          )}

          {activeBtn.title === "Archived Notes" &&
            !searchTerm &&
            renderNoteCards({
              notes: archivedNotes,
              onCardClick: (id) => setActiveNoteId(id),
              activeNoteId,
            })}

          {isLoading && <Loader />}
        </>
      )}
    </section>
  );
};

export default DesktopLeftInnerPanel;
