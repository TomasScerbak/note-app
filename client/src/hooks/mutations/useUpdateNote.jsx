import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../contexts/toastContext";
import { updateNote } from "../../api/notes";

export const useUpdateNote = () => {
  const { addToast } = useToast();

  const [noteErrors, setNoteErrors] = useState({
    no_title_error: false,
    no_text_error: false,
  });

  const updatePost = useMutation({
    mutationFn: (noteData) => updateNote(noteData),
    onSuccess: () => {
      addToast({
        message: "Note updated successfully!",
        color: "positive",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error("Error updating note:", error);
      addToast({
        message: `Failed to update note ${error}.`,
        color: "negative",
        duration: 5000,
      });
    },
  });

  const handleUpdateNote = async (noteObj) => {
    const hasTitle = noteObj.header.trim() !== "";
    const hasText = noteObj.content.trim() !== "";

    const errors = {
      no_title_error: !hasTitle,
      no_text_error: !hasText,
    };

    setNoteErrors(errors);
    if (!hasTitle || !hasText) return;

    const response = await updatePost.mutateAsync(noteObj);
    return response;
  };

  return {
    handleUpdateNote,
    noteErrors,
    setNoteErrors,
    updatePost,
  };
};
