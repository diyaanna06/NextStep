"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { mentorService } from "@/services/mentor-service";

import { sessionRequestService } from "@/services/session-request-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function MentorSessionsPage() {
  const queryClient =
    useQueryClient();

  const {
    data: profile,
  } = useQuery({
    queryKey: [
      "mentor-profile",
    ],

    queryFn: () =>
      mentorService.getMyProfile(),
  });

  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "mentor-requests",
    ],

    enabled: !!profile,

    queryFn: () =>
      sessionRequestService.getMentorRequests(
        profile!.user_id
      ),
  });

  const updateMutation =
    useMutation({
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
      },
    });

  if (isLoading) {
    return (
      <div>
        Loading requests...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load requests.
      </div>
    );
  }

  if (
    !requests ||
    requests.length === 0
  ) {
    return (
      <div>
        No session requests.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {requests.map(
        (request) => (
          <Card
            key={request.id}
          >
            <CardHeader>
              <CardTitle>
                Student #{request.student_id}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div>
                <strong>
                  Message:
                </strong>{" "}
                {request.message}
              </div>

              <div>
                <strong>
                  Status:
                </strong>{" "}
                {request.status}
              </div>

              {request.status ===
                "Pending" && (
                <div className="flex gap-2">

                  <Button
                    onClick={() =>
                      updateMutation.mutate(
                        {
                          requestId:
                            request.id,
                          status:
                            "Accepted",
                        }
                      )
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      updateMutation.mutate(
                        {
                          requestId:
                            request.id,
                          status:
                            "Rejected",
                        }
                      )
                    }
                  >
                    Reject
                  </Button>

                </div>
              )}

            </CardContent>
          </Card>
        )
      )}

    </div>
  );
}