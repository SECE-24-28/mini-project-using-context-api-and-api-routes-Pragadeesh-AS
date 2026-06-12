"use client";
import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "@/graphql/queries";
import { useTaskContext } from "@/context/TaskContext";
import TaskCard from "./TaskCard";
import Spinner from "./Spinner";
import EmptyState from "./EmptyState";
import type { Task } from "@/lib/types";

export default function TaskList() {
  const { data, loading, error } = useQuery<{ tasks: Task[] }>(GET_TASKS);
  const { search, filter, priorityFilter, sortOrder } = useTaskContext();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 py-10 text-center">Error: {error.message}</p>;

  // Apply filters and search
  let tasks = data?.tasks ?? [];

  if (search) {
    const q = search.toLowerCase();
    tasks = tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
    );
  }

  if (filter === "completed") tasks = tasks.filter((t) => t.completed);
  if (filter === "pending") tasks = tasks.filter((t) => !t.completed);
  if (priorityFilter !== null) tasks = tasks.filter((t) => t.priority === priorityFilter);

  // Sort by createdAt
  tasks = [...tasks].sort((a, b) => {
    const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? -diff : diff;
  });

  if (!tasks.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
