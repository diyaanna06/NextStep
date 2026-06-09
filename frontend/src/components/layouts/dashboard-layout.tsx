"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { studentNavigation } from "@/lib/dashboard-navigation";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-bold">
          NextStep
        </h2>

        <nav className="mt-8 space-y-2">
          {studentNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                pathname === item.href &&
                  "bg-muted font-medium"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
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