"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { opportunityService } from "@/services/opportunity-service";
import { applicationService } from "@/services/application-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function OpportunitiesPage() {
  const queryClient =
    useQueryClient();

  const {
    data: opportunities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["opportunities"],

    queryFn: () =>
      opportunityService.getAll(),
  });

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
        alert(
          "Application submitted successfully!"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "applications",
          ],
        });
      },

      onError: (error: unknown) => {
  let message =
    "Failed to apply.";

  if (
    typeof error === "object" &&
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
      axiosError.response
        ?.data?.detail ??
      message;
  }

  alert(message);
},
    });

  if (isLoading) {
    return (
      <div>
        Loading opportunities...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load opportunities.
      </div>
    );
  }

  if (
    !opportunities ||
    opportunities.length === 0
  ) {
    return (
      <div>
        No opportunities available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {opportunities.map(
        (opportunity) => (
          <Card
            key={
              opportunity.id
            }
          >
            <CardHeader>
              <CardTitle>
                {
                  opportunity.title
                }
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <p>
                {
                  opportunity.description
                }
              </p>

              <div>
                <strong>
                  Type:
                </strong>{" "}
                {
                  opportunity.opportunity_type
                }
              </div>

              <div>
                <strong>
                  Location:
                </strong>{" "}
                {
                  opportunity.location
                }
              </div>

              <div>
                <strong>
                  Skills:
                </strong>{" "}
                {
                  opportunity.skills_required
                }
              </div>

              <div>
                <strong>
                  Deadline:
                </strong>{" "}
                {new Date(
                  opportunity.application_deadline
                ).toLocaleDateString()}
              </div>

              <Button
                onClick={() =>
                  applyMutation.mutate(
                    opportunity.id
                  )
                }
                disabled={
                  applyMutation.isPending
                }
              >
                {applyMutation.isPending
                  ? "Applying..."
                  : "Apply"}
              </Button>

            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}