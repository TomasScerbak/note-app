import { Link } from "react-router";
import classes from "./SearchSubHeader.module.css";

const SearchSubHeder = () => {
  return (
    <div className={classes.search__subheader__container}>
      <p className={classes.search__subheader__text}>
        No notes match your search. Try a different keyword or{" "}
        <Link to="/home/create-note" className={classes.search__subheader_link}>
          create a new note
        </Link>
        .
      </p>
    </div>
  );
};

export default SearchSubHeder;
