import { nanoid } from "nanoid";

/* export type FormatterProvider<T> = () => {
  addFormatters: (key: string, formatter: T) => void;
  removeFormatter: (key: string, id?: string) => boolean | undefined;
  getFormatters: (key: string) => { [id: string]: T } | null;
  getFormattersArr: (key: string) => T[] | [];
  getFormatter: (key: string, id: string) => T | null;
};
 */
export type FormatterProviderOptions = {
  comparativeMethod: "case-sensitive" | "case-insensitive";
};

export function FormatterProvider<T>(options?: FormatterProviderOptions) {
  const formatters: { [key: string]: { [id: string]: T } } = {};

  const defaultOptions: FormatterProviderOptions = {
    comparativeMethod: "case-sensitive", // needs implementation
  };

  const optionsObj = { ...defaultOptions, ...options };

  function addFormatters(
    key: string,
    formatterList: T | T[],
  ): string | string[] {
    if (!Array.isArray(formatterList)) {
      formatterList = [formatterList];
    }

    const [formattersCatalog, indexes] = prepareFormatters<T>(formatterList);

    if (!formatters[key]) {
      formatters[key] = {};
    }
    formatters[key] = { ...formatters[key], ...formattersCatalog };

    return indexes.length === 1 ? indexes[0] || [] : indexes;
  }

  function removeFormatter(key: string, id?: string): boolean | undefined {
    if (!id) {
      return delete formatters[key];
    }
    return delete formatters[key]?.[id];
  }

  function getFormatters(key: string): { [id: string]: T } | null {
    return formatters[key] ?? null;
  }

  // function getFormattersArr(key: string): any {
  //   return formatters[key] ? Object.values(formatters[key]) : [];
  // }

  function getFormatter(key: string, id: string): T | null {
    if (!id) {
      return null;
    }
    return formatters[key]?.[id] || null;
  }

  return {
    addFormatters,
    removeFormatter,
    getFormatters,
    // getFormattersArr,
    getFormatter,
  };
}

function prepareFormatters<T>(
  formatters: T[],
): [{ [id: string]: T }, string[]] {
  let indexes: string[] = [];

  const formattersCatalog = formatters.reduce(
    (acc, formatter: T) => {
      const id: string = nanoid();
      indexes = [...indexes, id];
      acc[id] = formatter;
      return acc;
    },
    {} as { [id: string]: T },
  );

  return [formattersCatalog, indexes];
}
