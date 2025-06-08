import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../UI/Button";

import classes from "./Modal.module.css";

const Modal = ({ header, message, setNoteErrors }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setNoteErrors({
      no_title_error: false,
      no_text_error: false,
    });
  };
  return (
    <>
      {isOpen ? (
        <div className={classes.backdrop}>
          <dialog open={isOpen} className={classes.modal}>
            <div className={classes.modal__content}>
              <h3 className={classes.modal__header}>{header}</h3>
              <p className={classes.modal__text}>{message}</p>
              <div className={classes.modal__footer}>
                <Button
                  size="small"
                  variant="primary"
                  title="Close"
                  onClick={handleClose}
                  className={classes.close__button}
                />
              </div>
            </div>
          </dialog>
        </div>
      ) : null}
    </>
  );
};

const DefaultModal = ({ header, message, setNoteErrors }) => {
  return ReactDOM.createPortal(
    <Modal header={header} message={message} setNoteErrors={setNoteErrors} />,
    document.querySelector("#modal")
  );
};

export default DefaultModal;
