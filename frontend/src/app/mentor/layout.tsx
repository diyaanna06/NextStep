"use client";

import { ReactNode } from "react";

import { ProtectedRoute } from "@/components/shared/protected-route";

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
      {children}
    </ProtectedRoute>
  );
}