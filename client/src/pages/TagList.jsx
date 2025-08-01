import { useAuth } from "../contexts/authContext";
import { fetchUserId } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { getNotesByUserId } from "../api/notes";

import TagCard from "../components/TagCard";
import Modal from "../components/modals/Modal";
import Loader from "../components/UI/Loader";

const TagList = () => {
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

  const uniqueTags = notesData
    ? [
        ...new Set(
          notesData.flatMap((note) =>
            typeof note.tags === "string" ? note.tags.split(",").map((tag) => tag.trim()) : note.tags
          )
        ),
      ]
    : [];

  if (isError) return <Modal header="Please Note" message={error.message} />;

  return (
    <div>
      <h1>Tags</h1>
      {isLoading && <Loader />}
      {uniqueTags.length ? uniqueTags.map((tag, index) => <TagCard key={index} tag={tag} />) : null}
    </div>
  );
};

export default TagList;
