import { useState, useRef } from "react";
import { useAuth } from "../contexts/authContext";
import { isValidEmail, isValidPassword } from "../validations/emailValidation";

import classes from "./Form.module.css";

import AuthMediaBox from "./AuthMediaBox";
import Button from "./UI/Button";
import FormControl from "./FormControl";
import EmailInputContainer from "./UI/EmailInputContainer";
import PasswordInputContainer from "./UI/PasswordInputContainer";
import AuthModal from "./modals/AuthModal";
import ConfirmationModal from "./modals/ConfirmationModal";

const Form = ({ type }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState({});
  const [typingTimeout, setTypingTimeout] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const { signUp, signIn, passwordResetEmail, authError, passwordResetSent } = useAuth();

  let btnTitle;
  let mediaBoxText;

  switch (type) {
    case "signup":
      btnTitle = "Sign Up";
      mediaBoxText = "Or log in with:";
      break;
    case "login":
      btnTitle = "Login";
      mediaBoxText = "Or log in with:";
      break;
    case "reset":
      btnTitle = "Reset Password";
      mediaBoxText = "";
      break;
    case "forgotten":
      btnTitle = "Send Reset Link";
      mediaBoxText = "";
      break;
    default:
      btnTitle = "Login";
      mediaBoxText = "Or log in with:";
  }

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
        if (
          name === "email" &&
          value &&
          !isValidEmail(value) &&
          (type === "signup" || type === "forgotten")
        ) {
          setError((prev) => ({ ...prev, [name]: "Please enter a valid email address." }));
        }

        if (name === "password" && !isValidPassword(value) && value && type !== "login") {
          setError((prev) => ({
            ...prev,
            [name]:
              "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
          }));
        }
      }, 500) // Adjust timeout duration as needed (500ms delay)
    );
  };

  const handleSubmit = async (event) => {
    console.log("Form submitted");
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log("Form data:", formDataObj);
    // Validate email and password before submission
    if (!formDataObj.email) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    }
    if (!formDataObj.password) {
      setError((prev) => ({
        ...prev,
        password: "Please enter a valid password.",
      }));
    }

    // If either field is missing, prevent form submission
    if (type !== "forgotten" && (!formDataObj.email || !formDataObj.password)) return;

    setFormData((prevState) => ({
      ...prevState,
      email: formDataObj.email ? formDataObj.email.trim() : formDataObj.email,
      password: formDataObj.password ? formDataObj.password.trim() : formDataObj.password,
    }));

    switch (type) {
      case "signup":
        await signUp(formDataObj.email, formDataObj.password);
        break;
      case "login":
        await signIn(formDataObj.email, formDataObj.password);
        break;
      case "reset":
        //
        break;
      case "forgotten":
        passwordResetEmail(formDataObj.email);
        break;
      default:
        console.log("Invalid form type");
    }
  };

  return (
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
            ref={emailRef}
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
            ref={passwordRef}
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
            ref={passwordRef}
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
  );
};

export default Form;
