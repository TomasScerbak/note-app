import { useAuth } from "../contexts/authContext";
import { fetchUserId } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import { getNotesByUserId } from "../api/notes";
import { useState } from "react";

import SearchHeader from "../components/SearchHeader";
import SearchInput from "../components/UI/SearchInput";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";
import NoteCard from "../components/NoteCard";
import { formatDate } from "../utils/noteUtils";

const Search = () => {
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

  const [message, setMessage] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (newValue.length) {
      setMessage(
        <p>
          All notes matching
          <strong>
            <q>{newValue}</q>
          </strong>
          are displayed below.
        </p>
      );

      const filtered = notesData.filter((note) =>
        note.header.toLowerCase().startsWith(newValue.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setMessage("");
      setFilteredNotes([]);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <SearchHeader />
      <SearchInput onChange={handleChange} message={message} />
      {isError ? (
        <Modal header="Please Note" message={`Error occurred when getting notes: ${error}`} />
      ) : filteredNotes && filteredNotes.length ? (
        <div>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              tags={note.tags.split(",")}
              noteHeading={note.header}
              lastEdited={formatDate(note.updated_at)}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Search;
