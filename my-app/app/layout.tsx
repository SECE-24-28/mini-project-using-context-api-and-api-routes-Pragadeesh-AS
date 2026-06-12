import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { TaskProvider } from "@/context/TaskContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Full-stack Task Management App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <ApolloWrapper>
          <ThemeProvider>
            <TaskProvider>
              <Navbar />
              <div className="flex min-h-[calc(100vh-57px)]">
                <Sidebar />
                <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                  {children}
                </main>
              </div>
            </TaskProvider>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
