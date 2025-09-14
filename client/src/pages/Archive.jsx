import { useNotes } from "../contexts/notesContext";
import { formatDate } from "../utils/noteUtils";

import ArchiveHeader from "../components/ArchiveHeader";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";
import NoteCard from "../components/NoteCard";

const Archive = () => {
  const { notesData, isLoading, isError, error } = useNotes();

  if (isError) return <Modal header="Please Note" message={error.message} />;

  const archivedNotes = notesData?.filter((note) => note.is_archived) ?? [];

  return (
    <div>
      <ArchiveHeader archivedNotes={archivedNotes} />

      {isLoading && <Loader />}

      {!isLoading && archivedNotes.length > 0 && (
        <div>
          {archivedNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              tags={note.tags.split(",")}
              noteHeading={note.header}
              lastEdited={formatDate(note.updated_at)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
