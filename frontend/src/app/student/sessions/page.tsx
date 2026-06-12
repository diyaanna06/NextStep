"use client";

import { useQuery } from "@tanstack/react-query";
import { sessionRequestService } from "@/services/session-request-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Calendar, Loader2 } from "lucide-react";

export default function SessionsPage() {
  const { data: requests, isLoading, error } = useQuery({
    queryKey: ["session-requests"],
    queryFn: () => sessionRequestService.getMyRequests(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading session requests…
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

      {!requests || requests.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <Calendar className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">No session requests yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle>Mentor #{request.mentor_id}</CardTitle>
                  <StatusBadge status={request.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{request.message}</p>
                <p className="text-xs text-muted-foreground">
                  Requested on{" "}
                  {new Date(request.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
