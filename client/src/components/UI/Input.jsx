import classes from "./Input.module.css";

const Input = ({ placeholder, name, type, onChange }) => {
  return (
    <input className={classes.input} onChange={onChange} placeholder={placeholder} name={name} type={type} />
  );
};

export default Input;
