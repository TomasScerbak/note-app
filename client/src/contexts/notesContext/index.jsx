/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { getNotesByUserId } from "../../api/notes";
import { fetchUserId } from "../../api/user";
import { useAuth } from "../authContext";
import { useQuery } from "@tanstack/react-query";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: userId,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserId(uid),
    enabled: !!uid,
    retry: false,
  });

  const {
    data: notesData = [],
    isLoading: isNotesLoading,
    isError: isNotesError,
    error: notesError,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: ["notes", userId],
    queryFn: () => getNotesByUserId(userId),
    enabled: !!userId,
    retry: 1,
  });

  const isLoading = isUserLoading || isNotesLoading;
  const isError = isUserError || isNotesError;
  const error = userError || notesError;

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setHasSearched(!!value.length);
  };

  const filteredNotes = searchTerm.length
    ? notesData?.filter((note) => {
        const search = searchTerm.toLowerCase();
        const headerMatch = note.header?.toLowerCase().includes(search);
        const contentMatch = note.content?.toLowerCase().includes(search);
        const tagsMatch = note.tags
          ?.split(",")
          .map((tag) => tag.trim().toLowerCase())
          .some((tag) => tag.includes(search));
        return headerMatch || contentMatch || tagsMatch;
      }) ?? []
    : [];

  const filteredArchivedNotes = searchTerm.length
    ? notesData?.filter((note) => {
        const isArchived = note.is_archived;
        if (isArchived) {
          const search = searchTerm.toLowerCase();
          const headerMatch = note.header?.toLowerCase().includes(search);
          const contentMatch = note.content?.toLowerCase().includes(search);
          const tagsMatch = note.tags
            ?.split(",")
            .map((tag) => tag.trim().toLowerCase())
            .some((tag) => tag.includes(search));

          return headerMatch || contentMatch || tagsMatch;
        }
      })
    : [];

  const archivedNotes = notesData.filter((note) => note.is_archived);

  return (
    <NotesContext.Provider
      value={{
        notesData,
        filteredNotes,
        archivedNotes,
        filteredArchivedNotes,
        isLoading,
        isError,
        error,
        searchTerm,
        hasSearched,
        handleSearchChange,
        refetchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
