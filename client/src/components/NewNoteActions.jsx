import ButtonNoOutline from "../components/UI/ButtonNoOutline";

import classes from "./NewNoteActions.module.css";

import ArroLeftIcon from "../assets/icon-arrow-left.svg";
import ArchiveIcon from "../assets/icon-archive.svg";
import TrashIcon from "../assets/icon-delete.svg";

import { Link } from "react-router";

const NewNoteActions = ({ id, handleClearValues, onSaveNote, onDeleteNote, onToggleArchive }) => {
  return (
    <div className={classes.new_note_action_container}>
      <div className={classes.left_col}>
        <Link onClick={handleClearValues} className={classes.go_back_container} to="/home/all-notes">
          <img className={classes.left_arrow} src={ArroLeftIcon} alt="Go to all notes page" />
          <span className={classes.back_to_all_notes}>Go Back</span>
        </Link>
      </div>
      <div className={classes.right_col}>
        {id ? (
          <ButtonNoOutline
            onClick={onDeleteNote}
            btnImageClass=""
            hasImage={true}
            variant="white"
            src={TrashIcon}
          />
        ) : null}
        {id ? (
          <ButtonNoOutline
            btnImageClass=""
            hasImage={true}
            variant="white"
            src={ArchiveIcon}
            onClick={onToggleArchive}
          />
        ) : null}
        {!id ? (
          <ButtonNoOutline
            variant="white"
            src={null}
            hasImage={false}
            title="Cancel"
            type="button"
            btnImageClass=""
            onClick={handleClearValues}
          />
        ) : null}
        <ButtonNoOutline
          variant="blue"
          src={null}
          hasImage={false}
          title={id ? "Update Note" : "Save Note"}
          type="button"
          btnImageClass=""
          onClick={onSaveNote}
        />
      </div>
    </div>
  );
};

export default NewNoteActions;
