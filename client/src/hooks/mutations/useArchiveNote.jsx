import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../contexts/toastContext";
import { toggleArchiveStatus } from "../../api/notes";

export const useArchiveNote = () => {
  const { addToast } = useToast();

  const archiveMutation = useMutation({
    mutationFn: ({ noteId, isArchived }) => toggleArchiveStatus(noteId, isArchived),
    onSuccess: () => {
      addToast({
        message: "Archive status updated!",
        color: "positive",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error("Error toggling archive status:", error);
      addToast({
        message: `Failed to update archive status: ${error.message}`,
        color: "negative",
        duration: 5000,
      });
    },
  });

  const toggleArchive = async (noteId, currentState) => {
    await archiveMutation.mutateAsync({ noteId, isArchived: !currentState });
  };

  return {
    toggleArchive,
    isLoading: archiveMutation.isLoading,
    isSuccess: archiveMutation.isSuccess,
    isError: archiveMutation.isError,
  };
};
