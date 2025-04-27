import { useState } from "react";

import Label from "./Label";
import Input from "./Input";
import HidePasswordButton from "./HidePasswordButton";
import InputMessage from "./InputMessage";

import classes from "./PasswordInputContainer.module.css";

const PasswordInputContainer = ({ htmlFor, text, placeholder, name, formType }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideInfoMessage, setHideInfoMessage] = useState(false);

  const handleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };

  const handleHideInfoMessage = (event) => {
    const value = event.target.value;
    setHideInfoMessage(value.length > 8);
  };

  return (
    <div className={classes.password__container}>
      <Label htmlFor={htmlFor} text={text} />
      <Input
        handleHideInfoMessage={handleHideInfoMessage}
        placeholder={placeholder}
        name={name}
        type={hidePassword ? "password" : "text"}
      />
      {!hideInfoMessage && name === "new_password" && (
        <InputMessage text="At least 8 characters" level="critical" />
      )}
      {!hideInfoMessage && formType === "signup" && <InputMessage text="At least 8 characters" />}
      {/* {!hideInfoMessage && name === "new_password" && <PasswordInfoMessage />} */}
      {/* {!hideInfoMessage && formType === "signup" && <PasswordInfoMessage />} */}
      <HidePasswordButton handleHidePassword={handleHidePassword} isHidden={hidePassword} />
    </div>
  );
};

export default PasswordInputContainer;
