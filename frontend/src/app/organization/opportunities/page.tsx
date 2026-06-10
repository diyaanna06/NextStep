"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  organizationService,
} from "@/services/organization-service";

import {
  opportunityService,
} from "@/services/opportunity-service";

import {
  OpportunityForm,
} from "./components/opportunity-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OpportunitiesPage() {
  const queryClient =
    useQueryClient();

  const {
    data: profile,
  } = useQuery({
    queryKey: [
      "organization-profile",
    ],

    queryFn: () =>
      organizationService.getMyProfile(),
  });

  const {
    data: opportunities,
    isLoading,
  } = useQuery({
    queryKey: [
      "organization-opportunities",
    ],

    enabled:
      !!profile,

    queryFn: () =>
      opportunityService.getOrganizationOpportunities(
        profile!.user_id
      ),
  });

  const mutation =
    useMutation({
      mutationFn:
        opportunityService.create,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "organization-opportunities",
            ],
          }
        );

        alert(
          "Opportunity created successfully"
        );
      },

      onError: (
        error: unknown
      ) => {
        let message =
          "Failed to create opportunity";

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

        alert(message);
      },
    });

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <Card>
        <CardHeader>
          <CardTitle>
            Create Opportunity
          </CardTitle>
        </CardHeader>

        <CardContent>
          <OpportunityForm
            onSubmit={(
              data
            ) =>
              mutation.mutate(
                data
              )
            }
            isSubmitting={
              mutation.isPending
            }
          />
        </CardContent>
      </Card>

      <div className="space-y-4">

        {opportunities?.map(
          (
            opportunity
          ) => (
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

              <CardContent>
                <p>
                  {
                    opportunity.description
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  {opportunity.is_active
                    ? "Active"
                    : "Inactive"}
                </p>
              </CardContent>
            </Card>
          )
        )}

      </div>

    </div>
  );
}