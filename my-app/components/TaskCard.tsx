"use client";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { DELETE_TASK, TOGGLE_TASK_COMPLETION, GET_TASKS } from "@/graphql/queries";
import type { Task } from "@/lib/types";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const [deleteTask, { loading: deleting }] = useMutation(DELETE_TASK, {
    // Remove deleted task from cache optimistically
    update(cache) {
      cache.modify({
        fields: {
          tasks(existing: Task[] = [], { readField }) {
            return existing.filter((t) => readField("id", t) !== task.id);
          },
        },
      });
    },
  });

  const [toggleCompletion] = useMutation(TOGGLE_TASK_COMPLETION, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleDelete = () => {
    if (confirm(`Delete "${task.title}"?`)) {
      deleteTask({ variables: { id: task.id } });
    }
  };

  return (
    <div
      className={`group relative flex flex-col gap-2 p-4 rounded-xl border transition-all shadow-sm
        ${task.completed
          ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-70"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
        }`}
    >
      {/* Priority badge */}
      {task.priority && (
        <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400">
          Priority
        </span>
      )}

      <div className="flex items-start gap-3 pr-16">
        {/* Completion toggle */}
        <button
          onClick={() => toggleCompletion({ variables: { id: task.id } })}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${task.completed ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-gray-500 hover:border-green-400"}`}
          aria-label="Toggle completion"
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`font-medium text-gray-800 dark:text-gray-100 truncate ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : ""}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/tasks/edit?id=${task.id}`}
            className="text-xs px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors disabled:opacity-50"
          >
            {deleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
