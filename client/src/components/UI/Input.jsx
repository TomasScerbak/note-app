// import classes from "./Input.module.css";

const Input = ({ placeholder, name, type, handleHideInfoMessage }) => {
  return <input onChange={handleHideInfoMessage} placeholder={placeholder} name={name} type={type} />;
};

export default Input;
