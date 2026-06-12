"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/components/shared/protected-route";

import { StudentSidebar } from "@/components/layout/student-sidebar";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({
  children,
}: StudentLayoutProps) {
  return (
    <ProtectedRoute
      allowedRoles={[
        "student",
      ]}
    >
      <div className="flex min-h-screen">

        <StudentSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}