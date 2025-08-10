import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";

import classes from "./ParentAppGrid.module.css";

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
    <div className={classes.parent}>
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
  );
};

export default ParentAppGrid;
