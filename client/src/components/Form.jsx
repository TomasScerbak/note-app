import classes from "./Form.module.css";

import AuthMediaBox from "./AuthMediaBox";
import Button from "./UI/Button";
import FormControl from "./FormControl";
import EmailInputContainer from "./UI/EmailInputContainer";
import PasswordInputContainer from "./UI/PasswordInputContainer";

const Form = ({ type }) => {
  return (
    <form className={classes.form}>
      <FormControl className={classes.form__control}>
        {type === "signup" || type === "login" || type === "forgotten" ? (
          <EmailInputContainer
            htmlFor="email"
            text="Email Address"
            placeholder="email@example.com"
            type="email"
            name="email"
          />
        ) : (
          <PasswordInputContainer
            htmlFor="new_password"
            text="New Password"
            placeholder=""
            type="password"
            name="new_password"
          />
        )}
      </FormControl>
      <FormControl className={classes.form__control}>
        {type === "forgotten" ? null : (
          <PasswordInputContainer
            htmlFor={type === "reset" ? "new_password" : "password"}
            text={type === "reset" ? "Confirm New Password" : "Password"}
            placeholder=""
            name={type === "reset" ? "new_password" : "password"}
          />
        )}
      </FormControl>
      <Button variant="primary" hasImage={false} title="Login" type="button" />
      <AuthMediaBox text="Or log in with:" />
    </form>
  );
};

export default Form;
