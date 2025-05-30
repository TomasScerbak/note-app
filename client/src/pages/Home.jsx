// import { useAuth } from "../contexts/authContext";
import { Outlet } from "react-router";

import Main from "./Main";
import HeaderSmall from "../components/HeaderSmall";
import Footer from "../components/Footer";

import classes from "./Home.module.css";

const Home = () => {
  // const { user, isLoading, isLoggedIn, signOut } = useAuth();

  // const handleSignOut = async () => {
  //   await signOut();
  // };

  return (
    <Main>
      <div className={classes.parent}>
        <div className={classes.header}>
          <HeaderSmall />
        </div>
        <div className={classes.body}>
          <Outlet />
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
        <div className={classes.top__left}>1</div>
        <div className={classes.top__header}>0</div>
        <div className={classes.left__sidebar}>2</div>
        <div className={classes.top__header}>3</div>
        <div className={classes.left_inner_panel}>4</div>
        <div className={classes.right_inner_panel}>5</div>
        <div className={classes.right__sidebar}>6</div>
      </div>
    </Main>
  );
};

export default Home;
