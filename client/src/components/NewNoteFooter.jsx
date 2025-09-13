import { newNoteFooterBtns } from "../utils/desktopButtonsUtils";

import classes from "./NewNoteFooter.module.css";
import Button from "./UI/Button";

const NewNoteFooter = ({ onSaveNote, handleClearValues }) => {
  return (
    <div className={classes.footer__container}>
      {newNoteFooterBtns.map((btn) => {
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
            onClick={btn.title === "Save Note" ? onSaveNote : handleClearValues}
          />
        );
      })}
    </div>
  );
};

export default NewNoteFooter;
