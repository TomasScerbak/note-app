export const extractFirebaseAuthError = (errorMessage) => {
  const match = errorMessage.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
