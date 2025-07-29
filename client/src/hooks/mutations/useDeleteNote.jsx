import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../contexts/toastContext";
import { deleteNote } from "../../api/notes";

export const useDeleteNote = (noteId) => {
  const { addToast } = useToast();

  const deletePost = useMutation({
    mutationFn: () => deleteNote(noteId),
    onSuccess: () => {
      addToast({
        message: "Note deleted successfully!",
        color: "positive",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      addToast({
        message: `Failed to delete note ${error}.`,
        color: "negative",
        duration: 5000,
      });
    },
  });

  const handleDeleteNote = async (noteId) => {
    if (!noteId) {
      addToast({
        message: "Note ID is required to delete a note.",
        color: "negative",
        duration: 5000,
      });
      return;
    }

    const response = await deletePost.mutateAsync(noteId);
    return response;
  };

  return { handleDeleteNote };
};
