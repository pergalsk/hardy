export const ExpandButton = ({
  inline = true,
  classes = "dark:bg-black bg-white",
  handleClick,
  children,
}: {
  inline?: boolean;
  classes?: string;
  handleClick: () => void;
  children: React.ReactNode;
}): JSX.Element => {
  const display = inline
    ? "absolute bottom-0 right-0 inline"
    : "static flex items-end";

  return (
    <button
      onClick={() => handleClick()}
      className={`${display} ${classes} dark:text-accent-300 dark:bg-bunker-500 hover:dark:text-accent-100 text-accent-600 hover:text-accent-800 select-none rounded-sm pl-2 text-[90%] uppercase transition-colors duration-200`}
    >
      {children}
    </button>
  );
};
