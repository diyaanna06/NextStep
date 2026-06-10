import { apiClient } from "./api-client";

import {
  SessionRequest,
  CreateSessionRequest,
} from "@/types/session-request";

export const sessionRequestService = {
  create: async (
    data: CreateSessionRequest
  ) => {
    const response =
      await apiClient.post<SessionRequest>(
        "/session-request",
        data
      );

    return response.data;
  },

  getMyRequests:
    async () => {
      const response =
        await apiClient.get<
          SessionRequest[]
        >(
          "/session-request/me"
        );

      return response.data;
    },

  getMentorRequests:
    async (
      mentorId: number
    ) => {
      const response =
        await apiClient.get<
          SessionRequest[]
        >(
          `/session-request/mentor/${mentorId}`
        );

      return response.data;
    },
    updateStatus: async (
      requestId: number,
      status: string
    ) => {
      const response =
        await apiClient.put<
          SessionRequest
        >(
          `/session-request/${requestId}/status`,
          {
            status,
          }
        );

      return response.data;
    },
    };