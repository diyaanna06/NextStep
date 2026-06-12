"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { OrganizationSidebar } from "@/components/layout/organization-sidebar";

interface OrganizationLayoutProps {
  children: ReactNode;
}

export default function OrganizationLayout({
  children,
}: OrganizationLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["organization"]}>
      <div className="flex min-h-screen bg-background">
        <OrganizationSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
