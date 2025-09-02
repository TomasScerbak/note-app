import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";

import classes from "./ParentAppGrid.module.css";

import Logo from "../components/Logo";
import HeaderSmall from "../components/HeaderSmall";
import Footer from "../components/Footer";
import Button from "../components/UI/Button";

import PlusImage from "../assets/icon-plus.svg";

const ParentAppGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const validURLs = ["/home/all-notes", "/home/archive-notes", "/home/search-notes", "/home/tag-list"];

  const navigateToNewNote = () => {
    navigate("/home/create-note");
  };
  return (
    <section className={classes.parent}>
      {validURLs.includes(location.pathname) ? (
        <Button
          onClick={navigateToNewNote}
          variant="primary"
          hasImage={true}
          type="button"
          size="rounded"
          src={PlusImage}
        />
      ) : null}
      <header className={classes.header}>
        <HeaderSmall />
      </header>
      <section className={classes.body}>
        <Outlet />
      </section>
      <section className={classes.footer}>
        <Footer />
      </section>
      <section className={classes.top__left}>
        <Logo />
      </section>
      <header className={classes.top__header}>0</header>
      <aside className={classes.left__sidebar}>2</aside>
      <header className={classes.top__header}>3</header>
      <section className={classes.left_inner_panel}>4</section>
      <section className={classes.right_inner_panel}>5</section>
      <aside className={classes.right__sidebar}>6</aside>
    </section>
  );
};

export default ParentAppGrid;
