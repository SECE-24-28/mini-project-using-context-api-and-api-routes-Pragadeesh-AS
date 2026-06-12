"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_TASK } from "@/graphql/queries";
import TaskForm from "@/components/TaskForm";
import Spinner from "@/components/Spinner";
import type { Task } from "@/lib/types";

function EditTaskContent() {
  const params = useSearchParams();
  const id = parseInt(params.get("id") ?? "0", 10);

  const { data, loading, error } = useQuery<{ task: Task }>(GET_TASK, {
    variables: { id },
    skip: !id,
  });

  if (!id) return <p className="text-red-500">No task ID provided.</p>;
  if (loading) return <Spinner />;
  if (error || !data?.task) return <p className="text-red-500">Task not found.</p>;

  return <TaskForm task={data.task} />;
}

export default function EditTaskPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Task</h1>
      <Suspense fallback={<Spinner />}>
        <EditTaskContent />
      </Suspense>
    </div>
  );
}
