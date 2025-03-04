import AuthHeader from "./AuthHeader";
import Form from "../Form";

import classes from "./AuthCard.module.css";
import FormFooter from "./FormFooter";

const AuthCard = ({ type }) => {
  return (
    <section className={classes.auth__card}>
      <AuthHeader type={type} />
      <Form type={type} />
      {type === "login" || type === "signup" ? (
        <FormFooter type={type} />
      ) : null}
    </section>
  );
};

export default AuthCard;
