import { useState } from "react";
import { useAuth } from "../contexts/authContext";

import {
  getButtonAndMediaText,
  validateInput,
  validateFormBeforeSubmit,
  trimFormData,
} from "../utils/formUtils.js";

import classes from "./Form.module.css";

import AuthMediaBox from "./AuthMediaBox";
import Button from "./UI/Button";
import FormControl from "./FormControl";
import EmailInputContainer from "./UI/EmailInputContainer";
import PasswordInputContainer from "./UI/PasswordInputContainer";
import AuthModal from "./modals/AuthModal";
import ConfirmationModal from "./modals/ConfirmationModal";
import Loader from "./UI/Loader";

const Form = ({ type }) => {
  const [error, setError] = useState({});
  const [typingTimeout, setTypingTimeout] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const { signUp, signIn, passwordResetEmail, authError, passwordResetSent, isLoading } = useAuth();
  const { btnTitle, mediaBoxText } = getButtonAndMediaText(type);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the previous timeout to prevent premature validation
    if (typingTimeout) {
      setError((prev) => ({ ...prev, [name]: "" })); // Clear the error message
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to validate the input after the user stops typing
    setTypingTimeout(
      setTimeout(() => {
        const errorMsg = validateInput({ name, value, type });
        if (errorMsg) {
          setError((prev) => ({ ...prev, [name]: errorMsg }));
        }
      }, 500) // Adjust timeout duration as needed (500ms delay)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const errors = validateFormBeforeSubmit(formDataObj, type);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const trimmedData = trimFormData(formDataObj);
    setFormData((prevState) => ({ ...prevState, ...trimmedData }));

    switch (type) {
      case "signup":
        await signUp(trimmedData.email, trimmedData.password);
        break;
      case "login":
        await signIn(trimmedData.email, trimmedData.password);
        break;
      case "forgotten":
        passwordResetEmail(trimmedData.email);
        break;
      default:
        console.error("Invalid form type");
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl className={classes.form__control}>
          {type === "signup" || type === "login" || type === "forgotten" ? (
            <EmailInputContainer
              htmlFor="email"
              text="Email Address"
              placeholder="email@example.com"
              type="email"
              name="email"
              formType={type}
              onChange={handleInputChange}
              error={error.email}
            />
          ) : (
            <PasswordInputContainer
              htmlFor="new_password"
              text="New Password"
              placeholder=""
              type="password"
              name="new_password"
              formType={type}
              onChange={handleInputChange}
              error={error.new_password}
            />
          )}
        </FormControl>
        <FormControl className={classes.form__control}>
          {type === "forgotten" ? null : (
            <PasswordInputContainer
              htmlFor={type === "reset" ? "confirm_password" : "password"}
              text={type === "reset" ? "Confirm New Password" : "Password"}
              placeholder=""
              name={type === "reset" ? "confirm_password" : "password"}
              formType={type}
              onChange={handleInputChange}
              error={type === "reset" ? error.confirm_password : error.password}
            />
          )}
        </FormControl>
        <Button
          variant="primary"
          hasImage={false}
          title={btnTitle}
          type="submit"
          formDataObj={formData}
          formType={type}
        />
        {type === "login" || type === "signup" ? <AuthMediaBox text={mediaBoxText} /> : null}
        {authError ? <AuthModal /> : null}
        {passwordResetSent ? <ConfirmationModal /> : null}
      </form>
    </>
  );
};

export default Form;
