import { Filter } from "../store/store";

const resolveToken = (str: string, token: string) => {
  // negative filter
  if (token.startsWith("-")) {
    if (str.includes(token.substring(1))) {
      return false;
    } else {
      return true;
    }
  }
  // positive filter
  if (str.includes(token)) {
    return true;
  } else {
    return false;
  }
};

export const filterData = (filter: Filter) => (item: any) => {
  const { url } = filter;

  // wrong filter definition
  if (typeof url !== "string" || url === "") {
    return true;
  }

  const tokens = url.split(" ");

  const result = tokens.reduce((acc, token) => {
    if (token === "") {
      return acc;
    }
    return acc || resolveToken(item.url, token);
  }, false);

  return result;
};
