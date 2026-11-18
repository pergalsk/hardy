import { useAppStore } from "../../store/store";

export const removeAllFiles = () => useAppStore.setState({ files: [] });
