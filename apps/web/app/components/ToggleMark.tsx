export function ToggleMark({
  opened,
  size,
}: {
  opened: boolean;
  size?: "small" | "medium" | "large";
}): JSX.Element {
  const rotation = opened ? "rotate-90" : "rotate-0";

  const sizeClasses = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  };

  return (
    <span
      className={`${rotation} ${sizeClasses[size || "medium"]} iconify material-symbols--keyboard-arrow-right relative bottom-[1px] transform transition-transform duration-200`}
    ></span>
  );
}
