import { useAuth } from "../contexts/authContext";

import classes from "./AuthMediaBox.module.css";
import Button from "./UI/Button";
import GoogleImage from "../assets/icon-google.svg";

const AuthMediaBox = ({ text }) => {
  const { signInWiGoogle } = useAuth();

  const handleGoogleSignIn = () => {
    signInWiGoogle();
  };

  return (
    <div className={classes.auth_media}>
      <p>{text}</p>
      <Button
        variant="secondary"
        src={GoogleImage}
        hasImage={true}
        title="Google"
        type="button"
        onClick={handleGoogleSignIn}
        btnImageClass="btn__image__google"
      />
    </div>
  );
};

export default AuthMediaBox;
