import ReactDOM from "react-dom";

import Button from "../UI/Button";
import classes from "./CallToActionModal.module.css";

const CallToActionModal = ({ image, header, message, btnsArr = [] }) => {
  return (
    <div className={classes.modal__overlay}>
      <dialog open className={classes.modal}>
        <div className={classes.modal__content__wrapper}>
          <div className={classes.modal__content}>
            <div className={classes.content__left}>
              <div className={classes.image__square}>
                {image && <img className={classes.square__image} src={image} alt="Modal visual" />}
              </div>
            </div>
            <div className={classes.content__right}>
              <h3 className={classes.modal__header}>{header}</h3>
              <p className={classes.modal__text}>{message}</p>
            </div>
          </div>
          <div className={classes.modal__footer}>
            {btnsArr.map((btn, index) => (
              <Button
                key={index}
                size={btn.size}
                variant={btn.variant}
                title={btn.title}
                onClick={btn.onClick}
                className={classes.close__button}
              />
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

const ActionModal = ({ image, header, message, btnsArr }) => {
  return ReactDOM.createPortal(
    <CallToActionModal image={image} header={header} message={message} btnsArr={btnsArr} />,
    document.querySelector("#modal-center")
  );
};

export default ActionModal;
