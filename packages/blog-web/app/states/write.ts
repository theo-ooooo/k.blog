import _ from "lodash";
import { sangte, useSangteActions, useSangteValue } from "sangte";
import type { AppError } from "~/lib/error";

interface WriteState {
  form: {
    title: string;
    tags: number[];
    content: string;
    display: number;
    thumbnailId: number | null;
  };
  thumnailPath: string;
  error?: AppError;
}

const initialState: WriteState = {
  form: {
    title: "",
    tags: [],
    content: "",
    display: 1,
    thumbnailId: null,
  },
  thumnailPath: "",
  error: undefined,
};

export const writeState = sangte(initialState, (prev) => ({
  change(key: keyof WriteState["form"], value: string | number) {
    if (key === "tags" && typeof value === "number") {
      prev.form[key].push(value);
    } else if (
      (key === "title" || key === "content") &&
      typeof value === "string"
    ) {
      prev.form[key] = value;
    } else if (
      (key === "display" || key === "thumbnailId") &&
      typeof value === "number"
    ) {
      prev.form[key] = value;
    }
  },
  setError(error: AppError) {
    prev.error = error;
  },
  removeTag(propsTag: number) {
    prev.form.tags = prev.form.tags.filter((tag) => tag !== propsTag);
  },
  changeThumbnail(thumbnailPath: string) {
    prev.thumnailPath = thumbnailPath;
  },
}));

export function useWriteActions() {
  return useSangteActions(writeState);
}

export function useWriteValue() {
  return useSangteValue(writeState);
}
