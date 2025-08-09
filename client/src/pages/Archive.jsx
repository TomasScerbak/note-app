import { useAuth } from "../contexts/authContext";
import { fetchUserId } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { getNotesByUserId } from "../api/notes";

import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";
import NoteCard from "../components/NoteCard";
import { formatDate } from "../utils/noteUtils";

import ArchiveHedader from "../components/ArchiveHeader";

const Archive = () => {
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
    enabled: !!userId,
  });

  if (isError) return <Modal header="Please Note" message={error.message} />;

  const archivedNotes = notesData?.filter((note) => note.is_archived) ?? [];

  return (
    <div>
      <ArchiveHedader archivedNotes={archivedNotes} />

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
