import { apiClient } from "./api-client";

import {
  Application,
  CreateApplicationRequest,
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
};