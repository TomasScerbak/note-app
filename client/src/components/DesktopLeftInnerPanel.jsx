import classes from "./DesktopLeftInnerPanel.module.css";

import Button from "./UI/Button";
import AllNotes from "./AllNotes";
import ArchiveHeader from "./ArchiveHeader";
import Loader from "./UI/Loader";

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
}) => {
  return (
    <section className={classes.left_inner_panel}>
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
      {searchTerm && activeBtn.title === "All Notes" && renderNoteCards(filteredNotes)}
      {searchTerm && activeBtn.title === "Archived Notes" && renderNoteCards(filteredArchivedNotes)}
      {activeBtn.title === "Archived Notes" && !searchTerm && !filteredArchivedNotes.length ? (
        <ArchiveHeader isDesktop={true} archivedNotes={archivedNotes} />
      ) : null}
      {activeBtn.title === "Archived Notes" && !searchTerm && renderNoteCards(archivedNotes)}
      {isLoading ? <Loader /> : null}
    </section>
  );
};

export default DesktopLeftInnerPanel;
