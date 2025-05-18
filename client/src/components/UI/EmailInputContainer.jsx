import { Link } from "react-router";
import InputMessage from "./InputMessage";

import Label from "./Label";
import Input from "./Input";

import classes from "./EmailInputContainer.module.css";

const EmailInputContainer = ({ htmlFor, text, placeholder, name, type, formType, onChange, ref, error }) => {
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
      <Input ref={ref} onChange={onChange} placeholder={placeholder} name={name} type={type} />
      {error ? <InputMessage text={error} level="critical" /> : null}
    </>
  );
};

export default EmailInputContainer;
