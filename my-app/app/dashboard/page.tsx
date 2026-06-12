"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "@/graphql/queries";
import TaskList from "@/components/TaskList";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import type { Task } from "@/lib/types";

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`flex flex-col gap-1 px-5 py-4 rounded-xl border ${color}`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { data } = useQuery<{ tasks: Task[] }>(GET_TASKS);
  const tasks = data?.tasks ?? [];

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority).length;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Tasks" value={total} color="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100" />
        <StatCard label="Completed" value={completed} color="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400" />
        <StatCard label="Pending" value={pending} color="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400" />
        <StatCard label="High Priority" value={highPriority} color="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400" />
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar />
        <FilterDropdown />
      </div>

      {/* Task grid */}
      <TaskList />
    </div>
  );
}
