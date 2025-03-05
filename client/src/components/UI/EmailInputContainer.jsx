import { Link } from "react-router";

import Label from "./Label";
import Input from "./Input";

import classes from "./EmailInputContainer.module.css";

const EmailInputContainer = ({ htmlFor, text, placeholder, name, type, formType }) => {
  return (
    <>
      <div className={classes.email__container}>
        <Label htmlFor={htmlFor} text={text} />
        {formType === "login" ? (
          <Link to="/reset_password" className={classes.forgot}>
            Forgot
          </Link>
        ) : null}
      </div>
      <Input placeholder={placeholder} name={name} type={type} />
    </>
  );
};

export default EmailInputContainer;
