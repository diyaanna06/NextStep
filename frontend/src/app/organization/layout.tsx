"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/components/shared/protected-route";

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
      {children}
    </ProtectedRoute>
  );
}