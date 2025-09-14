import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDeleteNote } from "../hooks/mutations/useDeleteNote";
import { useArchiveNote } from "../hooks/mutations/useArchiveNote";
import { useUpdateNote } from "../hooks/mutations/useUpdateNote";

export const useNoteActions = (noteId, noteData, isDesktop, title, noteText, tags, onNoteDeleted) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleDeleteNote } = useDeleteNote(noteId);
  const { toggleArchive } = useArchiveNote();
  const { handleUpdateNote } = useUpdateNote();

  const confirmDeleteNote = async () => {
    try {
      const response = await handleDeleteNote(noteId);
      if (response) {
        queryClient.invalidateQueries(["notes"]);
        queryClient.removeQueries({ queryKey: ["note", noteId], exact: true });
        onNoteDeleted?.();
        isDesktop ? navigate("/home") : navigate("/home/all-notes");
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const onToggleArchive = async () => {
    try {
      await toggleArchive(noteId, Boolean(noteData?.is_archived));
      queryClient.invalidateQueries(["note", noteId]);
    } catch (error) {
      console.error("Error toggling archive status:", error.message);
    }
  };

  const onSaveOrUpdate = async () => {
    try {
      let response;
      if (noteId) {
        response = await handleUpdateNote({
          id: noteId,
          header: title,
          content: noteText,
          tags: tags.join(","),
        });
      }
      if (response) {
        queryClient.invalidateQueries(["note", noteId]);
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  return { confirmDeleteNote, onToggleArchive, onSaveOrUpdate };
};
