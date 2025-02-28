import AuthHeader from "./AuthHeader";
import Form from "../Form";

import classes from "./AuthCard.module.css";

const AuthCard = () => {
  return (
    <section className={classes.auth_card}>
      <AuthHeader />
      <Form />
    </section>
  );
};

export default AuthCard;
