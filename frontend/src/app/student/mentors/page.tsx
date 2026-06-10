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

export default function MentorsPage() {
  const queryClient =
    useQueryClient();

  const {
    data: mentors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mentors"],

    queryFn: () =>
      mentorService.getAllMentors(),
  });

  const mutation =
    useMutation({
      mutationFn: (
        mentorId: number
      ) =>
        sessionRequestService.create(
          {
            mentor_id:
              mentorId,

            message:
              "I would like mentorship guidance.",
          }
        ),

      onSuccess: () => {
        alert(
          "Session request sent successfully!"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "session-requests",
          ],
        });
      },

      onError: (
        error: unknown
      ) => {
        let message =
          "Failed to send request.";

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

          message =
            axiosError
              .response
              ?.data
              ?.detail ??
            message;
        }

        alert(message);
      },
    });

  if (isLoading) {
    return (
      <div>
        Loading mentors...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load mentors.
      </div>
    );
  }

  if (
    !mentors ||
    mentors.length === 0
  ) {
    return (
      <div>
        No mentors available.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {mentors.map(
        (mentor) => (
          <Card
            key={
              mentor.user_id
            }
          >
            <CardHeader>
              <CardTitle>
                {
                  mentor.full_name
                }
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <div>
                <strong>
                  Role:
                </strong>{" "}
                {
                  mentor.current_role
                }
              </div>

              <div>
                <strong>
                  Company:
                </strong>{" "}
                {
                  mentor.company
                }
              </div>

              <div>
                <strong>
                  Experience:
                </strong>{" "}
                {
                  mentor.years_of_experience
                }{" "}
                years
              </div>

              <div>
                <strong>
                  Expertise:
                </strong>{" "}
                {
                  mentor.expertise_areas
                }
              </div>

              <div>
                <strong>
                  Availability:
                </strong>{" "}
                {mentor.availability_status
                  ? "Available"
                  : "Unavailable"}
              </div>

              <Button
                disabled={
                  !mentor.availability_status ||
                  mutation.isPending
                }

                onClick={() =>
                  mutation.mutate(
                    mentor.user_id
                  )
                }
              >
                Request Session
              </Button>

            </CardContent>
          </Card>
        )
      )}

    </div>
  );
}