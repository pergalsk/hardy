"use client";
import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  className = "",
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

  return (
    <dialog
      ref={dialogRef}
      aria-label={title ?? "Dialog"}
      className={
        "fixed inset-0 m-auto border-0 bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm " +
        className
      }
    >
      <div className="w-[90vw] max-w-2xl select-none overflow-hidden rounded-lg bg-white shadow-xl dark:bg-slate-800">
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
        <div>{children}</div>
      </div>
    </dialog>
  );
}
