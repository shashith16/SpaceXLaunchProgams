export const objectToQuery = (obj) => {
  return Object.keys(obj)
    .map((objKey) => {
      return `${objKey}=${obj[objKey]}`;
    })
    .join("&");
};
