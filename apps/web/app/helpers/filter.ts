import { Filter } from "../store/store";

const getTokens = (fields: Filter["fields"]) => {
  const { url } = fields;

  return typeof url === "string" && url !== ""
    ? url.split(" ").filter(Boolean)
    : [];
};

const resolveToken = (str: string, token: string) => str.includes(token);

export const filterData = ({ fields }: Filter) => {
  const tokens = getTokens(fields);

  if (tokens.length < 1) {
    // filter method
    return () => true;
  }

  // filter method
  return (item: any): boolean => {
    const result = tokens.reduce((acc, token) => {
      if (token.startsWith("-") && token.length > 1) {
        return acc && !resolveToken(item.url, token.substring(1));
      }

      return acc && resolveToken(item.url, token);
    }, true);

    return result;
  };
};
