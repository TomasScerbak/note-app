import classes from "./AuthMediaBox.module.css";

import Button from "./UI/Button";

import GoogleImage from "../assets/icon-google.svg";

const AuthMediaBox = ({ text }) => {
  return (
    <div className={classes.auth_media}>
      <p>{text}</p>
      <Button
        variant="secondary"
        src={GoogleImage}
        hasImage={true}
        title="Google"
        type="button"
      />
    </div>
  );
};

export default AuthMediaBox;
