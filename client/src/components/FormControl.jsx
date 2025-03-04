import classes from "./FormControl.module.css";

const FormControl = ({ children }) => {
  return <div className={classes.form__control}>{children}</div>;
};

export default FormControl;
