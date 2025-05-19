export const extractFirebaseAuthError = (errorMessage) => {
  const match = errorMessage.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
};
