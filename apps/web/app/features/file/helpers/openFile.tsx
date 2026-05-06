import type React from "react";
import { nanoid } from "nanoid";
import { isHar } from "@repo/har-types";
import { readFileData } from "./readFileData";
import { addFile, setFileId } from "../actions";
import { setRowId } from "../../list/actions";
import { addToast } from "../../notifications/actions";
import { FileReadError } from "../components/FileReadError";

export async function openFile(file: File, message: string | React.JSX.Element) {
  const { name, size } = file;
  const fileId = nanoid();

  try {
    const rawData = await readFileData(file);
    const data: unknown = JSON.parse(rawData);

    if (!isHar(data)) {
      addToast({ type: "alert", message });
      return;
    }

    addFile({ fileId, name, size, data });
    setFileId(fileId);
    setRowId(0);
  } catch (error) {
    const reason =
      error instanceof SyntaxError
        ? "The file contains invalid HAR format."
        : error instanceof DOMException
          ? `Read failed: ${error.message}`
          : "An unexpected error occurred.";

    addToast({
      type: "alert",
      message: <FileReadError name={name} reason={reason} />,
    });
  }
}
