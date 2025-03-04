import Logo from "./UI/Logo";

import classes from "./AuthHeader.module.css";

const AuthHeader = ({ type }) => {
  let headerText;
  let headerSubText;

  switch (type) {
    case "signup":
      headerText = "Create Your Account";
      headerSubText =
        "Sign up to start organizing your notes and boost your productivity.";
      break;
    case "login":
      headerText = "Welcome to Note";
      headerSubText = "Please log in to continue";
      break;
    case "reset":
      headerText = "Reset Your Password";
      headerSubText = "Choose a new password to secure your account.";
      break;
    case "forgotten":
      headerText = "Forgotten your password?";
      headerSubText =
        "Enter your email below, and we’ll send you a link to reset it.";
      break;
    default:
      headerText = "Welcome to Note";
      headerSubText = "Please log in to continue";
  }

  return (
    <header className={classes.auth__header}>
      <Logo />
      <h1>{headerText}</h1>
      <p className={classes.logo__text}>{headerSubText} </p>
    </header>
  );
};

export default AuthHeader;
