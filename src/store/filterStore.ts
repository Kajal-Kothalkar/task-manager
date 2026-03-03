import { create } from "zustand";

type FilterType = "all" | "completed" | "pending";

interface TaskFilterState {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

export const useFilterStore = create<TaskFilterState>((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));