import SearchImage from "../../assets/icon-search.svg";
import classes from "./SearchInput.module.css";

const SearchInput = ({ value, placeholder, name, type, onChange, message, isDesktop = false }) => {
  return (
    <>
      <div className={classes.search__input__container}>
        <input
          className={classes.search__input}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
        ></input>
        <img className={classes.seach__input__image} src={SearchImage} alt="search icon" />
      </div>
      {!isDesktop ? message : null}
    </>
  );
};

export default SearchInput;
