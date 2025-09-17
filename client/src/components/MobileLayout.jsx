import { Outlet } from "react-router";
import HeaderSmall from "../components/HeaderSmall";
import Footer from "../components/Footer";
import classes from "./MobileLayout.module.css";

const MobileLayout = () => {
  return (
    <>
      <header className={classes.header}>
        <HeaderSmall />
      </header>
      <section className={classes.body}>
        <Outlet />
      </section>
      <section className={classes.footer}>
        <Footer />
      </section>
    </>
  );
};

export default MobileLayout;
