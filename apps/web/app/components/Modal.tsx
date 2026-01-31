"use client";
import React, { useEffect, useRef } from "react";

type Size = "small" | "medium" | "big" | "full";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  className?: string;
  size?: Size;
  footer?: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  className = "",
  size = "medium",
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          // Some browsers may throw if dialog is not in document; ignore
        }
      }
      document.documentElement.style.overflow = "hidden";
      dialog.focus();
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      if (dialog && dialog.open) dialog.close();
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    // Track if the interaction started on the backdrop.
    // Only close if both down and up happened on the backdrop.
    let startedOnBackdrop = false;

    const onPointerDown = (e: PointerEvent) => {
      if (!closeOnBackdropClick) return;
      startedOnBackdrop = e.target === dialog;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!closeOnBackdropClick) return;
      if (startedOnBackdrop && e.target === dialog) {
        onClose();
      }
      startedOnBackdrop = false;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);

    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, closeOnBackdropClick]);

  // compute panel class based on size
  const panelBase =
    "select-none overflow-hidden rounded-lg bg-white shadow-xl dark:bg-slate-800 flex flex-col";
  const sizeClasses: Record<Size, string> = {
    small: "w-[85vw] max-w-md",
    medium: "w-[90vw] max-w-3xl",
    big: "w-[95vw] max-w-6xl",
    full: "w-screen h-screen max-w-none rounded-none",
  };

  const panelSizeClass = sizeClasses[size] || sizeClasses.medium;
  const panelClass = `${panelSizeClass} ${panelBase} ${
    size === "full" ? "overflow-auto" : ""
  }`.trim();

  // content area should scroll when it exceeds available viewport height
  const hasFooter = Boolean(footer);
  const contentClass =
    size === "full"
      ? "flex-1 overflow-auto p-4"
      : `overflow-auto p-4 ${hasFooter ? "pb-4" : ""}`.trim();
  const contentStyle: React.CSSProperties | undefined =
    size === "full" ? undefined : { maxHeight: "calc(100vh - 160px)" }; // leave space for header and footer

  const footerClass =
    `flex-none border-t border-gray-200 p-4 dark:border-slate-700 bg-white dark:bg-slate-800 ${hasFooter ? "sticky bottom-0 z-10" : ""}`.trim();

  return (
    <dialog
      ref={dialogRef}
      aria-label={title ?? "Dialog"}
      className={
        "fixed inset-0 m-auto border-0 bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm " +
        className
      }
    >
      <div className={panelClass}>
        <header className="flex justify-between border-b border-gray-100 bg-slate-700 dark:border-slate-700">
          <div className="px-4 py-3 font-medium uppercase text-white dark:text-gray-100">
            {title}
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center px-3 text-2xl text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-600 dark:hover:text-white"
          >
            <span
              aria-hidden="true"
              className="iconify material-symbols--close-rounded text-2xl"
            ></span>
          </button>
        </header>
        <div className={contentClass} style={contentStyle}>
          {children}
        </div>
        {footer ? <div className={footerClass}>{footer}</div> : null}
      </div>
    </dialog>
  );
}
