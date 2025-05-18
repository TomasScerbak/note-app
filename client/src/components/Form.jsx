import { useState } from "react";
import { useAuth } from "../contexts/authContext";

import classes from "./Form.module.css";

import AuthMediaBox from "./AuthMediaBox";
import Button from "./UI/Button";
import FormControl from "./FormControl";
import EmailInputContainer from "./UI/EmailInputContainer";
import PasswordInputContainer from "./UI/PasswordInputContainer";

const Form = ({ type }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const { signUp, signIn } = useAuth();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    setFormData((prevState) => ({
      ...prevState,
      email: formDataObj.email.trim(),
      password: formDataObj.password.trim(),
    }));

    switch (type) {
      case "signup":
        await signUp(formDataObj.email, formDataObj.password);
        break;
      case "login":
        await signIn(formDataObj.email, formDataObj.password);
        break;
      case "reset":
        // handleResetPassword(formDataObj);
        break;
      case "forgotten":
        // handleForgottenPassword(formDataObj);
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
          />
        ) : (
          <PasswordInputContainer
            htmlFor="new_password"
            text="New Password"
            placeholder=""
            type="password"
            name="new_password"
            formType={type}
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
    </form>
  );
};

export default Form;
