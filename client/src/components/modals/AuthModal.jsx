/* eslint-disable no-unused-vars */
import { useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../../contexts/authContext";
import { extractFirebaseAuthError } from "../../utils/noteUtils";

import Button from "../UI/Button";

import classes from "./AuthModal.module.css";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { authError, setAuthError } = useAuth();

  const extractedAuthError = extractFirebaseAuthError(authError);

  let errorMessage = null;
  switch (extractedAuthError) {
    case "auth/invalid-credential":
      errorMessage = "Invalid credentials.";
      break;
    case "auth/user-not-found":
      errorMessage = "User not found.";
      break;
    case "auth/wrong-password":
      errorMessage = "Incorrect password.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "Email already in use.";
      break;
    case "auth/weak-password":
      errorMessage = "Weak password.";
      break;
    case "auth/email-already-exists":
      errorMessage = "The provided email is already in use.";
      break;
    case "auth/id-token-expired":
      errorMessage = "The Firebase ID token has expired.";
      break;
    case "auth/id-token-revoked":
      errorMessage = "The Firebase ID token has been revoked.";
      break;
    case "auth/invalid-email":
      errorMessage = "The provided email is not valid.";
      break;
    case "auth/too-many-requests":
      errorMessage = "Too many requests. Please try again later.";
      break;
    case "auth/network-request-failed":
      errorMessage = "Network error. Please check your connection.";
      break;
    default:
      errorMessage = "An unexpected authentication error occurred.";
  }

  const handleClose = () => {
    setIsOpen(false);
    setAuthError(null);
  };
  return (
    <>
      {isOpen ? (
        <div className={classes.backdrop}>
          <dialog open={isOpen} className={classes.modal}>
            <div className={classes.modal__content}>
              <h3 className={classes.modal__header}>Please Note</h3>
              <p className={classes.modal__text}>{errorMessage}</p>
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
  return ReactDOM.createPortal(<AuthModal />, document.querySelector("#modal"));
};

export default Modal;
