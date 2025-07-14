import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../api/notes";

export const useGetNoteById = (noteId) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
    enabled: !!noteId, // Avoid fetching if noteId is undefined/null
    staleTime: 1000 * 60 * 5, // Optional: Cache for 5 mins
  });

  return {
    noteData: data,
    error,
    isLoading,
    isError,
  };
};
