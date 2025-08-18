import classes from "./RadioButton.module.css";

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <label className={classes.radioContainer}>
      <input
        type="radio"
        className={classes.radioInput}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
