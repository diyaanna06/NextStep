import { apiClient } from "./api-client";

import { Opportunity } from "@/types/opportunity";

export const opportunityService = {
  getAll: async () => {
    const response =
      await apiClient.get<
        Opportunity[]
      >("/opportunity");

    return response.data;
  },

  getById: async (
    id: number
  ) => {
    const response =
      await apiClient.get<
        Opportunity
      >(
        `/opportunity/${id}`
      );

    return response.data;
  },
};