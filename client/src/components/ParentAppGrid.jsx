import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useNotes } from "../contexts/notesContext";
import { initialBtnData, getBtnImages, btnActionsData } from "../utils/desktopButtonsUtils";
import { formatDate } from "../utils/noteUtils";
import useIsMobileOrTablet from "../hooks/useIsMobileOrTablet";

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
import NewNote from "./NewNote";
import NoteCard from "./NoteCard";

const ParentAppGrid = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileOrTablet = useIsMobileOrTablet();
  const { isLoading, searchTerm, handleSearchChange, filteredNotes, filteredArchivedNotes, archivedNotes } =
    useNotes();
  const [deskBtnData, setDeskBtnData] = useState(initialBtnData);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isNewNoteRequested, setIsNewNoteRequested] = useState(false);

  const validURLs = ["/home/all-notes", "/home/archive-notes", "/home/search-notes", "/home/tag-list"];

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
  // only for tablet and mobile version
  const navigateToNewNote = () => {
    navigate("/home/create-note");
  };

  const handleActiveBtn = (id) => {
    setDeskBtnData((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, active: true } : { ...btn, active: false }))
    );
    setActiveNoteId("");
    setIsNewNoteRequested(false);
    handleSearchChange("");
  };

  const activeBtn = deskBtnData.find((btn) => btn.active);
  const headerText = activeBtn.title === "All Notes" ? "All Notes" : "Archived Notes";

  const handleCreateNewNote = () => {
    setIsNewNoteRequested(true);
    handleSearchChange("");
    setActiveNoteId("");
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
      {isMobileOrTablet ? (
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
      ) : null}
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
          onChange={(e) => {
            handleSearchChange(e.target.value);
            setActiveNoteId("");
          }}
          message={message}
          placeholder="Search by title, content, or tags..."
          isDesktop={true}
          value={searchTerm ?? ""}
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
        <Button onClick={handleCreateNewNote} size="large" variant="primary" title="Create New Note " />
        {searchTerm ? message : null}
        {searchTerm || activeBtn.title !== "All Notes" ? null : (
          <AllNotes
            isDesktop={true}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            setIsNewNoteRequested={setIsNewNoteRequested}
          />
        )}
        {searchTerm && activeBtn.title === "All Notes"
          ? filteredNotes.map((note) => {
              return (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  tags={note.tags ? note.tags.split(",") : []}
                  noteHeading={note.header}
                  lastEdited={formatDate(note.updated_at)}
                  onCardClick={() => {
                    setActiveNoteId(note.id);
                    setIsNewNoteRequested(false);
                    handleSearchChange("");
                  }}
                  isActive={activeNoteId === note.id}
                  isDesktop={true}
                />
              );
            })
          : null}
        {searchTerm && activeBtn.title === "Archived Notes"
          ? filteredArchivedNotes.map((note) => {
              return (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  tags={note.tags ? note.tags.split(",") : []}
                  noteHeading={note.header}
                  lastEdited={formatDate(note.updated_at)}
                  onCardClick={() => {
                    setActiveNoteId(note.id);
                    setIsNewNoteRequested(false);
                    handleSearchChange("");
                  }}
                  isActive={activeNoteId === note.id}
                  isDesktop={true}
                />
              );
            })
          : null}
        {activeBtn.title === "Archived Notes" && !searchTerm
          ? archivedNotes.map((note) => {
              return (
                <div key={note.id} className={classes.archived__notes__container}>
                  <NoteCard
                    key={note.id}
                    id={note.id}
                    tags={note.tags ? note.tags.split(",") : []}
                    noteHeading={note.header}
                    lastEdited={formatDate(note.updated_at)}
                    onCardClick={() => {
                      setActiveNoteId(note.id);
                      setIsNewNoteRequested(false);
                      handleSearchChange("");
                    }}
                    isActive={activeNoteId === note.id}
                    isDesktop={true}
                  />
                </div>
              );
            })
          : null}
        {isLoading ? <Loader /> : null}
      </section>
      <section className={classes.right_inner_panel}>
        {(activeBtn.title === "All Notes" || activeBtn.title === "Archived Notes") &&
        activeNoteId &&
        !isNewNoteRequested ? (
          <ViewNotePage isDesktop={true} deskNoteId={activeNoteId} />
        ) : null}
        {isNewNoteRequested ? <NewNote isDesktop={true} /> : null}
      </section>
      <aside className={classes.right__sidebar}>
        {activeNoteId &&
          btnActionsData.map((btn) => {
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
              />
            );
          })}
      </aside>
    </section>
  );
};

export default ParentAppGrid;
