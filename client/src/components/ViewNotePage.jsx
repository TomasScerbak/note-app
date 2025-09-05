import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useGetNoteById } from "../hooks/queries/useGetNoteById";
import { formatDate } from "../utils/noteUtils";
import { useUpdateNote } from "../hooks/mutations/useUpdateNote";
import { useDeleteNote } from "../hooks/mutations/useDeleteNote";
import { useArchiveNote } from "../hooks/mutations/useArchiveNote";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/themeContext";

import NoteHeader from "./NoteHeader";
import NewNoteActions from "./NewNoteActions";
import NoteBody from "./NoteBody";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";
import CallToActionModal from "../components/modals/CallToActionModal";

import TrashImage from "../assets/icon-delete-white.svg";
import TrashImageDark from "../assets/icon-delete-dark-grey.svg";
import ArchiveImage from "../assets/icon-archive-white.svg";
import ArchiveImageDark from "../assets/icon-archive-dark-grey.svg";

import classes from "./ViewNotePage.module.css";

const ViewNotePage = ({ deskNoteId, isDesktop }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const actualId = isDesktop ? deskNoteId : id;
  console.log("actualId", actualId);
  const { noteData, isLoading, isError, error } = useGetNoteById(actualId);
  const { theme } = useTheme();

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

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
  const { handleDeleteNote } = useDeleteNote(actualId);
  const { toggleArchive } = useArchiveNote();

  const onSaveOrUpdate = async () => {
    try {
      let response;
      if (actualId) {
        response = await handleUpdateNote({
          id: actualId,
          header: title,
          content: noteText,
          tags: tags.join(","),
        });
      }
      if (response) {
        queryClient.invalidateQueries(["note", actualId]);
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const onDeleteNote = () => {
    setShowDeleteModal(true);
  };

  const onArchiveNote = () => {
    setShowArchiveModal(true);
  };

  const confirmDeleteNote = async () => {
    try {
      if (actualId) {
        const response = await handleDeleteNote(actualId);
        if (response) {
          queryClient.invalidateQueries(["notes"]);
          queryClient.removeQueries(["note", actualId]);
          navigate("/home/all-notes");
        }
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const onToggleArchive = async () => {
    try {
      if (!actualId) return;
      await toggleArchive(actualId, Boolean(noteData.is_archived));
      queryClient.invalidateQueries(["note", actualId]);
      setShowArchiveModal(false);
    } catch (error) {
      console.error("Error toggling archive status:", error.message);
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
      <NoteBody setNoteText={setNoteText} noteText={noteText} />
      {showDeleteModal && (
        <CallToActionModal
          header="Delete Note"
          message="Are you sure you want to permanently delete this note? This action cannot be undone."
          btnsArr={[
            { title: "Cancel", variant: "cancel", onClick: () => setShowDeleteModal(false) },
            { title: "Delete Note", variant: "delete", onClick: confirmDeleteNote },
          ]}
          image={theme === "light" ? TrashImageDark : TrashImage}
        />
      )}
      {showArchiveModal && (
        <CallToActionModal
          header={noteData.is_archived ? "Please Note" : "Archive Note"}
          message={
            noteData.is_archived
              ? "Note will be removed from Archive Note Section. You can archive this note back anytime."
              : "Are you sure you want to archive this note? You can find it in the Archive notes section and restore it anytime."
          }
          btnsArr={[
            { title: "Cancel", variant: "cancel", onClick: () => setShowArchiveModal(false) },
            {
              title: noteData.is_archived ? "Unarchive" : "Archive Note",
              variant: "archive",
              onClick: onToggleArchive,
            },
          ]}
          image={theme === "light" ? ArchiveImageDark : ArchiveImage}
        />
      )}
    </div>
  );
};

export default ViewNotePage;
