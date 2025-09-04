import { useNotes } from "../contexts/notesContext";
import { formatDate } from "../utils/noteUtils";

import NoteCard from "./NoteCard";
import Loader from "../components/UI/Loader";

import classes from "./AllNotes.module.css";

const AllNotes = () => {
  const { notesData, isLoading } = useNotes();

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
