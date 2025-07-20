import { getNotesByUserId } from "../api/notes";
import { fetchUserId } from "../api/user";
import { useAuth } from "../contexts/authContext";
import { useQuery } from "@tanstack/react-query";

import NoteCard from "./NoteCard";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";

import { formatDate } from "../utils/noteUtils";

import classes from "./AllNotes.module.css";

const AllNotes = () => {
  const { user } = useAuth();
  const uid = user.uid;

  const { data: userId } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserId(uid),
    enabled: !!uid,
  });

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", userId],
    queryFn: () => getNotesByUserId(userId),
  });

  if (isLoading) return <Loader />;

  return (
    <div className={classes.all_notes}>
      <h2>All Notes</h2>
      {isError ? (
        <Modal header="Please Note" message={`Error occurred when getting notes: ${error}`} />
      ) : notesData && notesData.length ? (
        notesData.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            tags={note.tags.split(",")}
            noteHeading={note.header}
            lastEdited={formatDate(note.updated_at)}
          />
        ))
      ) : (
        <p className={classes.welcome__text}>
          You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
        </p>
      )}
    </div>
  );
};

export default AllNotes;
