"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { applicationService } from "@/services/application-service";
import { sessionRequestService } from "@/services/session-request-service";
import { opportunityService } from "@/services/opportunity-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const {
    data: applications,
    isLoading:
      applicationsLoading,
  } = useQuery({
    queryKey: [
      "applications",
    ],

    queryFn: () =>
      applicationService.getMyApplications(),
  });

  const {
    data: sessions,
    isLoading:
      sessionsLoading,
  } = useQuery({
    queryKey: [
      "session-requests",
    ],

    queryFn: () =>
      sessionRequestService.getMyRequests(),
  });

  const {
    data: opportunities,
    isLoading:
      opportunitiesLoading,
  } = useQuery({
    queryKey: [
      "opportunities",
    ],

    queryFn: () =>
      opportunityService.getAll(),
  });

  if (
    applicationsLoading ||
    sessionsLoading ||
    opportunitiesLoading
  ) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Student Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>
              Applications
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                applications?.length ??
                0
              }
            </p>

            <Badge className="mt-2">
              Applied Opportunities
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Session Requests
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {sessions?.length ??
                0}
            </p>

            <Badge className="mt-2">
              Mentorship Sessions
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Opportunities
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {opportunities?.length ??
                0}
            </p>

            <Badge className="mt-2">
              Available Opportunities
            </Badge>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Quick Actions
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-4">

          <Button asChild>
            <Link href="/student/opportunities">
              Browse Opportunities
            </Link>
          </Button>

          <Button asChild>
            <Link href="/student/mentors">
              Find Mentors
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
          >
            <Link href="/student/applications">
              View Applications
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
          >
            <Link href="/student/profile">
              Manage Profile
            </Link>
          </Button>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to NextStep
          </CardTitle>
        </CardHeader>

        <CardContent>
          Start exploring opportunities
          and connect with mentors to
          accelerate your career
          journey.
        </CardContent>
      </Card>

    </div>
  );
}