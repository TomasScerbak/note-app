import NoteCard from "../components/NoteCard";
import { formatDate } from "./noteUtils";

export const renderNoteCards = (notes, onClick, activeNoteId) =>
  notes.map((note) => (
    <NoteCard
      key={note.id}
      id={note.id}
      tags={note.tags ? note.tags.split(",") : []}
      noteHeading={note.header}
      lastEdited={formatDate(note.updated_at)}
      onCardClick={() => onClick(note.id)}
      isActive={activeNoteId === note.id}
      isDesktop={true}
    />
  ));
