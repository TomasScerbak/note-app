import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useGetNoteById } from "../hooks/queries/useGetNoteById";
import { formatDate } from "../utils/noteUtils";
import { useNoteActions } from "../hooks/useNoteActions";

import NoteHeader from "./NoteHeader";
import NewNoteActions from "./NewNoteActions";
import NoteBody from "./NoteBody";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";
import NoteModals from "./NoteModals";

import classes from "./ViewNotePage.module.css";

const ViewNotePage = ({ deskNoteId, isDesktop, isNewNoteRequested }) => {
  const { id } = useParams();
  const actualId = isDesktop ? deskNoteId : id;
  const { noteData, isLoading, isError, error } = useGetNoteById(actualId);

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const { confirmDeleteNote, onToggleArchive, onSaveOrUpdate } = useNoteActions(
    actualId,
    noteData,
    isDesktop,
    title,
    noteText,
    tags
  );

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.header);
      setNoteText(noteData.content);
      setTags(noteData.tags.split(",").map((tag) => tag.trim()));
      setUpdatedAt(formatDate(noteData.updated_at));
    }
  }, [noteData]);

  const onDeleteNote = () => {
    setShowDeleteModal(true);
  };

  const onArchiveNote = () => {
    setShowArchiveModal(true);
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
      {isDesktop ? null : (
        <NewNoteActions
          id={actualId}
          onSaveNote={onSaveOrUpdate}
          onDeleteNote={onDeleteNote}
          onToggleArchive={onArchiveNote}
          isArchived={noteData.is_archived}
        />
      )}
      <NoteHeader tags={tags} setTags={setTags} title={title} setTitle={setTitle} updatedAt={updatedAt} />
      <NoteBody
        setNoteText={setNoteText}
        noteText={noteText}
        isNewNoteRequested={isNewNoteRequested}
        isDesktop={isDesktop}
        onSaveNote={onSaveOrUpdate}
      />
      <NoteModals
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        showArchiveModal={showArchiveModal}
        setShowArchiveModal={setShowArchiveModal}
        confirmDeleteNote={confirmDeleteNote}
        onToggleArchive={onToggleArchive}
        isArchived={noteData.is_archived}
      />
    </div>
  );
};

export default ViewNotePage;
