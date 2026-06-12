"use client";
import { useTaskContext, FilterType, SortOrder } from "@/context/TaskContext";

export default function FilterDropdown() {
  const { filter, setFilter, priorityFilter, setPriorityFilter, sortOrder, setSortOrder } = useTaskContext();

  return (
    <div className="flex flex-wrap gap-2">
      {/* Status filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterType)}
        className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {/* Priority filter */}
      <select
        value={priorityFilter === null ? "all" : String(priorityFilter)}
        onChange={(e) =>
          setPriorityFilter(e.target.value === "all" ? null : e.target.value === "true")
        }
        className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="all">All Priority</option>
        <option value="true">High Priority</option>
        <option value="false">Normal</option>
      </select>

      {/* Sort order */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}
