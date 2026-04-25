import { Filter } from "../../../store/store";

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
  const [fieldName, searchPhrase] = field;
  const phraseParts: string[] = splitSearchPhrase(searchPhrase);
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
  str.toString().toLowerCase().includes(token.toLocaleLowerCase());

const resolveVectors =
  (listItem: any) => (acc: boolean, tokenVector: [string, string]) => {
    const [fieldName, token] = tokenVector;

    if (token.startsWith("-") && token.length > 1) {
      return acc && !resolveToken(listItem[fieldName], token.substring(1));
    }

    return acc && resolveToken(listItem[fieldName], token);
  };

/**
 * Map method for marking items as visible/hidden according to the filter.
 *
 * @param filter
 * @returns map method
 */
export const markVisible = ({ fields }: Filter) => {
  const tokenVectors = getTokenVectors(fields);

  return (listItem: any): any => {
    const shouldBeVisible =
      tokenVectors.length < 1 ||
      tokenVectors.reduce(resolveVectors(listItem), true);

    return {
      ...listItem,
      $$visible: shouldBeVisible,
      $$hidden: !shouldBeVisible,
    };
  };
};

/**
 * Deprecated.
 * Returns older/unused reducer method for filtering list of HAR entries,
 * (and grouped hidden items)
 *
 * @param filter
 * @returns reduce method
 */
export const reduceData = ({ fields }: Filter) => {
  const tokenVectors = getTokenVectors(fields);

  return (acc: any, listItem: any, index: number, arr: any[]): any => {
    const shouldBeVisible =
      tokenVectors.length < 1 ||
      tokenVectors.reduce(resolveVectors(listItem), true);

    if (shouldBeVisible) {
      return [...acc, listItem];
    }

    const length = acc.length;

    if (length && acc[length - 1].$$stats) {
      acc[length - 1].$$hidden = acc[length - 1].$$hidden + 1;
    } else {
      acc = [
        ...acc,
        {
          $$stats: true,
          $$hidden: 1,
          $$id: arr.length * 10 + index,
        },
      ];
    }

    return acc;
  };
};
