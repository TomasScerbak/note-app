// import classes from "./Input.module.css";

const Input = ({ placeholder, name, type, onChange, ref }) => {
  return <input ref={ref} onChange={onChange} placeholder={placeholder} name={name} type={type} />;
};

export default Input;
