export const getRedirectPath = () => {
  const width = window.innerWidth;
  if (width < 900) {
    return "/home/all-notes"; // mobile or tablet
  }
  return "/home"; // desktop
};
