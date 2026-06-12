"use client";

import { RoleSidebar } from "./role-sidebar";
import { organizationNavigation } from "@/lib/dashboard-navigation";

export function OrganizationSidebar() {
  return (
    <RoleSidebar
      portalLabel="Organization Portal"
      items={organizationNavigation}
    />
  );
}
