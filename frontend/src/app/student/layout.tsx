"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { StudentSidebar } from "@/components/layout/student-sidebar";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="flex min-h-screen bg-background">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
