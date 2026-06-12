"use client";

import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/organization-service";
import { opportunityService } from "@/services/opportunity-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Globe, MapPin, BadgeCheck } from "lucide-react";

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
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Organization details</CardTitle>
            {profile?.verified && (
              <Badge>
                <BadgeCheck /> Verified
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Industry:</span>
            <span className="font-medium">{profile?.industry ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{profile?.location ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Website:</span>
            {profile?.website ? (
              <a
                className="font-medium text-primary hover:underline"
                href={profile.website}
                target="_blank"
                rel="noreferrer"
              >
                {profile.website}
              </a>
            ) : (
              <span className="font-medium">—</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
