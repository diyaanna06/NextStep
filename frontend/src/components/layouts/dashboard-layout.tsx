"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-bold">
          NextStep
        </h2>

        <nav className="mt-8 space-y-4">
          <p>Dashboard</p>
          <p>Profile</p>
          <p>Settings</p>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          {title}
        </h1>

        {children}
      </main>
    </div>
  );
}