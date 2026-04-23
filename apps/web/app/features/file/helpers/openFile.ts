import type React from "react";
import { nanoid } from "nanoid";
import { readFileData } from "./readFileData";
import { addFile, setFileId } from "../actions";
import { setRowId } from "../../list/actions";
import { addToast } from "../../notifications/actions";

export async function openFile(file: File, message: string | React.JSX.Element) {
  const { name, size } = file;
  const fileId = nanoid();

  try {
    const rawData = await readFileData(file);
    const data = JSON.parse(rawData);
    addFile({ fileId, name, size, data });
    setFileId(fileId);
    setRowId(0);
  } catch (error) {
    console.error("Error loading file:", error);
    addToast({
      type: "alert",
      message,
    });
  }
}
