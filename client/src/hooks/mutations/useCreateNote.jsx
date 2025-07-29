import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../contexts/toastContext";
import { createNote } from "../../api/notes";

export const useCreateNote = (userId) => {
  const { addToast } = useToast();

  const [noteErrors, setNoteErrors] = useState({
    no_title_error: false,
    no_text_error: false,
  });

  const createPost = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      addToast({
        message: "Note created successfully!",
        color: "positive",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      addToast({
        message: `Failed to create note ${error}.`,
        color: "negative",
        duration: 5000,
      });
    },
  });

  const handleSaveNote = async (title, noteText, tags) => {
    const hasTitle = title.trim() !== "";
    const hasText = noteText.trim() !== "";

    const errors = {
      no_title_error: !hasTitle,
      no_text_error: !hasText,
    };

    setNoteErrors(errors);

    if (!hasTitle || !hasText) return;

    const response = await createPost.mutateAsync({
      header: title.trim(),
      content: noteText.trim(),
      tags: tags.map((tag) => tag.trim()).join(","),
      userId,
    });

    return response;
  };

  return {
    handleSaveNote,
    noteErrors,
    setNoteErrors,
    createPost,
  };
};
