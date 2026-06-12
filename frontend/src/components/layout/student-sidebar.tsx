"use client";

import { RoleSidebar } from "./role-sidebar";
import { studentNavigation } from "@/lib/dashboard-navigation";

export function StudentSidebar() {
  return <RoleSidebar portalLabel="Student Portal" items={studentNavigation} />;
}
