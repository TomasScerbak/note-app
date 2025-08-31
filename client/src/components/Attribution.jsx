import classes from "./Attribution.module.css";

const Attribution = () => {
  return (
    <section>
      <div className={classes.attribution}>
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">
          Frontend Mentor
        </a>
        . Coded by <span>Tomas Scerbak</span>. If you encounter any bugs or have feedback, feel free to{" "}
        <a href="https://sweet-cat-91a83d.netlify.app/#footer" target="_blank" rel="noopener noreferrer">
          contact me through my website
        </a>
        .
      </div>
    </section>
  );
};

export default Attribution;
