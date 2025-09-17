import classes from "./DesktopRightInnerPanel.module.css";

import ViewNotePage from "./ViewNotePage";
import NewNote from "./NewNote";

const DesktopRightInnerPanel = ({ activeBtn, activeNoteId, isNewNoteRequested, searchTerm }) => {
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
    </section>
  );
};

export default DesktopRightInnerPanel;
