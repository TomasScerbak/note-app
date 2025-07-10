/* eslint-disable no-unused-vars */
import { getNotesByUserId } from "../api/notes";
import { useAuth } from "../contexts/authContext";
import { fetchUserId } from "../api/user";
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

  console.log(notesData);

  return (
    <div className={classes.all_notes}>
      <h2>All Notes</h2>
      {!notesData.length ? (
        <p className={classes.welcome__text}>
          You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
        </p>
      ) : null}
      {notesData && notesData.length
        ? notesData.map((note) => (
            <NoteCard
              key={note.id}
              tags={note.tags.split(",")}
              noteHeading={note.header}
              lastEdited={formatDate(note.updated_at)}
            />
          ))
        : null}
    </div>
  );
};

export default AllNotes;
