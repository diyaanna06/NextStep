"use client";

import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { mentorService } from "@/services/mentor-service";
import { sessionRequestService } from "@/services/session-request-service";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/shared/page-header";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";

import {
  Briefcase,
  Users,
  Loader2,
  Building2,
} from "lucide-react";

export default function MentorsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedMentorId, setSelectedMentorId] =
    useState<number | null>(null);

  const [message, setMessage] =
    useState("");

  const {
    data: mentors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mentors"],
    queryFn: () =>
      mentorService.getAvailableMentors(),
  });

  const {
    data: requests,
  } = useQuery({
    queryKey: ["session-requests"],
    queryFn: () =>
      sessionRequestService.getMyRequests(),
  });

  const requestedMentorIds =
    new Set(
      requests?.map(
        (request) =>
          request.mentor.user_id
      ) ?? []
    );

  const mutation = useMutation({
    mutationFn: ({
      mentorId,
      message,
    }: {
      mentorId: number;
      message: string;
    }) =>
      sessionRequestService.create({
        mentor_id: mentorId,
        message,
      }),

    onSuccess: () => {
      toast.success(
        "Session request sent",
        {
          description:
            "Your mentorship request has been sent successfully.",
        }
      );

      queryClient.invalidateQueries({
        queryKey: [
          "session-requests",
        ],
      });

      setSelectedMentorId(
        null
      );

      setMessage("");
    },

    onError: (
  error: unknown
) => {
  let errorMessage =
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

    errorMessage =
      axiosError.response
        ?.data?.detail ??
      errorMessage;
  }

  if (
    errorMessage ===
    "Student profile not found"
  ) {
    toast.error(
      "Complete your profile first",
      {
        description:
          "You need to complete your profile before requesting mentorship sessions.",

        action: {
          label:
            "Complete Profile",

          onClick: () => {
            router.push(
              "/student/profile"
            );
          },
        },
      }
    );

    return;
  }

  toast.error(
    "Failed to send session request",
    {
      description:
        errorMessage,
    }
  );
},
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading mentors…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load mentors.
      </div>
    );
  }

  if (
    !mentors ||
    mentors.length === 0
  ) {
    return (
      <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
        <Users className="h-8 w-8 text-muted-foreground" />

        <p className="mt-3 font-medium">
          No mentors available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentors"
        description="Connect with professionals who can guide your career."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {mentors.map(
          (mentor) => {
            const hasRequested =
              requestedMentorIds.has(
                mentor.user_id
              );

            const isRequesting =
              mutation.isPending &&
              mutation.variables
                ?.mentorId ===
                mentor.user_id;

            return (
              <Card
                key={
                  mentor.user_id
                }
                className="flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                      {(
                        mentor.full_name ??
                        "?"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-base font-semibold leading-tight">
                        {
                          mentor.full_name
                        }
                      </h3>

                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {
                          mentor.current_role
                        }{" "}
                        ·{" "}
                        {
                          mentor.company
                        }
                      </p>
                    </div>

                    <Badge>
                      Available
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="mt-auto space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />

                    {
                      mentor.years_of_experience
                    }{" "}
                    years experience
                  </div>

                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>
                      {
                        mentor.expertise_areas
                      }
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      hasRequested ||
                      isRequesting
                    }
                    onClick={() => {
                      setSelectedMentorId(
                        mentor.user_id
                      );

                      setMessage(
                        ""
                      );
                    }}
                  >
                    {hasRequested
                      ? "Requested"
                      : isRequesting
                      ? "Sending..."
                      : "Request Session"}
                  </Button>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      <Dialog
        open={
          selectedMentorId !==
          null
        }
        onOpenChange={(
          open
        ) => {
          if (!open) {
            setSelectedMentorId(
              null
            );

            setMessage("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Request Mentorship
            </DialogTitle>

            <DialogDescription>
              Tell the mentor
              what guidance
              you are seeking.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Example: I would like guidance on backend development and interview preparation."
            rows={4}
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedMentorId(
                  null
                );

                setMessage(
                  ""
                );
              }}
            >
              Cancel
            </Button>

            <Button
              disabled={
                mutation.isPending ||
                !message.trim()
              }
              onClick={() => {
                if (
                  selectedMentorId
                ) {
                  mutation.mutate(
                    {
                      mentorId:
                        selectedMentorId,
                      message:
                        message.trim(),
                    }
                  );
                }
              }}
            >
              {mutation.isPending
                ? "Sending..."
                : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}