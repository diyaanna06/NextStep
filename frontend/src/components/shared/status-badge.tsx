import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Pending: "bg-warning/15 text-warning-foreground ring-warning/30",
  "Under Review": "bg-info/15 text-info ring-info/30",
  Reviewed: "bg-info/15 text-info ring-info/30",
  Shortlisted: "bg-info/15 text-info ring-info/30",
  Accepted: "bg-success/15 text-success ring-success/30",
  Completed: "bg-success/15 text-success ring-success/30",
  Rejected: "bg-destructive/15 text-destructive ring-destructive/30",
  Active: "bg-success/15 text-success ring-success/30",
  Inactive: "bg-muted text-muted-foreground ring-border",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = map[status] ?? "bg-muted text-muted-foreground ring-border";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        cls
      )}
    >
      {status}
    </span>
  );
}
