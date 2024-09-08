import { HeaderValueFormatter } from "../providers/headerValueFormatter";

export const HeadersIcons = ({
  formatters,
  setFormatter,
}: {
  formatters: {
    [id: string]: HeaderValueFormatter;
  };
  setFormatter: (id: string) => void;
}): JSX.Element | null => {
  const formattersList = Object.entries(formatters);
  if (formattersList.length === 0) {
    return null;
  }

  return (
    <span className="dark:text-bunker-50 my-auto ml-2 inline-flex select-none items-center gap-1 align-top text-slate-300">
      {formattersList.map(([id, formatter]) => {
        const { title, tooltip, icon, format } = formatter;
        return (
          <span
            key={id}
            className="dark:hover:text-accent-500 hover:text-accent-500"
            onClick={() => setFormatter(id)}
          >
            <span className={`text-lg ${icon}`}></span>
          </span>
        );
      })}
    </span>
  );
};
