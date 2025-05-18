import { useState } from "react";

import Label from "./Label";
import Input from "./Input";
import HidePasswordButton from "./HidePasswordButton";
import InputMessage from "./InputMessage";

import classes from "./PasswordInputContainer.module.css";

const PasswordInputContainer = ({ htmlFor, text, placeholder, name, formType, onChange, ref, error }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };

  return (
    <div className={classes.password__container}>
      <Label htmlFor={htmlFor} text={text} />
      <Input
        placeholder={placeholder}
        name={name}
        type={hidePassword ? "password" : "text"}
        onChange={onChange}
        ref={ref}
      />
      {formType !== "login" && error ? <InputMessage text={error} level="critical" /> : null}
      <HidePasswordButton handleHidePassword={handleHidePassword} isHidden={hidePassword} />
    </div>
  );
};

export default PasswordInputContainer;
