"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/student",
    label: "Dashboard",
  },
  {
    href: "/student/profile",
    label: "Profile",
  },
  {
    href: "/student/opportunities",
    label: "Opportunities",
  },
  {
    href: "/student/applications",
    label: "Applications",
  },
  {
    href: "/student/mentors",
    label: "Mentors",
  },
  {
    href: "/student/sessions",
    label: "Sessions",
  },
];

export function StudentSidebar() {
  const pathname =
    usePathname();

  return (
    <aside className="w-64 border-r bg-background">

      <div className="p-6">
        <h2 className="text-2xl font-bold">
          NextStep
        </h2>

        <p className="text-sm text-muted-foreground">
          Student Portal
        </p>
      </div>

      <nav className="space-y-2 px-4">

        {items.map(
          (item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-2 transition-colors ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          )
        )}

      </nav>

    </aside>
  );
}