import { useState } from "react";
import { useNotes } from "../contexts/notesContext";
import { useFetchUserId } from "../hooks/queries/useFetchUserId";
import { useCreateNote } from "../hooks/mutations/useCreateNote";
import { useUpdateNote } from "../hooks/mutations/useUpdateNote";

import { formatDate } from "../utils/noteUtils";

import classes from "./NewNote.module.css";

import NewNoteActions from "./NewNoteActions";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";
import Modal from "../components/modals/Modal";

const NewNote = () => {
  const { refetchNotes } = useNotes();
  const [clearValues, setClearValues] = useState(false);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [tags, setTags] = useState([]);
  const [noteObject, setNoteObject] = useState({});

  const { userId } = useFetchUserId();
  const { handleSaveNote, noteErrors, setNoteErrors } = useCreateNote(userId);

  const { handleUpdateNote } = useUpdateNote();

  const handleClearValues = () => {
    setClearValues((prev) => !prev);
    setNoteObject({});
  };

  const onSaveOrUpdate = async () => {
    try {
      let response;
      if (noteObject.id) {
        response = await handleUpdateNote({
          id: noteObject.id,
          header: title,
          content: noteText,
          tags,
        });
        refetchNotes();
      } else {
        response = await handleSaveNote(title, noteText, tags);
        refetchNotes();
      }

      if (response) {
        setNoteObject(response);
      }
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  return (
    <div className={classes.note__container}>
      <NewNoteActions onSaveNote={onSaveOrUpdate} handleClearValues={handleClearValues} />
      <NoteHeader
        tags={tags}
        setTags={setTags}
        title={title}
        setTitle={setTitle}
        clearValues={clearValues}
        handleClearValues={handleClearValues}
        updatedAt={noteObject.updated_at ? formatDate(noteObject.updated_at) : "Not yet saved"}
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
