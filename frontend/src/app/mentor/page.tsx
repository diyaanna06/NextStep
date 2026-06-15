"use client";
import { Switch } from "@/components/ui/switch";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
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

import { toast } from "@/hooks/use-toast";

import {
  Clock,
  CheckCircle2,
  Activity,
  
} from "lucide-react";

export default function MentorDashboard() {
  const queryClient =
    useQueryClient();

  const {
  data: profile,
  isLoading: profileLoading,
  error: profileError,
} = useQuery({
  queryKey: [
    "mentor-profile",
  ],

  queryFn: () =>
    mentorService.getMyProfile(),

  retry: false,
});

const isProfileMissing =
  profileError instanceof
    AxiosError &&
  profileError.response
    ?.status ===
    404;
  const {
  data: requests,
  isLoading: requestsLoading,
} = useQuery({
  queryKey: [
    "mentor-requests",
  ],

  enabled:
    !!profile,

  queryFn: () =>
    sessionRequestService.getMentorRequests(
      profile!.user_id
    ),
});

  const availabilityMutation =
    useMutation({
      mutationFn: (
        availability: boolean
      ) =>
        mentorService.updateProfile(
          {
            availability_status:
              availability,
          }
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "mentor-profile",
            ],
          }
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "mentor-requests",
            ],
          }
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "mentors",
            ],
          }
        );

        toast.success(
          "Availability updated",
          {
            description:
              "Your mentorship availability has been updated.",
          }
        );
      },

      onError: () => {
        toast.error(
          "Update failed",
          {
            description:
              "Failed to update availability.",
          }
        );
      },
    });

  const loading =
  profileLoading ||
  (!isProfileMissing &&
    requestsLoading);

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
  label: "Availability",
  value: profile
    ? profile.availability_status
      ? "Available"
      : "Unavailable"
    : "Complete Profile",
  icon: Activity,
  toggle: true,
}
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

                {stat.toggle && profile ? (
  <Switch
    checked={
      profile.availability_status
    }
    disabled={
      availabilityMutation.isPending
    }
    onCheckedChange={(
      checked
    ) =>
      availabilityMutation.mutate(
        checked
      )
    }
  />
) : (
  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
    <stat.icon className="h-5 w-5" />
  </div>
)}
              </CardContent>
            </Card>
          )
        )}
      </div>
<Card>
  <CardHeader>
    <CardTitle>
      Welcome to NextStep
    </CardTitle>
  </CardHeader>

  <CardContent className="text-sm text-muted-foreground space-y-2">
    <p>
      Guide students through their career journey by reviewing mentorship requests and sharing your expertise.
    </p>

    {!profile && (
      <p>
        Complete your mentor profile to become visible to students and start mentoring.
      </p>
    )}

   
  </CardContent>
</Card>
    </div>
  );
}