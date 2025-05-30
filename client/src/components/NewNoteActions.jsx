import ButtonNoOutline from "../components/UI/ButtonNoOutline";

import classes from "./NewNoteActions.module.css";

import ArroLeftIcon from "../assets/icon-arrow-left.svg";

import { Link } from "react-router";

const NewNoteActions = () => {
  return (
    <div className={classes.new_note_action_container}>
      <div className={classes.left_col}>
        <Link className={classes.go_back_container} to="/home/all-notes">
          <img className={classes.left_arrow} src={ArroLeftIcon} alt="Go to all notes page" />
          <span className={classes.back_to_all_notes}>Go Back</span>
        </Link>
      </div>
      <div className={classes.right_col}>
        <ButtonNoOutline
          variant="white"
          src={null}
          hasImage={false}
          title="Cancel"
          type="button"
          btnImageClass=""
        />
        <ButtonNoOutline
          variant="blue"
          src={null}
          hasImage={false}
          title="Save Note"
          type="button"
          btnImageClass=""
        />
      </div>
    </div>
  );
};

export default NewNoteActions;
