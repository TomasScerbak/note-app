import Form from "./Form";
import AuthHeader from "./AuthHeader";
import FormFooter from "./FormFooter";

import classes from "./AuthCard.module.css";

const AuthCard = ({ type }) => {
  return (
    <section className={classes.auth__card}>
      <AuthHeader type={type} />
      <Form type={type} />
      {type === "login" || type === "signup" ? (
        <FormFooter
          text={
            type === "login" ? "No account yet?" : "Already have an account?"
          }
          link={type === "login" ? "signup" : "/"}
          linkText={type === "login" ? "Signup" : "Login"}
        />
      ) : null}
    </section>
  );
};

export default AuthCard;
