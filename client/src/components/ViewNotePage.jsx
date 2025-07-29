import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useGetNoteById } from "../hooks/queries/useGetNoteById";
import { formatDate } from "../utils/noteUtils";
import { useUpdateNote } from "../hooks/mutations/useUpdateNote";
import { useDeleteNote } from "../hooks/mutations/useDeleteNote";
import { useNavigate } from "react-router";

import NoteHeader from "./NoteHeader";
import NewNoteActions from "./NewNoteActions";
import NoteBody from "./NoteBody";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";

import classes from "./ViewNotePage.module.css";

const ViewNotePage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { noteData, isLoading, isError, error } = useGetNoteById(id);

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.header);
      setNoteText(noteData.content);
      setTags(noteData.tags.split(",").map((tag) => tag.trim()));
      setUpdatedAt(formatDate(noteData.updated_at));
    }
  }, [noteData]);

  const { handleUpdateNote } = useUpdateNote();
  const { handleDeleteNote } = useDeleteNote(id);

  const onSaveOrUpdate = async () => {
    try {
      let response;
      if (id) {
        response = await handleUpdateNote({
          id: id,
          header: title,
          content: noteText,
          tags: tags.join(","),
        });
      }
      if (response) {
        queryClient.invalidateQueries(["note", id]);
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const onDeleteNote = async () => {
    console.log("Deleting note with ID:", id);
    try {
      let response;
      if (id) {
        response = await handleDeleteNote(id);
        if (response) {
          queryClient.invalidateQueries(["notes"]);
          queryClient.removeQueries(["note", id]);
          // Navigate back to all notes page after deletion
          navigate("/home/all-notes");
        }
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Modal
        header="Please Note"
        message={`Couldn't load the note. ${error?.message || "Please try again later."}`}
      />
    );

  return (
    <div className={classes.note__container}>
      <NewNoteActions id={id} onSaveNote={onSaveOrUpdate} onDeleteNote={onDeleteNote} />
      <NoteHeader tags={tags} setTags={setTags} title={title} setTitle={setTitle} updatedAt={updatedAt} />
      <NoteBody setNoteText={setNoteText} noteText={noteText} />
    </div>
  );
};

export default ViewNotePage;
