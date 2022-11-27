import type { Item } from "@/components/types";

export const createNewTagByInput = (value: string): Item => {
  return {
    id: value.toLowerCase().split(" ").join("-"),
    label: value,
  };
};
