"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { MentorSidebar } from "@/components/layout/mentor-sidebar";

interface MentorLayoutProps {
  children: ReactNode;
}

export default function MentorLayout({ children }: MentorLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["mentor"]}>
      <div className="flex min-h-screen bg-background">
        <MentorSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 md:px-10 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
