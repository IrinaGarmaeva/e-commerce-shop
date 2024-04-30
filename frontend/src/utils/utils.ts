export const getCategoryFromPathname = (pathname: string) => {
  const parts = pathname.split("/");
  if (parts.length >= 3 && parts[1] === "catalog") {
    return parts[2];
  }
  return null;
};
