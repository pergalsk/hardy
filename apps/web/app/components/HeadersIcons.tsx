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
    <span className="dark:text-accent-400 float-right my-auto ml-2 inline-flex select-none items-center align-top text-slate-300">
      <span className="hidden group-hover:inline">
        {formattersList.map(([id, formatter]) => {
          const { title, tooltip, icon, format } = formatter;
          return (
            <span
              key={id}
              className="dark:hover:text-accent-100 hover:text-accent-500 ml-1.5"
              onClick={() => setFormatter(id)}
            >
              <span className={`text-lg ${icon}`}></span>
            </span>
          );
        })}
      </span>
      <span>
        <span className="iconify material-symbols--tune-rounded dark:text-accent-400 text-lg group-hover:hidden"></span>
      </span>
    </span>
  );
};
