import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";
import Modal from "../components/modals/Modal";

import { fetchUserId } from "../api/user";

const NewNote = () => {
  const [clearValues, setClearValues] = useState(false);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
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

  console.log("User ID:", data);

  const handleClearValues = () => {
    setClearValues((prev) => !prev);
  };

  const handleNoteErrors = () => {
    setNoteErrors({
      no_title_error: title.trim() === "",
      no_text_error: noteText.trim() === "",
    });
  };

  return (
    <div className={classes.note__container}>
      <NewNoteActions handleNoteErrors={handleNoteErrors} handleClearValues={handleClearValues} />
      <NoteHeader
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
