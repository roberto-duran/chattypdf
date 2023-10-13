export const generateSlug = (str: string): string => {
  const slug = str
    .toLowerCase()
    .replace(/[^\w\s-%$*&!@#()]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/\.pdf$/, "");
  return slug;
};
