"use client";

import { useQuery } from "@tanstack/react-query";

import { applicationService } from "@/services/application-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <div>
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load applications.
      </div>
    );
  }

  if (
    !applications ||
    applications.length === 0
  ) {
    return (
      <div>
        No applications yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {applications.map(
        (application) => (
          <Card
            key={application.id}
          >

            <CardHeader>
              <CardTitle>
                Opportunity #{application.opportunity_id}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">

              <div>
                <strong>Status:</strong>{" "}
                {application.status}
              </div>

              <div>
                <strong>Applied On:</strong>{" "}
                {new Date(
                  application.created_at
                ).toLocaleDateString()}
              </div>

            </CardContent>

          </Card>
        )
      )}

    </div>
  );
}