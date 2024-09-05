import { nanoid } from "nanoid";

export type FormatterProvider<T> = () => {
  addFormatter: (key: string, formatter: T) => void;
  removeFormatter: (key: string, id?: string) => boolean | undefined;
  getFormatters: (key: string) => { [id: string]: T } | null;
  getFormattersArr: (key: string) => T[] | [];
  getFormatter: (key: string, id: string) => T | null;
};

export function FormatterProvider<T>() {
  const formatters: { [key: string]: { [id: string]: T } } = {};

  function addFormatter(key: string, formatter: T): string {
    const id = nanoid();

    if (!formatters[key]) {
      formatters[key] = { [id]: formatter };
    } else {
      formatters[key][id] = formatter;
    }

    return id;
  }

  function removeFormatter(key: string, id?: string): boolean | undefined {
    if (!id) {
      return delete formatters[key];
    }
    return delete formatters[key]?.[id];
  }

  function getFormatters(key: string): { [id: string]: T } | null {
    return formatters[key] ? formatters[key] : null;
  }

  function getFormattersArr(key: string): T[] | [] {
    return formatters[key] ? Object.values(formatters[key]) : [];
  }

  function getFormatter(key: string, id: string): T | null {
    if (!id) {
      return null;
    }
    return formatters[key]?.[id] || null;
  }

  return {
    addFormatter,
    removeFormatter,
    getFormatters,
    getFormattersArr,
    getFormatter,
  };
}
