"use client";

import { useQuery } from "@tanstack/react-query";

import { mentorService } from "@/services/mentor-service";
import { sessionRequestService } from "@/services/session-request-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Clock,
  CheckCircle2,
  Activity,
  Briefcase,
  Building2,
  User,
} from "lucide-react";

export default function MentorDashboard() {
  const {
    data: profile,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ["mentor-profile"],
    queryFn: () =>
      mentorService.getMyProfile(),
  });

  const {
    data: requests,
    isLoading: requestsLoading,
  } = useQuery({
    queryKey: ["mentor-requests"],
    queryFn: async () => {
      const mentor =
        await mentorService.getMyProfile();

      return sessionRequestService.getMentorRequests(
        mentor.user_id
      );
    },
  });

  const loading =
    profileLoading ||
    requestsLoading;

  const pendingCount =
    requests?.filter(
      (request) =>
        request.status ===
        "Pending"
    ).length ?? 0;

  const acceptedCount =
    requests?.filter(
      (request) =>
        request.status ===
        "Accepted"
    ).length ?? 0;

  const stats = [
    {
      label:
        "Pending Requests",
      value:
        pendingCount,
      icon: Clock,
    },
    {
      label:
        "Accepted Requests",
      value:
        acceptedCount,
      icon: CheckCircle2,
    },
    {
      label:
        "Availability",
      value:
        profile?.availability_status
          ? "Available"
          : "Unavailable",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">

      <PageHeader
        title={
          profile?.full_name
            ? `Welcome back, ${profile.full_name}`
            : "Mentor Dashboard"
        }
        description="Manage your mentorship requests and availability."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {stats.map(
          (stat) => (
            <Card
              key={
                stat.label
              }
            >
              <CardContent className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-sm text-muted-foreground">
                    {
                      stat.label
                    }
                  </p>

                  <div className="mt-2 font-heading text-3xl font-semibold">

                    {loading ? (
                      <Skeleton className="h-8 w-12" />
                    ) : (
                      stat.value
                    )}

                  </div>
                </div>

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">

                  <stat.icon className="h-5 w-5" />

                </div>

              </CardContent>
            </Card>
          )
        )}

      </div>

      <Card>

        <CardHeader>
          <CardTitle>
            Mentor Details
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Full Name
                </p>

                {profileLoading ? (
                  <Skeleton className="h-5 w-40" />
                ) : (
                  <p className="font-medium">
                    {
                      profile?.full_name
                    }
                  </p>
                )}

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Briefcase className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Current Role
                </p>

                {profileLoading ? (
                  <Skeleton className="h-5 w-40" />
                ) : (
                  <p className="font-medium">
                    {
                      profile?.current_role
                    }
                  </p>
                )}

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Building2 className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Company
                </p>

                {profileLoading ? (
                  <Skeleton className="h-5 w-40" />
                ) : (
                  <p className="font-medium">
                    {
                      profile?.company
                    }
                  </p>
                )}

              </div>

            </div>

          </div>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-muted-foreground">
                Years of Experience
              </p>

              {profileLoading ? (
                <Skeleton className="mt-1 h-5 w-20" />
              ) : (
                <p className="font-medium">
                  {
                    profile?.years_of_experience
                  }{" "}
                  years
                </p>
              )}

            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Expertise Areas
              </p>

              {profileLoading ? (
                <Skeleton className="mt-1 h-5 w-48" />
              ) : (
                <p className="font-medium">
                  {
                    profile?.expertise_areas
                  }
                </p>
              )}

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}