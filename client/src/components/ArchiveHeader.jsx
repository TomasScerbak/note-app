import classes from "./ArchiveHeader.module.css";
import { Link } from "react-router";

const ArchiveHeader = ({ archivedNotes, isDesktop }) => {
  console.log("archivedNotes in ArchiveHeader:", archivedNotes);

  const noArchivedNotes = !archivedNotes.length;

  return (
    <div>
      {!isDesktop && <h1 className={classes.archive__header}>Archived Notes</h1>}

      <p className={classes.archive__subheader}>
        All your archived notes are stored here. You can restore or delete them anytime.
      </p>

      {noArchivedNotes && !isDesktop && (
        <p className={classes.archive__text}>
          No notes have been archived yet. Move notes here for safekeeping, or{" "}
          <Link to="/home/create-note" className={classes.archive__link}>
            create a new note.
          </Link>
        </p>
      )}

      {noArchivedNotes && isDesktop && (
        <p className={classes.archive__text}>
          No notes have been archived yet. Move notes here for safekeeping.
        </p>
      )}
    </div>
  );
};

export default ArchiveHeader;
