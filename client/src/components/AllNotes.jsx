/* eslint-disable no-unused-vars */
import { useState } from "react";

import NoteCard from "./NoteCard";

import classes from "./AllNotes.module.css";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);

  return (
    <div className={classes.all_notes}>
      <h2>All Notes</h2>
      {!notes.length ? (
        <p className={classes.welcome__text}>
          You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
        </p>
      ) : null}
      {notes && notes.length
        ? notes.map((note) => (
            <NoteCard
              key={note.id}
              tags={note.tags}
              noteHeading={note.heading}
              lastEdited={note.lastEdited}
            />
          ))
        : null}
    </div>
  );
};

export default AllNotes;
