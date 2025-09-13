import { newNoteFooterBtns } from "../utils/desktopButtonsUtils";

import classes from "./NoteFooter.module.css";
import Button from "./UI/Button";

const NoteFooter = ({ onSaveNote, handleClearValues, isNewNoteRequested }) => {
  const visibleButtons = newNoteFooterBtns
    .filter((btn) => !(btn.title === "Cancel" && !isNewNoteRequested))
    .map((btn) => {
      // Dynamically change "Save Note" to "Update Note"
      if (btn.title === "Save Note" && !isNewNoteRequested) {
        return { ...btn, title: "Update Note" };
      }
      return btn;
    });
  return (
    <div className={classes.footer__container}>
      {visibleButtons.map((btn) => {
        console.log(btn);
        return (
          <Button
            key={btn.id}
            active={btn.active}
            src={btn.img}
            secondarySrc={btn.img2}
            type={btn.type}
            hasImage={true}
            size={btn.size}
            variant={btn.variant}
            title={btn.title}
            btnImageClass="image-left"
            btnSecondaryImageClass="image-right"
            onClick={
              btn.title === "Save Note" || btn.title === "Update Note" ? onSaveNote : handleClearValues
            }
          />
        );
      })}
    </div>
  );
};

export default NoteFooter;
