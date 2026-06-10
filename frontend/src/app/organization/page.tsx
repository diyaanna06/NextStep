"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/services/organization-service";

import { opportunityService } from "@/services/opportunity-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrganizationDashboard() {
  const {
    data: profile,
    isLoading:
      profileLoading,
  } = useQuery({
    queryKey: [
      "organization-profile",
    ],

    queryFn: () =>
      organizationService.getMyProfile(),
  });

  const {
    data: opportunities,
    isLoading:
      opportunitiesLoading,
  } = useQuery({
    queryKey: [
      "organization-opportunities",
    ],

    enabled: !!profile,

    queryFn: () =>
      opportunityService.getOrganizationOpportunities(
        profile!.user_id
      ),
  });

  if (
    profileLoading ||
    opportunitiesLoading
  ) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

  const totalOpportunities =
    opportunities?.length ?? 0;

  const activeOpportunities =
    opportunities?.filter(
      (
        opportunity
      ) =>
        opportunity.is_active
    ).length ?? 0;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Welcome,
        {" "}
        {
          profile?.organization_name
        }
      </h1>

      <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>
              Total Opportunities
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                totalOpportunities
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Active Opportunities
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                activeOpportunities
              }
            </p>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Organization Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">

          <div>
            <strong>
              Industry:
            </strong>
            {" "}
            {
              profile?.industry
            }
          </div>

          <div>
            <strong>
              Location:
            </strong>
            {" "}
            {
              profile?.location
            }
          </div>

          <div>
            <strong>
              Website:
            </strong>
            {" "}
            {
              profile?.website
            }
          </div>

          <div>
            <strong>
              Verified:
            </strong>
            {" "}
            {profile?.verified
              ? "Yes"
              : "No"}
          </div>

        </CardContent>
      </Card>

    </div>
  );
}