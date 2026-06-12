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
    <ProtectedRoute
      allowedRoles={[
        "organization",
      ]}
    >
      <div className="flex min-h-screen">

        <OrganizationSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}