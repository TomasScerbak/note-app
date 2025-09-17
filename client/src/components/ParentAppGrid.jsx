import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { useNavigate, useLocation } from "react-router";
import { useNotes } from "../contexts/notesContext";
import { initialBtnData, getBtnImages, btnActionsData } from "../utils/desktopButtonsUtils";
import { formatDate } from "../utils/noteUtils";
import { useNoteActions } from "../hooks/useNoteActions";
import useIsMobileOrTablet from "../hooks/useIsMobileOrTablet";

import classes from "./ParentAppGrid.module.css";
import PlusImage from "../assets/icon-plus.svg";

import Button from "../components/UI/Button";
import SearchInput from "../components/UI/SearchInput";
import Loader from "../components/UI/Loader";
import AllNotes from "../components/AllNotes";
import ViewNotePage from "./ViewNotePage";
import NewNote from "./NewNote";
import NoteCard from "./NoteCard";
import NoteModals from "./NoteModals";
import ArchiveHeader from "../components/ArchiveHeader";
import MobileLayout from "./MobileLayout";
import DesktopLeftPanel from "./DesktopLeftPanel";

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const { confirmDeleteNote, onToggleArchive } = useNoteActions(
    activeNoteId,
    null,
    true,
    undefined,
    undefined,
    undefined,
    () => setActiveNoteId(null)
  );

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

  const onDeleteNote = () => {
    setShowDeleteModal(true);
  };

  const onArchiveNote = () => {
    setShowArchiveModal(true);
  };

  const activeBtn = deskBtnData.find((btn) => btn.active);
  const headerText = activeBtn.title === "All Notes" ? "All Notes" : "Archived Notes";

  const handleCreateNewNote = () => {
    setIsNewNoteRequested(true);
    handleSearchChange("");
    setActiveNoteId("");
  };

  const renderNoteCards = (notes) =>
    notes.map((note) => (
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
    ));

  return (
    <section className={classes.parent}>
      {
        // Only show the mobile layout for mobile and tablet
        isMobileOrTablet && <MobileLayout />
      }

      {
        // Only show modals for desktop
        !isMobileOrTablet && (
          <NoteModals
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            showArchiveModal={showArchiveModal}
            setShowArchiveModal={setShowArchiveModal}
            confirmDeleteNote={confirmDeleteNote}
            onToggleArchive={onToggleArchive}
          />
        )
      }

      {
        // Only show the round blue create note button on valid URLs for mobile and tablet
        validURLs.includes(location.pathname) && isMobileOrTablet && (
          <Button
            onClick={navigateToNewNote}
            variant="primary"
            hasImage={true}
            type="button"
            size="rounded"
            src={PlusImage}
          />
        )
      }

      {
        // Desktop Left Panel
        !isMobileOrTablet && DesktopLeftPanel({ handleActiveBtn, deskBtnData })
      }
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
        {searchTerm && activeBtn.title === "All Notes" && renderNoteCards(filteredNotes)}
        {searchTerm && activeBtn.title === "Archived Notes" && renderNoteCards(filteredArchivedNotes)}
        {activeBtn.title === "Archived Notes" && !searchTerm && !filteredArchivedNotes.length ? (
          <ArchiveHeader isDesktop={true} archivedNotes={archivedNotes} />
        ) : null}
        {activeBtn.title === "Archived Notes" && !searchTerm && renderNoteCards(archivedNotes)}
        {isLoading ? <Loader /> : null}
      </section>
      <section className={classes.right_inner_panel}>
        {(activeBtn.title === "All Notes" || activeBtn.title === "Archived Notes") &&
        activeNoteId &&
        !isNewNoteRequested ? (
          <ViewNotePage isNewNoteRequested={isNewNoteRequested} isDesktop={true} deskNoteId={activeNoteId} />
        ) : null}
        {isNewNoteRequested && !searchTerm ? (
          <NewNote isDesktop={true} isNewNoteRequested={isNewNoteRequested} />
        ) : null}
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
                onClick={() => (btn.title === "Delete Note" ? onDeleteNote() : onArchiveNote())}
              />
            );
          })}
      </aside>
    </section>
  );
};

export default ParentAppGrid;
