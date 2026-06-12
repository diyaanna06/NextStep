"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { mentorService } from "@/services/mentor-service";
import { sessionRequestService } from "@/services/session-request-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Calendar, Loader2 } from "lucide-react";

export default function MentorSessionsPage() {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["mentor-profile"],
    queryFn: () => mentorService.getMyProfile(),
  });

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ["mentor-requests"],
    enabled: !!profile,
    queryFn: () =>
      sessionRequestService.getMentorRequests(profile!.user_id),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: number;
      status: string;
    }) => sessionRequestService.updateStatus(requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentor-requests"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading requests…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load requests.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Session Requests"
        description="Accept or reject incoming mentorship requests."
      />

      {!requests || requests.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <Calendar className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">No session requests</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle>Student #{request.student_id}</CardTitle>
                  <StatusBadge status={request.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {request.message}
                </p>

                {request.status === "Pending" && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() =>
                        updateMutation.mutate({
                          requestId: request.id,
                          status: "Accepted",
                        })
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        updateMutation.mutate({
                          requestId: request.id,
                          status: "Rejected",
                        })
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
