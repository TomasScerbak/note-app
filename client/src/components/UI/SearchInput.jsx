import SearchImage from "../../assets/icon-search.svg";
import classes from "./SearchInput.module.css";

const SearchInput = ({ placeholder, name, type, onChange, message }) => {
  return (
    <>
      <div className={classes.search__input__container}>
        <input
          className={classes.search__input}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
        ></input>
        <img className={classes.seach__input__image} src={SearchImage} alt="search icon" />
      </div>
      <p>{message}</p>
    </>
  );
};

export default SearchInput;
