import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";
import Modal from "../components/modals/Modal";

import { fetchUserId } from "../api/user";
import { createNote } from "../api/notes";

const NewNote = () => {
  const [clearValues, setClearValues] = useState(false);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [tags, setTags] = useState([]);
  const [noteErrors, setNoteErrors] = useState({
    no_title_error: false,
    no_text_error: false,
  });

  const { user } = useAuth();
  const uid = user.uid;

  const { data } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserId(uid),
  });

  const { mutate } = useMutation({
    mutationFn: (note) => createNote(note),
    onSuccess: () => {
      console.log("Note created successfully!");
      setClearValues((prev) => !prev); // reset fields
      setTitle("");
      setNoteText("");
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const handleClearValues = () => {
    setClearValues((prev) => !prev);
  };

  const handleSaveNote = () => {
    const hasTitle = title.trim() !== "";
    const hasText = noteText.trim() !== "";

    setNoteErrors({
      no_title_error: !hasTitle,
      no_text_error: !hasText,
    });

    if (hasTitle && hasText && data) {
      mutate({
        header: title.trim(),
        content: noteText.trim(),
        tags: tags.map((tag) => tag.trim()).join(","),
        userId: data,
      });
    }
  };

  return (
    <div className={classes.note__container}>
      <NewNoteActions handleSaveNote={handleSaveNote} handleClearValues={handleClearValues} />
      <NoteHeader
        tags={tags}
        setTags={setTags}
        title={title}
        setTitle={setTitle}
        clearValues={clearValues}
        handleClearValues={handleClearValues}
      />
      <NoteBody
        noteText={noteText}
        setNoteText={setNoteText}
        clearValues={clearValues}
        handleClearValues={handleClearValues}
      />
      {noteErrors.no_title_error || noteErrors.no_text_error ? (
        <Modal
          setNoteErrors={setNoteErrors}
          header="Please Note"
          message="Title and note text are manadatory inputs."
        />
      ) : null}
    </div>
  );
};

export default NewNote;
