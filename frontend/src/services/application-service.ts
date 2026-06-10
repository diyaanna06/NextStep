import { apiClient } from "./api-client";

import {
  Application,
  CreateApplicationRequest,
  UpdateApplicationStatusRequest,
} from "@/types/application";

export const applicationService = {
  apply: async (
    data: CreateApplicationRequest
  ) => {
    const response =
      await apiClient.post<Application>(
        "/application",
        data
      );

    return response.data;
  },

  getMyApplications:
    async () => {
      const response =
        await apiClient.get<
          Application[]
        >(
          "/application/me"
        );

      return response.data;
    },

  getOpportunityApplications:
    async (
      opportunityId: number
    ) => {
      const response =
        await apiClient.get<
          Application[]
        >(
          `/application/opportunity/${opportunityId}`
        );

      return response.data;
    },

  updateStatus: async (
    applicationId: number,
    data: UpdateApplicationStatusRequest
  ) => {
    const response =
      await apiClient.put<
        Application
      >(
        `/application/${applicationId}/status`,
        data
      );

    return response.data;
  },
};