import classes from "./Attribution.module.css";

const Attribution = () => {
  return (
    <section>
      <div className={classes.attribution}>
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Tomas Scerbak</a>.
      </div>
    </section>
  );
};

export default Attribution;
