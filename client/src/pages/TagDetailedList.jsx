import { useAuth } from "../contexts/authContext";
import { fetchUserId } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { getNotesByUserId } from "../api/notes";
import { useParams } from "react-router";

import { formatDate } from "../utils/noteUtils";

import TagListActions from "../components/TagListActions";
import TagListHeaders from "../components/TagListHeaders";
import Modal from "../components/modals/Modal";
import Loader from "../components/UI/Loader";
import NoteCard from "../components/NoteCard";

const TagDetailedList = () => {
  const { tag } = useParams();

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

  const filteredNotes = notesData
    ? notesData.filter((note) => {
        const tags =
          typeof note.tags === "string" ? note.tags.split(",").map((tag) => tag.trim()) : note.tags;
        return tags.includes(tag);
      })
    : [];

  if (isError) return <Modal header="Please Note" message={error} />;

  return (
    <div>
      <TagListActions />
      <TagListHeaders tag={tag} />
      {isLoading && <Loader />}
      {filteredNotes.length
        ? filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              tags={note.tags.split(",")}
              noteHeading={note.header}
              lastEdited={formatDate(note.updated_at)}
            />
          ))
        : null}
    </div>
  );
};

export default TagDetailedList;
