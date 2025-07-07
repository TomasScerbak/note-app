import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loader_wrapper}>
      <div className={classes.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
