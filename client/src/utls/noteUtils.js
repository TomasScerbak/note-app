export const extractFirebaseAuthError = (errorMessage) => {
  const match = errorMessage.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
