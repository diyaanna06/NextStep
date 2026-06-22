import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Calendar,
  Users,
  ClipboardList,
} from "lucide-react";

import { NavigationItem } from "@/types/navigation";

export const studentNavigation: NavigationItem[] = [
  { title: "Dashboard", href: "/student", icon: LayoutDashboard },
  { title: "Profile", href: "/student/profile", icon: User },
  { title: "Opportunities", href: "/student/opportunities", icon: Briefcase },
  { title: "Applications", href: "/student/applications", icon: FileText },
  { title: "Mentors", href: "/student/mentors", icon: Users },
  { title: "Sessions", href: "/student/sessions", icon: Calendar },
];

export const mentorNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/mentor",
    icon: LayoutDashboard,
  },

  {
    title: "Profile",
    href: "/mentor/profile",
    icon: User,
  },

  {
    title: "Session Requests",
    href: "/mentor/sessions",
    icon: Calendar,
  },
];
export const organizationNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/organization",
    icon: LayoutDashboard,
  },

  {
    title: "Profile",
    href: "/organization/profile",
    icon: User,
  },

  {
    title: "Opportunities",
    href: "/organization/opportunities",
    icon: Briefcase,
  },

  {
    title: "Applicants",
    href: "/organization/applicants",
    icon: ClipboardList,
  },
];
