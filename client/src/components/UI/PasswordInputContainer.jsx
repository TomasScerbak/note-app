import { useState } from "react";

import Label from "./Label";
import Input from "./Input";
import HidePasswordButton from "./HidePasswordButton";

import classes from "./PasswordInputContainer.module.css";

const PasswordInputContainer = ({ htmlFor, text, placeholder, name }) => {
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
      />
      <HidePasswordButton
        handleHidePassword={handleHidePassword}
        isHidden={hidePassword}
      />
    </div>
  );
};

export default PasswordInputContainer;
