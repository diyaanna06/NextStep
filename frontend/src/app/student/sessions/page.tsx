"use client";

import { useQuery } from "@tanstack/react-query";

import { sessionRequestService } from "@/services/session-request-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SessionsPage() {
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "session-requests",
    ],

    queryFn: () =>
      sessionRequestService.getMyRequests(),
  });

  if (isLoading) {
    return (
      <div>
        Loading session requests...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load session requests.
      </div>
    );
  }

  if (
    !requests ||
    requests.length === 0
  ) {
    return (
      <div>
        No session requests yet.
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
                Mentor #{request.mentor_id}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">

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

              <div>
                <strong>
                  Requested On:
                </strong>{" "}
                {new Date(
                  request.created_at
                ).toLocaleDateString()}
              </div>

            </CardContent>
          </Card>
        )
      )}

    </div>
  );
}