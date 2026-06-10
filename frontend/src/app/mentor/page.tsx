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

export default function MentorDashboard() {
  const {
    data: profile,
    isLoading:
      profileLoading,
  } = useQuery({
    queryKey: [
      "mentor-profile",
    ],

    queryFn: () =>
      mentorService.getMyProfile(),
  });

  const {
    data: requests,
    isLoading:
      requestsLoading,
  } = useQuery({
    queryKey: [
      "mentor-requests",
    ],

    queryFn: async () => {
      const mentor =
        await mentorService.getMyProfile();

      return sessionRequestService.getMentorRequests(
        mentor.user_id
      );
    },
  });

  if (
    profileLoading ||
    requestsLoading
  ) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

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

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Welcome back,
        {
          profile?.full_name
        }
      </h1>

      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>
              Pending Requests
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                pendingCount
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Accepted Requests
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                acceptedCount
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Availability
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-xl font-medium">
              {profile?.availability_status
                ? "Available"
                : "Unavailable"}
            </p>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}