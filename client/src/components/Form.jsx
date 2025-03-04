import { Link } from "react-router";
import { useState } from "react";

import classes from "./Form.module.css";

import HidePasswordButton from "./UI/HidePasswordButton";
import AuthMediaBox from "./UI/AuthMediaBox";
import Button from "./UI/Button";

const Form = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };

  return (
    <form className={classes.form}>
      <div className={classes.form__control}>
        <div className={classes.email__label__container}>
          <label htmlFor="email">Email Address</label>
          <Link to="/reset_password" className={classes.forgot}>
            Forgot
          </Link>
        </div>
        <input
          placeholder="email@example.com"
          name="email"
          type="text"
          required
        />
      </div>
      <div className={classes.form__control}>
        <label htmlFor="password">Password</label>
        <div className={classes.password__input__container}>
          <input
            name="password"
            type={hidePassword ? "password" : "text"}
            required
          />
          <HidePasswordButton
            handleHidePassword={handleHidePassword}
            isHidden={hidePassword}
          />
        </div>
      </div>
      <Button variant="primary" hasImage={false} title="Login" type="button" />
      <AuthMediaBox text="Or log in with:" />
    </form>
  );
};

export default Form;
