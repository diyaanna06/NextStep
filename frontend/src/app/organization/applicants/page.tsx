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
  applicationService,
} from "@/services/application-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

export default function ApplicantsPage() {
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

  const {
    data: applications,
    isLoading,
  } = useQuery({
    queryKey: [
      "organization-applications",
      opportunities,
    ],

    enabled:
      !!opportunities,

    queryFn: async () => {
      const allApplications =
        await Promise.all(
          opportunities!.map(
            (
              opportunity
            ) =>
              applicationService.getOpportunityApplications(
                opportunity.id
              )
          )
        );

      return allApplications.flat();
    },
  });

  const mutation =
    useMutation({
      mutationFn: ({
        applicationId,
        status,
      }: {
        applicationId: number;
        status: string;
      }) =>
        applicationService.updateStatus(
          applicationId,
          {
            status,
          }
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "organization-applications",
            ],
          }
        );
      },
    });

  if (isLoading) {
    return (
      <div>
        Loading applicants...
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {applications?.map(
        (
          application
        ) => (
          <Card
            key={
              application.id
            }
          >
            <CardHeader>
              <CardTitle>
                Student #
                {
                  application.student_id
                }
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <p>
                Status:
                {" "}
                {
                  application.status
                }
              </p>

              <div className="flex flex-wrap gap-2">

                {[
                  "Reviewed",
                  "Shortlisted",
                  "Accepted",
                  "Rejected",
                ].map(
                  (
                    status
                  ) => (
                    <Button
                      key={
                        status
                      }
                      onClick={() =>
                        mutation.mutate(
                          {
                            applicationId:
                              application.id,

                            status,
                          }
                        )
                      }
                    >
                      {
                        status
                      }
                    </Button>
                  )
                )}

              </div>

            </CardContent>
          </Card>
        )
      )}

    </div>
  );
}