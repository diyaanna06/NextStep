"use client";

import { RoleSidebar } from "./role-sidebar";
import { mentorNavigation } from "@/lib/dashboard-navigation";

export function MentorSidebar() {
  return <RoleSidebar portalLabel="Mentor Portal" items={mentorNavigation} />;
}
