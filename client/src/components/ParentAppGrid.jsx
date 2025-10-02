/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { useNavigate, useLocation } from "react-router";
import { getBtnImages, btnActionsData } from "../utils/desktopButtonsUtils";
import useIsMobileOrTablet from "../hooks/useIsMobileOrTablet";
import { useParentAppState } from "../hooks/useParentAppState";
import { renderNoteCards } from "../utils/renderNoteCards";

import classes from "./ParentAppGrid.module.css";
import PlusImage from "../assets/icon-plus.svg";

import Button from "../components/UI/Button";
import NoteModals from "./NoteModals";
import MobileLayout from "./MobileLayout";
import DesktopLeftPanel from "./DesktopLeftPanel";
import DesktopHeader from "./DesktopHeader";
import DesktopLeftInnerPanel from "./DesktopLeftInnerPanel";
import DesktopRightInnerPanel from "./DesktopRightInnerPanel";
import DesktopAside from "./DesktopAside";

const ParentAppGrid = () => {
  const {
    notesData,
    deskBtnData,
    setDeskBtnData,
    activeNoteId,
    setActiveNoteId,
    isNewNoteRequested,
    setIsNewNoteRequested,
    showDeleteModal,
    setShowDeleteModal,
    showArchiveModal,
    setShowArchiveModal,
    confirmDeleteNote,
    onToggleArchive,
    isLoading,
    searchTerm,
    handleSearchChange,
    filteredNotes,
    filteredArchivedNotes,
    archivedNotes,
  } = useParentAppState();

  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [settingClicked, setSettingClicked] = useState(false);
  const [settingSelected, setSettingSelected] = useState({});
  const [tag, setTag] = useState("");

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

  const filteredNotesByTag = notesData?.filter((note) => {
    const tagsMatch = note.tags
      ?.split(",")
      .map((t) => t.trim().toLowerCase())
      .some((t) => t === tag.toLowerCase());
    return tagsMatch;
  });

  const handleSettingClicked = () => {
    setSettingClicked(true);
    setActiveNoteId("");
    setIsNewNoteRequested(false);
    handleSearchChange("");
    setTag("");
  };

  const handleSettingSelected = (setting) => {
    setSettingSelected(setting);
  };

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
    setSettingClicked(false);
    setTag("");
  };

  const onDeleteNote = () => {
    setShowDeleteModal(true);
  };

  const onArchiveNote = () => {
    setShowArchiveModal(true);
  };

  const activeBtn = deskBtnData.find((btn) => btn.active);
  const headerText = activeBtn.title === "All Notes" ? "All Notes" : "Archived Notes";

  const handleCreateNewNote = useCallback(() => {
    setIsNewNoteRequested(true);
    if (searchTerm) handleSearchChange("");
    if (activeNoteId) setActiveNoteId("");
    if (settingClicked) setSettingClicked(false);
    if (tag) setTag("");
  }, [searchTerm, activeNoteId, settingClicked, tag]);

  const handleDesktopTagClicked = (tag) => {
    setTag(tag);
    setActiveNoteId("");
    setIsNewNoteRequested(false);
    handleSearchChange("");
    setSettingClicked(false);
  };

  useEffect(() => {
    setSettingClicked(false);
    setSettingSelected({});
    setTag("");
  }, [activeBtn, activeNoteId, searchTerm]);

  return (
    <section className={classes.parent}>
      {
        // Only show the mobile layout for mobile and tablet
        isMobileOrTablet && <MobileLayout />
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
        // Desktop Left Panel
        !isMobileOrTablet && (
          <DesktopLeftPanel
            handleDesktopTagClicked={handleDesktopTagClicked}
            handleActiveBtn={handleActiveBtn}
            deskBtnData={deskBtnData}
          />
        )
      }
      {
        // Desktop Header
        !isMobileOrTablet && (
          <DesktopHeader
            searchTerm={searchTerm}
            headerText={headerText}
            handleSearchChange={handleSearchChange}
            setActiveNoteId={setActiveNoteId}
            message={message}
            theme={theme}
            handleSettingClicked={handleSettingClicked}
            tag={tag}
          />
        )
      }
      {
        // Desktop Left Inner Panel
        !isMobileOrTablet && (
          <DesktopLeftInnerPanel
            handleCreateNewNote={handleCreateNewNote}
            searchTerm={searchTerm}
            message={message}
            activeBtn={activeBtn}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            setIsNewNoteRequested={setIsNewNoteRequested}
            filteredNotes={filteredNotes}
            filteredArchivedNotes={filteredArchivedNotes}
            archivedNotes={archivedNotes}
            isLoading={isLoading}
            renderNoteCards={renderNoteCards}
            settingClicked={settingClicked}
            handleSettingSelected={handleSettingSelected}
            filteredNotesByTag={filteredNotesByTag}
            tag={tag}
          />
        )
      }
      {
        // Desktop Right Inner Panel
        !isMobileOrTablet && (
          <DesktopRightInnerPanel
            activeBtn={activeBtn}
            activeNoteId={activeNoteId}
            isNewNoteRequested={isNewNoteRequested}
            searchTerm={searchTerm}
            settingSelected={settingSelected}
            settingClicked={settingClicked}
          />
        )
      }
      {
        // Desktop Aside (right sidebar)
        !isMobileOrTablet && (
          <DesktopAside
            activeNoteId={activeNoteId}
            btnActionsData={btnActionsData}
            getBtnImages={getBtnImages}
            theme={theme}
            onDeleteNote={onDeleteNote}
            onArchiveNote={onArchiveNote}
            notesData={notesData}
          />
        )
      }
    </section>
  );
};

export default ParentAppGrid;
