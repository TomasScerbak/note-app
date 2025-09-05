import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useNotes } from "../contexts/notesContext";
import { initialBtnData, getBtnImages } from "../utils/desktopButtonsUtils";

import classes from "./ParentAppGrid.module.css";
import PlusImage from "../assets/icon-plus.svg";

import Logo from "../components/UI/Logo";
import HeaderSmall from "../components/HeaderSmall";
import Footer from "../components/Footer";
import Button from "../components/UI/Button";
import SearchInput from "../components/UI/SearchInput";
import Loader from "../components/UI/Loader";
import AllNotes from "../components/AllNotes";
import Separator from "../components/UI/Separator";
import ViewNotePage from "./ViewNotePage";

const ParentAppGrid = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, searchTerm, handleSearchChange } = useNotes();
  const [deskBtnData, setDeskBtnData] = useState(initialBtnData);
  const [activeNoteId, setActiveNoteId] = useState(null);
  console.log("activenote id", activeNoteId);
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

  const handleActiveBtn = (id) => {
    setDeskBtnData((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, active: true } : { ...btn, active: false }))
    );
  };

  const activeBtn = deskBtnData.find((btn) => btn.active);

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
      <div className={classes.left__sidebar}>
        {deskBtnData.map((btn) => {
          const { img } = getBtnImages(btn, theme);
          return (
            <Button
              key={btn.id}
              active={btn.active}
              src={img}
              secondarySrc={btn.img2}
              type={btn.type}
              hasImage={true}
              size={btn.size}
              variant={btn.variant}
              title={btn.title}
              btnImageClass="image-left"
              btnSecondaryImageClass="image-right"
              onClick={() => handleActiveBtn(btn.id)}
            />
          );
        })}
        <Separator />
      </div>
      <section className={classes.left_inner_panel}>
        <Button size="large" variant="primary" title="Create New Note " />
        {searchTerm ? message : null}
        {isLoading ? <Loader /> : null}
        {searchTerm || activeBtn.title !== "All Notes" ? null : (
          <AllNotes isDesktop={true} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} />
        )}
      </section>
      <section className={classes.right_inner_panel}>
        {activeBtn.title === "All Notes" && activeNoteId && !searchTerm ? (
          <ViewNotePage isDesktop={true} deskNoteId={activeNoteId} />
        ) : null}
      </section>
      <aside className={classes.right__sidebar}>6</aside>
    </section>
  );
};

export default ParentAppGrid;
