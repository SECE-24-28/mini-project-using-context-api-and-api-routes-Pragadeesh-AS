"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/dashboard" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
          TaskFlow
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/tasks/create"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + New Task
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
