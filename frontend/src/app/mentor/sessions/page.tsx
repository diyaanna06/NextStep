"use client";
import { studentProfileService } from "@/services/student-profile-service";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { mentorService } from "@/services/mentor-service";
import { sessionRequestService } from "@/services/session-request-service";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Calendar, Loader2 } from "lucide-react";

export default function MentorSessionsPage() {
  const queryClient = useQueryClient();
const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: ["mentor-profile"],
    queryFn: () => mentorService.getMyProfile(),
  });
const handleViewResume = async (
  studentId: number
) => {
  try {
    const response =
      await studentProfileService.getStudentResume(
        studentId
      );

    window.open(
      response.url,
      "_blank"
    );
  } catch {
    toast.error(
      "Failed to open resume"
    );
  }
};
  const {
  data: requests,
  isLoading,
  error,
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

  const updateMutation = useMutation({
  mutationFn: ({
    requestId,
    status,
  }: {
    requestId: number;
    status: string;
  }) =>
    sessionRequestService.updateStatus(
      requestId,
      status
    ),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: [
        "mentor-requests",
      ],
    });

    toast.success(
      "Request updated",
      {
        description:
          "Session request status updated successfully.",
      }
    );
  },

  onError: (
    error: unknown
  ) => {
    let errorMessage =
      "Failed to update request.";

    if (
      typeof error ===
        "object" &&
      error !== null &&
      "response" in error
    ) {
      const axiosError =
        error as {
          response?: {
            data?: {
              detail?: string;
            };
          };
        };

      errorMessage =
        axiosError
          .response?.data
          ?.detail ??
        errorMessage;
    }

    if (
      errorMessage ===
      "Mentor profile not found"
    ) {
      toast.error(
        "Complete your profile first",
        {
          description:
            "You need to complete your mentor profile before managing session requests.",

          action: {
            label:
              "Complete Profile",

            onClick: () => {
              router.push(
                "/mentor/profile"
              );
            },
          },
        }
      );

      return;
    }

    toast.error(
      "Update failed",
      {
        description:
          errorMessage,
      }
    );
  },
});
if (!profile) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Session Requests"
        description="Accept or reject incoming mentorship requests."
      />

      <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
        <Calendar className="h-8 w-8 text-muted-foreground" />

        <p className="mt-3 font-medium">
          Complete your profile first
        </p>

        <p className="text-sm text-muted-foreground">
          You need to complete your mentor profile before managing session requests.
        </p>

        <Button
          className="mt-4"
          onClick={() =>
            router.push(
              "/mentor/profile"
            )
          }
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
}
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading requests…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load requests.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Session Requests"
        description="Accept or reject incoming mentorship requests."
      />

      {!requests || requests.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <Calendar className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">No session requests</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                    {(
                      request.student.full_name ??
                      "?"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <CardTitle>
                      {request.student.full_name}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                      {request.student.degree} •{" "}
                      {request.student.college}
                    </p>
                  </div>
                </div>

                <StatusBadge status={request.status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">
                    Skills:
                  </span>{" "}
                  {request.student.skills ||
                    "Not provided"}
                </p>

                {request.student.career_interests && (
                  <p>
                    <span className="font-medium">
                      Career Interests:
                    </span>{" "}
                    {
                      request.student
                        .career_interests
                    }
                  </p>
                )}

                <Button
  size="sm"
  variant="outline"
  onClick={() =>
    handleViewResume(
      request.student.user_id
    )
  }
>
  View Resume
</Button>
              </div>

              <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                {request.message}
              </div>

              {request.status === "Pending" && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() =>
                      updateMutation.mutate({
                        requestId: request.id,
                        status: "Accepted",
                      })
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      updateMutation.mutate({
                        requestId: request.id,
                        status: "Rejected",
                      })
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
