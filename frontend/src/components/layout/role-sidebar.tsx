"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LogOut, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  VisuallyHidden,
} from "@radix-ui/react-visually-hidden";
import { useAuthStore } from "@/stores/auth-store";
import { NavigationItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface RoleSidebarProps {
  portalLabel: string;
  items: NavigationItem[];
}

interface SidebarContentProps {
  portalLabel: string;
  items: NavigationItem[];
  pathname: string;
  onNavigate?: () => void;
}

function SidebarContent({
  portalLabel,
  items,
  pathname,
  onNavigate,
}: SidebarContentProps) {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
          N
        </div>

        <div className="leading-tight">
          <p className="font-heading text-base font-semibold">
            NextStep
          </p>

          <p className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">
            {portalLabel}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const active =
            item.href === `/${user?.role}`
              ? pathname === item.href
              : pathname === item.href ||
                pathname.startsWith(
                  item.href + "/"
                );

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        {user && (
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-sidebar-accent text-sm font-semibold">
              {(user.email ?? "?")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user.email}
              </p>

              <p className="text-[11px] capitalize text-sidebar-foreground/60">
                {user.role}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            logout();
            onNavigate?.();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />

          Sign out
        </button>
      </div>
    </>
  );
}

export function RoleSidebar({
  portalLabel,
  items,
}: RoleSidebarProps) {
  const pathname = usePathname();

  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open navigation menu"
            className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-sm md:hidden"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </SheetTrigger>

        <SheetContent
  side="left"
  className="w-64 border-r border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
>
  <VisuallyHidden>
    <SheetHeader>
      <SheetTitle>
        Navigation Menu
      </SheetTitle>

      <SheetDescription>
        Access dashboard navigation links.
      </SheetDescription>
    </SheetHeader>
  </VisuallyHidden>

  <div className="flex h-full flex-col">
    <SidebarContent
      portalLabel={portalLabel}
      items={items}
      pathname={pathname}
      onNavigate={() =>
        setOpen(false)
      }
    />
  </div>
</SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        <SidebarContent
          portalLabel={portalLabel}
          items={items}
          pathname={pathname}
        />
      </aside>
    </>
  );
}