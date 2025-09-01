import { isValidEmail, isValidPassword } from "../validations/emailValidation";

export const getButtonAndMediaBoxText = (type) => {
  switch (type) {
    case "signup":
    case "login":
      return {
        btnTitle: type === "signup" ? "Sign Up" : "Login",
        mediaBoxText: "Or log in with:",
      };
    case "reset":
      return {
        btnTitle: "Reset Password",
        mediaBoxText: "",
      };
    case "forgotten":
      return {
        btnTitle: "Send Reset Link",
        mediaBoxText: "",
      };
    default:
      return {
        btnTitle: "Login",
        mediaBoxText: "Or log in with:",
      };
  }
};

export const validateInput = ({ name, value, type }) => {
  if (name === "email" && value && !isValidEmail(value) && (type === "signup" || type === "forgotten")) {
    return "Please enter a valid email address.";
  }

  if (name === "password" && value && !isValidPassword(value) && type !== "login") {
    return "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
  }

  return "";
};

export const validateFormBeforeSubmit = (formDataObj, type) => {
  const errors = {};

  if (!formDataObj.email) {
    errors.email = "Please enter a valid email address.";
  }

  if (!formDataObj.password && type !== "forgotten") {
    errors.password = "Please enter a valid password.";
  }

  return errors;
};

export const trimFormData = (formDataObj) => {
  return {
    ...formDataObj,
    email: formDataObj.email?.trim() || "",
    password: formDataObj.password?.trim() || "",
  };
};
