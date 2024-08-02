import { Filter } from "../store/store";

/**
 * Returns list of field name and token pairs
 *
 * @param fields
 * @returns field name - token pairs
 *
 *  const tokenVectors = getTokenVectors({
 *    url: "https -google.com" ,
 *    method: "GET"
 *    status: "200 404"
 *  })
 *
 *  tokenVectors: [
 *    ["url", "https"],
 *    ["url", "-google.com"],
 *    ["method", "GET"],
 *    ["status", "200"],
 *    ["status", "404"]
 *  ]
 */
const getTokenVectors = (fields: Filter["fields"]) =>
  Object.entries(fields).reduce(resolveFields, []);

const resolveFields = (acc: any[], field: [string, string]) => {
  // field: ["url", "https -google.com"]
  const [fieldName, searchPhrase] = field;

  // searchPhrase: "https -google.com"
  // phraseParts: ["https", "-google.com"]
  const phraseParts: string[] = splitSearchPhrase(searchPhrase);

  // fieldName: "url"
  // tokenVectors: [["url", "https"], ["url", "-google.com"]]
  const tokenVectors = phraseParts.map(pairTokenWithField(fieldName));

  return [...acc, ...tokenVectors];
};

const splitSearchPhrase = (phrase: string): string[] =>
  typeof phrase === "string" && phrase !== ""
    ? phrase.split(" ").filter(Boolean)
    : [];

const pairTokenWithField = (fieldName: string) => (token: string) => [
  fieldName,
  token,
];

const resolveToken = (str: string, token: string) =>
  str.toString().includes(token);

const resolveVectors =
  (listItem: any) => (acc: boolean, tokenVector: [string, string]) => {
    const [fieldName, token] = tokenVector;

    // negative search
    if (token.startsWith("-") && token.length > 1) {
      return acc && !resolveToken(listItem[fieldName], token.substring(1));
    }

    // positive search (include single '-' character)
    return acc && resolveToken(listItem[fieldName], token);
  };

/**
 * Returns filter method for filtering list of HAR entries
 *
 * @param filter
 * @returns filter method
 */
export const filterData = ({ fields }: Filter) => {
  const tokenVectors = getTokenVectors(fields);

  if (tokenVectors.length < 1) {
    // filter method
    return () => true;
  }

  // filter method
  // initial `true` means all entries should be included at the beginning
  return (listItem: any): boolean =>
    tokenVectors.reduce(resolveVectors(listItem), true);
};
