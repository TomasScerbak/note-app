import { useState } from "react";
import { Link } from "react-router";

import Label from "./Label";
import Input from "./Input";
import HidePasswordButton from "./HidePasswordButton";
import InputMessage from "./InputMessage";

import classes from "./PasswordInputContainer.module.css";

const PasswordInputContainer = ({ htmlFor, text, placeholder, name, formType, onChange, error }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };

  return (
    <div className={classes.password__container}>
      <div className={classes.password__label}>
        <Label htmlFor={htmlFor} text={text} />
        {formType === "login" ? (
          <Link to="/forgot_password" className={classes.forgot}>
            Forgot
          </Link>
        ) : null}
      </div>
      <Input
        placeholder={placeholder}
        name={name}
        type={hidePassword ? "password" : "text"}
        onChange={onChange}
      />
      {formType !== "login" && error ? <InputMessage text={error} level="critical" /> : null}
      <HidePasswordButton handleHidePassword={handleHidePassword} isHidden={hidePassword} />
    </div>
  );
};

export default PasswordInputContainer;
