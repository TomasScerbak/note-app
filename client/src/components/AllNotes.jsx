/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router";

import NoteCard from "./NoteCard";
import Button from "./UI/Button";

import PlusImage from "../assets/icon-plus.svg";

import classes from "./AllNotes.module.css";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const navigateToNewNote = () => {
    navigate("/home/create-note");
    console.log("Navigate to new note creation page");
  };

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
      <Button
        onClick={navigateToNewNote}
        variant="primary"
        hasImage={true}
        type="button"
        size="rounded"
        src={PlusImage}
      />
    </div>
  );
};

export default AllNotes;
