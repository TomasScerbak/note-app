import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useNotes } from "../contexts/notesContext";

import classes from "./ParentAppGrid.module.css";
import PlusImage from "../assets/icon-plus.svg";

import Logo from "../components/UI/Logo";
import HeaderSmall from "../components/HeaderSmall";
import Footer from "../components/Footer";
import Button from "../components/UI/Button";
import SearchInput from "../components/UI/SearchInput";
import Loader from "../components/UI/Loader";
import AllNotes from "../components/AllNotes";

const ParentAppGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, searchTerm, isError, error, hasSearched, filteredNotes, handleSearchChange } =
    useNotes();

  console.log("searchTerm", searchTerm);
  console.log("hasSearched", hasSearched);
  console.log("filteredNotes", filteredNotes);

  const validURLs = ["/home/all-notes", "/home/archive-notes", "/home/search-notes", "/home/tag-list"];

  let headerText = "";

  switch (location.pathname) {
    case "/home/all-notes":
      headerText = "All Notes";
      break;
    case "/home/archive-notes":
      headerText = "Archive Notes";
      break;
    default:
      headerText = "All Notes";
  }

  const message = searchTerm.length ? (
    <p style={{ color: "var(--app-secondary-text)" }}>
      All notes matching
      <strong>
        <q>{searchTerm}</q>
      </strong>
      are displayed below.
    </p>
  ) : (
    ""
  );

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
      <header className={classes.top__header}>
        {searchTerm.length ? (
          <h1 style={{ color: "var(--app-secondary-text)" }}>
            Showing results for:
            <q style={{ color: "var(--app-primary-text)", marginLeft: "1rem" }}>{searchTerm}</q>
          </h1>
        ) : (
          <h1>{headerText}</h1>
        )}
        <SearchInput
          onChange={(e) => handleSearchChange(e.target.value)}
          message={message}
          placeholder="Search by title, content, or tags..."
          isDesktop={true}
        />
      </header>
      <div className={classes.left__sidebar}></div>
      <section className={classes.left_inner_panel}>
        <Button size="large" variant="primary" title="Create New Note " />
        {searchTerm ? message : null}
        {isLoading ? <Loader /> : null}
        <AllNotes isDesktop={true} />
      </section>
      <section className={classes.right_inner_panel}>5</section>
      <aside className={classes.right__sidebar}>6</aside>
    </section>
  );
};

export default ParentAppGrid;
