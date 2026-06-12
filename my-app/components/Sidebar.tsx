"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/tasks/create", label: "Create Task", icon: "＋" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 py-6 px-3 gap-1">
      <p className="px-3 mb-2 text-xs font-semibold uppercase text-gray-400 tracking-widest">Menu</p>
      {links.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${pathname === href
              ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          <span>{icon}</span>
          {label}
        </Link>
      ))}
    </aside>
  );
}
