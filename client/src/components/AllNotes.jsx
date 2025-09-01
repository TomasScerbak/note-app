import { getNotesByUserId } from "../api/notes";
import { fetchUserId } from "../api/user";
import { useAuth } from "../contexts/authContext";
import { useQuery } from "@tanstack/react-query";

import NoteCard from "./NoteCard";
import Loader from "../components/UI/Loader";

import { formatDate } from "../utils/noteUtils";

import classes from "./AllNotes.module.css";

const AllNotes = () => {
  const { user } = useAuth();
  const uid = user.uid;

  const { data: userId } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserId(uid),
    enabled: !!uid,
    retry: false,
  });

  const { data: notesData, isLoading } = useQuery({
    queryKey: ["notes", userId],
    queryFn: () => getNotesByUserId(userId),
    enabled: !!userId,
    retry: 1,
  });

  if (isLoading) return <Loader />;

  return (
    <div className={classes.all_notes}>
      <h1>All Notes</h1>
      {notesData && notesData.length ? (
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
