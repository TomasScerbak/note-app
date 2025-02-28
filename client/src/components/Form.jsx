import { Link } from "react-router";
import { useState } from "react";

import classes from "./Form.module.css";

import ShowPasswordIcon from "../assets/icon-show-password.svg";
import HidePasswordIcon from "../assets/icon-hide-password.svg";

const Form = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };
  return (
    <form>
      <div className={classes.form_control}>
        <div className={classes.email_label_container}>
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
      <div className={classes.form_control}>
        <label htmlFor="password">Password</label>
        <div className={classes.password_input_container}>
          <input
            name="password"
            type={hidePassword ? "password" : "text"}
            required
          />
          <button
            onClick={handleHidePassword}
            type="button"
            className={classes.password_btn}
          >
            <img
              src={hidePassword ? HidePasswordIcon : ShowPasswordIcon}
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
