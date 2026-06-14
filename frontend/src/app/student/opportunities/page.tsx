"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { opportunityService } from "@/services/opportunity-service";
import { applicationService } from "@/services/application-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/shared/page-header";

import { Badge } from "@/components/ui/badge";

import {
  Briefcase,
  MapPin,
  Calendar,
  Sparkles,
  Loader2,
  Globe,
  BadgeCheck,
} from "lucide-react";

export default function OpportunitiesPage() {
  const queryClient = useQueryClient();
const router = useRouter();
  const {
    data: opportunities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () =>
      opportunityService.getAll(),
  });

  const activeOpportunities =
    opportunities?.filter(
      (opportunity) =>
        opportunity.is_active
    ) ?? [];

  const {
    data: applications,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: () =>
      applicationService.getMyApplications(),
  });

  const appliedOpportunityIds =
    new Set(
      applications?.map(
        (application) =>
          application.opportunity.id
      ) ?? []
    );

  const applyMutation =
  useMutation({
    mutationFn: (
      opportunityId: number
    ) =>
      applicationService.apply({
        opportunity_id:
          opportunityId,
      }),

    onSuccess: () => {
      toast.success(
        "Application submitted",
        {
          description:
            "Your application has been submitted successfully.",
        }
      );

      queryClient.invalidateQueries(
        {
          queryKey: [
            "applications",
          ],
        }
      );
    },

    onError: (
      error: unknown
    ) => {
      let message =
        "Failed to apply.";

      if (
        typeof error ===
          "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError =
          error as {
            response?: {
              data?: {
                detail?: string;
              };
            };
          };

        message =
          axiosError
            .response
            ?.data
            ?.detail ??
          message;
      }

      if (
        message ===
        "Student profile not found"
      ) {
        toast.error(
          "Complete your profile first",
          {
            description:
              "You need to complete your profile before applying to opportunities.",

            action: {
              label:
                "Complete Profile",

              onClick: () => {
                router.push(
                  "/student/profile"
                );
              },
            },
          }
        );

        return;
      }

      toast.error(
        "Application failed",
        {
          description:
            message,
        }
      );
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading opportunities…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load opportunities.
      </div>
    );
  }

  if (
    activeOpportunities.length ===
    0
  ) {
    return (
      <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
        <Briefcase className="h-8 w-8 text-muted-foreground" />

        <p className="mt-3 font-medium">
          No opportunities available
        </p>

        <p className="text-sm text-muted-foreground">
          Check back soon —
          new opportunities are
          posted regularly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunities"
        description="Browse open roles and apply with one click."
      />

      <div className="grid gap-4">
        {activeOpportunities.map(
          (opportunity) => {
            const hasApplied =
              appliedOpportunityIds.has(
                opportunity.id
              );

            const isApplying =
              applyMutation.isPending &&
              applyMutation.variables ===
                opportunity.id;

            return (
              <Card
                key={
                  opportunity.id
                }
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <CardTitle className="truncate">
                        {
                          opportunity.title
                        }
                      </CardTitle>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">
                          {
                            opportunity
                              .organization
                              .organization_name
                          }
                        </span>

                        {opportunity
                          .organization
                          .verified && (
                          <Badge variant="outline">
                            <BadgeCheck className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}

                        <span>
                          •
                        </span>

                        <span>
                          {
                            opportunity
                              .organization
                              .industry
                          }
                        </span>
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className="shrink-0"
                    >
                      {
                        opportunity.opportunity_type
                      }
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {
                      opportunity.description
                    }
                  </p>

                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />

                      <span className="truncate">
                        {opportunity.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />

                      <span>
                        Deadline{" "}
                        {new Date(
                          opportunity.application_deadline
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4 shrink-0" />

                        <a
                          href={opportunity.organization.website}
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
                        {opportunity.skills_required}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        applyMutation.mutate(
                          opportunity.id
                        )
                      }
                      disabled={
                        hasApplied ||
                        isApplying
                      }
                      variant={
                        hasApplied
                          ? "secondary"
                          : "default"
                      }
                    >
                      {hasApplied
                        ? "Applied"
                        : isApplying
                        ? "Applying…"
                        : "Apply"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}