import TaskForm from "@/components/TaskForm";

export default function CreateTaskPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Create Task</h1>
      <TaskForm />
    </div>
  );
}
