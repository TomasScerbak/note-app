// useParentAppState.js
import { useState } from "react";
import { useNotes } from "../contexts/notesContext";
import { useNoteActions } from "../hooks/useNoteActions";
import { initialBtnData } from "../utils/desktopButtonsUtils";
import { useGetNoteById } from "../hooks/queries/useGetNoteById";

export const useParentAppState = () => {
  const { isLoading, searchTerm, handleSearchChange, filteredNotes, filteredArchivedNotes, archivedNotes } =
    useNotes();
  const [deskBtnData, setDeskBtnData] = useState(initialBtnData);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isNewNoteRequested, setIsNewNoteRequested] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const { noteData } = useGetNoteById(activeNoteId);
  console.log("Active Note ID in useParentAppState:", activeNoteId);
  console.log("Note Data in useParentAppState:", noteData);

  const { confirmDeleteNote, onToggleArchive } = useNoteActions(
    activeNoteId,
    noteData,
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
