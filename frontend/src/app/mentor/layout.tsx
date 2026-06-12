"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/components/shared/protected-route";

import { MentorSidebar } from "@/components/layout/mentor-sidebar";

interface MentorLayoutProps {
  children: ReactNode;
}

export default function MentorLayout({
  children,
}: MentorLayoutProps) {
  return (
    <ProtectedRoute
      allowedRoles={[
        "mentor",
      ]}
    >
      <div className="flex min-h-screen">

        <MentorSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}