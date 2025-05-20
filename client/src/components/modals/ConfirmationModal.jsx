/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/authContext";
import ReactDOM from "react-dom";

import classes from "./ConfirmationModal.module.css";
import Button from "../UI/Button";

const ConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { setPasswordResetSent } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setPasswordResetSent(false);
    navigate("/");
  };
  return (
    <>
      {isOpen ? (
        <div className={classes.backdrop}>
          <dialog open={isOpen} className={classes.modal}>
            <div className={classes.modal__content}>
              <h3 className={classes.modal__header}>Password Reset Request Sent</h3>
              <p className={classes.modal__text}>
                We&apos;ve sent an email with a link to reset your password. Please check your inbox and
                follow the instructions. If you don&apos;t see the email, check your spam or junk folder. If
                you need further assistance, contact support.
              </p>
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

const Modal = (props) => {
  return ReactDOM.createPortal(<ConfirmationModal />, document.querySelector("#modal"));
};

export default Modal;
