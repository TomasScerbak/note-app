import { useNotes } from "../contexts/notesContext";

import TagCard from "../components/TagCard";
import Modal from "../components/modals/Modal";
import Loader from "../components/UI/Loader";
import TagHeader from "../components/TagHeader";

const TagList = ({ isDesktop }) => {
  const { notesData, isLoading, isError, error } = useNotes();

  const uniqueTags =
    notesData && notesData.length
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
      {isDesktop ? <p>Tags</p> : <h1>Tags</h1>}
      {isLoading && <Loader />}
      {!isLoading && !uniqueTags.length ? <TagHeader /> : null}
      {uniqueTags.length ? uniqueTags.map((tag, index) => <TagCard key={index} tag={tag} />) : null}
    </div>
  );
};

export default TagList;
