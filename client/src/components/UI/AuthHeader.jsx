import Logo from "./Logo";

import classes from "./Logo.module.css";

const AuthHeader = () => {
  return (
    <header>
      <Logo />
      <h1>Welcome to Note</h1>
      <p className={classes.logo_text}>Please log in to continue </p>
    </header>
  );
};

export default AuthHeader;
