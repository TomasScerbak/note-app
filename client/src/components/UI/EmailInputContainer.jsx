import InputMessage from "./InputMessage";

import Label from "./Label";
import Input from "./Input";

import classes from "./EmailInputContainer.module.css";

const EmailInputContainer = ({ htmlFor, text, placeholder, name, type, onChange, ref, error }) => {
  return (
    <>
      <div className={classes.email__container}>
        <Label htmlFor={htmlFor} text={text} />
      </div>
      <Input ref={ref} onChange={onChange} placeholder={placeholder} name={name} type={type} />
      {error ? <InputMessage text={error} level="critical" /> : null}
    </>
  );
};

export default EmailInputContainer;
