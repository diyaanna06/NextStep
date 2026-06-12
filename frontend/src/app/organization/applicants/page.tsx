"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { organizationService } from "@/services/organization-service";
import { opportunityService } from "@/services/opportunity-service";
import { applicationService } from "@/services/application-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ClipboardList, Loader2 } from "lucide-react";

export default function ApplicantsPage() {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["organization-profile"],
    queryFn: () => organizationService.getMyProfile(),
  });

  const { data: opportunities } = useQuery({
    queryKey: ["organization-opportunities"],
    enabled: !!profile,
    queryFn: () =>
      opportunityService.getOrganizationOpportunities(profile!.user_id),
  });

  const { data: applications, isLoading } = useQuery({
    queryKey: ["organization-applications", opportunities],
    enabled: !!opportunities,
    queryFn: async () => {
      const allApplications = await Promise.all(
        opportunities!.map((opportunity) =>
          applicationService.getOpportunityApplications(opportunity.id)
        )
      );
      return allApplications.flat();
    },
  });

  const mutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: string;
    }) => applicationService.updateStatus(applicationId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-applications"],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading applicants…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applicants"
        description="Review applicants for your opportunities and update their status."
      />

      {!applications || applications.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">No applicants yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => {
            const isUpdating =
              mutation.isPending &&
              mutation.variables?.applicationId === application.id;
            return (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle>Student #{application.student_id}</CardTitle>
                    <StatusBadge status={application.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                    Update status
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Reviewed", "Shortlisted", "Accepted", "Rejected"].map(
                      (status) => {
                        const variant =
                          status === "Rejected"
                            ? "destructive"
                            : status === "Accepted"
                            ? "default"
                            : "outline";
                        return (
                          <Button
                            key={status}
                            size="sm"
                            variant={variant}
                            disabled={isUpdating}
                            onClick={() =>
                              mutation.mutate({
                                applicationId: application.id,
                                status,
                              })
                            }
                          >
                            {status}
                          </Button>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
