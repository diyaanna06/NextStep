"use client";

import { useQuery } from "@tanstack/react-query";

import { applicationService } from "@/services/application-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PageHeader } from "@/components/shared/page-header";

import { StatusBadge } from "@/components/shared/status-badge";

import { Badge } from "@/components/ui/badge";

import {
  FileText,
  Loader2,
  MapPin,
  Calendar,
  Sparkles,
  Globe,
  BadgeCheck,
} from "lucide-react";

export default function ApplicationsPage() {
  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: () =>
      applicationService.getMyApplications(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading applications…
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

      {!applications ||
      applications.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <FileText className="h-8 w-8 text-muted-foreground" />

          <p className="mt-3 font-medium">
            No applications yet
          </p>

          <p className="text-sm text-muted-foreground">
            Apply to opportunities and
            they will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map(
            (application) => (
              <Card
                key={application.id}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <CardTitle className="truncate">
                        {
                          application
                            .opportunity
                            .title
                        }
                      </CardTitle>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">
                          {
                            application
                              .opportunity
                              .organization
                              .organization_name
                          }
                        </span>

                        {application
                          .opportunity
                          .organization
                          .verified && (
                          <Badge variant="outline">
                            <BadgeCheck className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}

                        <span>•</span>

                        <span>
                          {
                            application
                              .opportunity
                              .organization
                              .industry
                          }
                        </span>
                      </div>
                    </div>

                    <StatusBadge
                      status={
                        application.status
                      }
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {
                      application
                        .opportunity
                        .description
                    }
                  </p>

                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />

                      <span>
                        {
                          application
                            .opportunity
                            .location
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />

                      <span>
                        Deadline{" "}
                        {new Date(
                          application
                            .opportunity
                            .application_deadline
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4 shrink-0" />

                      <a
                        href={
                          application
                            .opportunity
                            .organization
                            .website
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Organization Website
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sparkles className="h-4 w-4 shrink-0" />

                      <span className="truncate">
                        {
                          application
                            .opportunity
                            .skills_required
                        }
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-3 text-sm text-muted-foreground">
                    Applied on{" "}
                    {new Date(
                      application.created_at
                    ).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}