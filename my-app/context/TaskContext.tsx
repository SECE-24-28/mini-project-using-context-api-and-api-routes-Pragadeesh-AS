"use client";
import { createContext, useContext, useState } from "react";

export type FilterType = "all" | "completed" | "pending";
export type SortOrder = "newest" | "oldest";

interface TaskContextType {
  search: string;
  setSearch: (v: string) => void;
  filter: FilterType;
  setFilter: (v: FilterType) => void;
  priorityFilter: boolean | null;
  setPriorityFilter: (v: boolean | null) => void;
  sortOrder: SortOrder;
  setSortOrder: (v: SortOrder) => void;
}

const TaskContext = createContext<TaskContextType>({
  search: "",
  setSearch: () => {},
  filter: "all",
  setFilter: () => {},
  priorityFilter: null,
  setPriorityFilter: () => {},
  sortOrder: "newest",
  setSortOrder: () => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [priorityFilter, setPriorityFilter] = useState<boolean | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  return (
    <TaskContext.Provider
      value={{ search, setSearch, filter, setFilter, priorityFilter, setPriorityFilter, sortOrder, setSortOrder }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
