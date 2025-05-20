import Logo from "../components/UI/Logo";

import classes from "./HeaderSmall.module.css";

const HeaderSmall = () => {
  return (
    <div className={classes.header_small}>
      <Logo />
    </div>
  );
};

export default HeaderSmall;
