import { useAuth } from "../../contexts/authContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserId } from "../../api/user";

export const useFetchUserId = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserId(uid),
    enabled: !!uid, // Only run the query if uid is available
  });

  return { userId: data, error, isLoading };
};
