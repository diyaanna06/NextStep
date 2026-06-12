"use client";
import { useQuery } from "@tanstack/react-query";

import { applicationService } from "@/services/application-service";
import { sessionRequestService } from "@/services/session-request-service";
import { opportunityService } from "@/services/opportunity-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Calendar, FileText } from "lucide-react";

export default function StudentDashboard() {
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationService.getMyApplications(),
  });

  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["session-requests"],
    queryFn: () => sessionRequestService.getMyRequests(),
  });

  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => opportunityService.getAll(),
  });

  const loading =
    applicationsLoading || sessionsLoading || opportunitiesLoading;
  const activeOpportunities =
  opportunities?.filter(
    (opportunity) =>
      opportunity.is_active
  ) ?? [];
  const stats = [
    {
      label: "Applications",
      value: applications?.length ?? 0,
      hint: "Submitted",
      icon: FileText,
    },
    {
      label: "Mentorship sessions",
      value: sessions?.length ?? 0,
      hint: "Requests sent",
      icon: Calendar,
    },
   {
  label: "Opportunities",
  value: activeOpportunities.length,
  hint: "Available now",
  icon: Briefcase,
},
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Dashboard"
        description="Track your applications, mentorship and new opportunities."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className="mt-2 font-heading text-3xl font-semibold">
                {loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  s.value
                )}
              </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to NextStep</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Start exploring opportunities and connect with mentors to accelerate
          your career journey.
        </CardContent>
      </Card>
    </div>
  );
}
