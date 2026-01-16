import React from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string; // iconify class name, e.g. "material-symbols--arrow-upward-alt-rounded"
  iconRight?: boolean;
  iconOnly?: boolean; // render only the icon (no text)
  variant?: Variant;
  size?: Size;
  ariaLabel?: string; // required when iconOnly for accessibility
};

export default function Button({
  children,
  className = "",
  icon,
  iconRight = false,
  iconOnly = false,
  variant = "secondary",
  size = "md",
  disabled,
  ariaLabel,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center select-none rounded-md font-bold uppercase transition-colors duration-200 focus:outline-none";

  const sizeMap: Record<Size, string> = {
    sm: "text-sm px-3 py-1.5 gap-0 min-w-16",
    md: "text-base px-4 py-2 gap-0.5 min-w-16",
    lg: "text-lg px-5 py-2.5 gap-1 min-w-16",
  };

  // Styles when only icon: make it a square button per size
  const iconOnlySizeMap: Record<Size, string> = {
    sm: "text-sm w-8 h-8",
    md: "text-base w-9 h-9",
    lg: "text-lg w-10 h-10",
  };

  const variantMap: Record<Variant, string> = {
    primary:
      "bg-accent-700 text-white hover:bg-accent-800 dark:bg-accent-700 dark:hover:bg-accent-600",
    secondary:
      "bg-mirage-50 text-mirage-700 hover:bg-mirage-100 dark:text-mirage-100 dark:bg-slate-700 dark:hover:bg-slate-600 dark:hover:text-white",
  };

  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const iconSizeMap: Record<Size, string> = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  // Reduce padding on the icon side when an icon is present (not for iconOnly)
  const iconSidePaddingMap: Record<Size, { left: string; right: string }> = {
    sm: { left: "pl-2", right: "pr-2" },
    md: { left: "pl-2.5", right: "pr-2.5" },
    lg: { left: "pl-4", right: "pr-4" },
  };

  const iconSidePadding =
    icon && !iconOnly
      ? iconRight
        ? iconSidePaddingMap[size].right
        : iconSidePaddingMap[size].left
      : "";

  const iconEl = icon ? (
    <span
      aria-hidden
      className={`iconify ${icon} ${iconSizeMap[size]} ${!iconOnly ? (iconRight ? "ml-2" : "mr-2") : ""}`}
    />
  ) : null;

  // Accessibility: when iconOnly, use aria-label or title
  const ariaProps = iconOnly
    ? {
        "aria-label": ariaLabel || rest["aria-label"] || rest.title || "Button",
      }
    : {};

  return (
    <button
      {...rest}
      {...ariaProps}
      disabled={disabled}
      className={`${base} ${iconOnly ? iconOnlySizeMap[size] : sizeMap[size]} ${iconSidePadding} ${variantMap[variant]} ${disabledClasses} ${className}`.trim()}
    >
      {iconOnly ? (
        iconEl
      ) : (
        <>
          {!iconRight && iconEl}
          {children}
          {iconRight && iconEl}
        </>
      )}
    </button>
  );
}
