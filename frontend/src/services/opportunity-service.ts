import { apiClient } from "./api-client";
import {
  CreateOpportunityRequest,
  UpdateOpportunityRequest,
} from "@/types/opportunity";
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

  getOrganizationOpportunities:
    async (
      organizationId: number
    ) => {
      const response =
        await apiClient.get<
          Opportunity[]
        >(
          `/opportunity/organization/${organizationId}`
        );

      return response.data;
    },
    create: async (
  data: CreateOpportunityRequest
) => {
  const response =
    await apiClient.post<
      Opportunity
    >(
      "/opportunity",
      data
    );

  return response.data;
},

update: async (
  id: number,
  data: UpdateOpportunityRequest
) => {
  const response =
    await apiClient.put<
      Opportunity
    >(
      `/opportunity/${id}`,
      data
    );

  return response.data;
},
};