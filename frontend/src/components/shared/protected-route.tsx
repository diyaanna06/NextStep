"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth-store";

interface ProtectedRouteProps {
  children: ReactNode;

  allowedRoles?: (
    | "student"
    | "mentor"
    | "organization"
  )[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    isAuthenticated,
    user,
  } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (
      allowedRoles &&
      user &&
      !allowedRoles.includes(
        user.role
      )
    ) {
      router.push("/");
    }
  }, [
    isAuthenticated,
    user,
    allowedRoles,
    router,
  ]);

  if (
    !isAuthenticated ||
    (
      allowedRoles &&
      user &&
      !allowedRoles.includes(
        user.role
      )
    )
  ) {
    return null;
  }

  return <>{children}</>;
}