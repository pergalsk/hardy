import { nanoid } from "nanoid";

export type FormatterProviderOptions = {
  comparativeMethod: "case-sensitive" | "case-insensitive";
};

const defaultOptions: FormatterProviderOptions = {
  comparativeMethod: "case-insensitive",
};

export function FormatterProvider<T>(options?: FormatterProviderOptions) {
  const formatters: { [key: string]: { [id: string]: T } } = {};
  const optionsObj = { ...defaultOptions, ...options };

  function addFormatters(
    originalKey: string,
    formatterList: T | T[],
  ): string | string[] {
    const key = transformKey(originalKey, optionsObj.comparativeMethod);

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

  function removeFormatter(
    originalKey: string,
    id?: string,
  ): boolean | undefined {
    const key = transformKey(originalKey, optionsObj.comparativeMethod);

    if (!id) {
      return delete formatters[key];
    }
    return delete formatters[key]?.[id];
  }

  function getFormatters(originalKey: string): { [id: string]: T } | null {
    const key = transformKey(originalKey, optionsObj.comparativeMethod);
    return formatters[key] ?? null;
  }

  // function getFormattersArr(originalKey: string): any {
  //   const key = transformKey(originalKey, optionsObj.comparativeMethod);
  //   return formatters[key] ? Object.values(formatters[key]) : [];
  // }

  function getFormatter(originalKey: string, id: string): T | null {
    if (!id) {
      return null;
    }
    const key = transformKey(originalKey, optionsObj.comparativeMethod);
    return formatters[key]?.[id] || null;
  }

  function getDefaultFormatter(originalKey: string): [string, T] | null {
    const key = transformKey(originalKey, optionsObj.comparativeMethod);
    const formattersObj = formatters[key];

    if (formattersObj == null) {
      return null;
    }

    return Object.entries(formattersObj)[0] || null;
  }

  return {
    addFormatters,
    removeFormatter,
    getFormatters,
    // getFormattersArr,
    getFormatter,
    getDefaultFormatter,
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

function transformKey(
  key: string,
  comparativeMethod: FormatterProviderOptions["comparativeMethod"],
) {
  if (comparativeMethod === "case-sensitive") {
    return key;
  }
  if (comparativeMethod === "case-insensitive") {
    return key.toLowerCase();
  }
  return key;
}
