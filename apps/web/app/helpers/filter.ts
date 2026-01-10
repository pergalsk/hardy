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
  str.toString().toLowerCase().includes(token.toLocaleLowerCase());

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
 * Map method for marking items as visible/hidden according to the filter.
 *
 * @param filter
 * @returns map method
 */
export const markVisible = ({ fields }: Filter) => {
  const tokenVectors = getTokenVectors(fields);

  // array's map method
  return (listItem: any): any => {
    // list item which should be visible
    // initial `true` means all entries should be included at the beginning
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

  // filters's reduce method
  return (acc: any, listItem: any, index: number, arr: any[]): any => {
    // list item which should be visible
    // initial `true` means all entries should be included at the beginning
    const shouldBeVisible =
      tokenVectors.length < 1 ||
      tokenVectors.reduce(resolveVectors(listItem), true);

    if (shouldBeVisible) {
      return [...acc, listItem];
    }

    // actual length of the accumulator
    const length = acc.length;

    // add special list item with hidden count stats
    if (length && acc[length - 1].$$stats) {
      // rise hidden count by 1
      acc[length - 1].$$hidden = acc[length - 1].$$hidden + 1;
    } else {
      acc = [
        ...acc,
        {
          $$stats: true,
          $$hidden: 1,
          $$id: arr.length * 10 + index, // must have an id
        },
      ];
    }

    return acc;
  };
};
