"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/components/shared/protected-route";

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
      {children}
    </ProtectedRoute>
  );
}