import { Link } from "react-router";

import classes from "./FormFooter.module.css";

const FormFooter = ({ text, link, linkText }) => {
  return (
    <footer className={classes.footer}>
      <p className={classes.footer__text}>{text}</p>
      <Link to={link} className={classes.footer__link}>
        {linkText}
      </Link>
    </footer>
  );
};

export default FormFooter;
