export const escapeURL = (url) => {
  let s = url.replace(/\//g, "_");
  s = s.replace(/\?/g, "_");
  s = s.replace(/\s/g, "_");
  return s;
};
