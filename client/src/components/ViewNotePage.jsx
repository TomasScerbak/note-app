import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useGetNoteById } from "../hooks/queries/useGetNoteById";
import { formatDate } from "../utils/noteUtils";

import NoteHeader from "./NoteHeader";
import NewNoteActions from "./NewNoteActions";
import NoteBody from "./NoteBody";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";

import classes from "./ViewNotePage.module.css";

const ViewNotePage = () => {
  const { id } = useParams();
  const { noteData, isLoading, isError, error } = useGetNoteById(id);

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.header);
      setNoteText(noteData.content);
      setTags(noteData.tags.split(",").map((tag) => tag.trim()));
      setUpdatedAt(formatDate(noteData.updated_at));
    }
  }, [noteData]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Modal
        header="Please Note"
        message={`Couldn't load the note. ${error?.message || "Please try again later."}`}
      />
    );

  console.log("noteData:", noteData);

  return (
    <div className={classes.note__container}>
      <NewNoteActions />
      <NoteHeader tags={tags} setTags={setTags} title={title} setTitle={setTitle} updatedAt={updatedAt} />
      <NoteBody noteText={noteText} />
    </div>
  );
};

export default ViewNotePage;
