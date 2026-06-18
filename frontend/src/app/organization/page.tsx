"use client";

import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/organization-service";
import { opportunityService } from "@/services/opportunity-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";

import { Briefcase,  BadgeCheck } from "lucide-react";

export default function OrganizationDashboard() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["organization-profile"],
    queryFn: () => organizationService.getMyProfile(),
  });

  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ["organization-opportunities"],
    enabled: !!profile,
    queryFn: () =>
      opportunityService.getOrganizationOpportunities(profile!.user_id),
  });

  const loading = profileLoading || opportunitiesLoading;
  const totalOpportunities = opportunities?.length ?? 0;
  const activeOpportunities =
    opportunities?.filter((o) => o.is_active).length ?? 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          profile?.organization_name
            ? `Welcome, ${profile.organization_name}`
            : "Organization Dashboard"
        }
        description="Overview of your opportunities and recruiting activity."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total opportunities
              </p>
             <div className="mt-2 font-heading text-3xl font-semibold">
              {loading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                totalOpportunities
              )}
            </div>
            </div>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Active opportunities
              </p>
              <div className="mt-2 font-heading text-3xl font-semibold">
              {loading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                activeOpportunities
              )}
            </div>
            </div>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
              <BadgeCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
  <CardHeader>
    <CardTitle>
      Welcome to NextStep
    </CardTitle>
  </CardHeader>

  <CardContent>
    <p className="text-sm text-muted-foreground">
      Manage opportunities, review applicants, and connect with talented students through your organization dashboard.
    </p>

    
  </CardContent>
</Card>
    </div>
  );
}
