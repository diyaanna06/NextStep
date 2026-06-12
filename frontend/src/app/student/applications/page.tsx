"use client";

import { useQuery } from "@tanstack/react-query";
import { applicationService } from "@/services/application-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FileText, Loader2 } from "lucide-react";

export default function ApplicationsPage() {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationService.getMyApplications(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading applications…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load applications.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description="Track the status of every opportunity you have applied to."
      />

      {!applications || applications.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">No applications yet</p>
          <p className="text-sm text-muted-foreground">
            Apply to opportunities and they will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle>
                    Opportunity #{application.opportunity_id}
                  </CardTitle>
                  <StatusBadge status={application.status} />
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Applied on{" "}
                {new Date(application.created_at).toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
