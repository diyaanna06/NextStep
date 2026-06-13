"use client";

import { useQuery } from "@tanstack/react-query";

import { sessionRequestService } from "@/services/session-request-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PageHeader } from "@/components/shared/page-header";

import { StatusBadge } from "@/components/shared/status-badge";

import {
  Calendar,
  Loader2,
  Briefcase,
  Building2,
  Clock,
} from "lucide-react";

export default function SessionsPage() {
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session-requests"],
    queryFn: () =>
      sessionRequestService.getMyRequests(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading session requests…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load session requests.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentorship Sessions"
        description="Review the status of your mentor session requests."
      />

      {!requests ||
      requests.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <Calendar className="h-8 w-8 text-muted-foreground" />

          <p className="mt-3 font-medium">
            No session requests yet
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
  {requests.map((request) => (
    <Card key={request.id}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
              {(request.mentor.full_name ?? "?")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <CardTitle>
                {request.mentor.full_name}
              </CardTitle>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {request.mentor.current_role}
                </span>

                <span>•</span>

                <span>
                  {request.mentor.company}
                </span>
              </div>
            </div>
          </div>

          <StatusBadge
            status={request.status}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="h-4 w-4 shrink-0" />

            <span>
              {request.mentor.years_of_experience} years experience
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />

            <span>
              {request.mentor.expertise_areas}
            </span>
          </div>
        </div>

        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          {request.message}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />

          Requested on{" "}
          {new Date(
            request.created_at
          ).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  ))}
</div>
      )}
    </div>
  );
}