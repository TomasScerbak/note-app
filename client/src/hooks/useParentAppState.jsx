// useParentAppState.js
import { useState } from "react";
import { useNotes } from "../contexts/notesContext";
import { useNoteActions } from "../hooks/useNoteActions";
import { initialBtnData } from "../utils/desktopButtonsUtils";

export const useParentAppState = () => {
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

  return {
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
  };
};
