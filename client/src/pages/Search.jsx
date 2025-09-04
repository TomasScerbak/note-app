/* eslint-disable react-hooks/exhaustive-deps */
import { useNotes } from "../contexts/notesContext";
import SearchHeader from "../components/SearchHeader";
import SearchInput from "../components/UI/SearchInput";
import SearchSubHeder from "../components/SearchSubHeder";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";
import NoteCard from "../components/NoteCard";
import { formatDate } from "../utils/noteUtils";
import { useEffect } from "react";

const Search = () => {
  const { isLoading, searchTerm, isError, error, hasSearched, filteredNotes, handleSearchChange } =
    useNotes();

  useEffect(() => {
    // clear searchTerm each time user navigates to this page
    handleSearchChange("");
  }, []);

  const message = searchTerm.length ? (
    <p style={{ color: "var(--app-secondary-text)" }}>
      All notes matching
      <strong>
        <q>{searchTerm}</q>
      </strong>
      are displayed below.
    </p>
  ) : (
    ""
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <SearchHeader />
      <SearchInput
        onChange={(e) => handleSearchChange(e.target.value)}
        message={message}
        placeholder="Search by title, content, or tags..."
      />
      {isError ? (
        <Modal
          header="Please Note"
          message={`Error occurred when getting notes: ${error?.message || "Unknown error"}`}
        />
      ) : hasSearched && filteredNotes.length === 0 ? (
        <SearchSubHeder />
      ) : (
        <div>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              tags={note.tags ? note.tags.split(",") : []}
              noteHeading={note.header}
              lastEdited={formatDate(note.updated_at)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
