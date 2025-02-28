import AuthHeader from "./AuthHeader";

import classes from "./AuthCard.module.css";

const AuthCard = () => {
  return (
    <section className={classes.auth_card}>
      <AuthHeader />
    </section>
  );
};

export default AuthCard;
