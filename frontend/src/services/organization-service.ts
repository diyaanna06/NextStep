import { apiClient } from "./api-client";

import { OrganizationProfile } from "@/types/organization";

import {
  OrganizationProfileFormData,
} from "@/lib/validations/organization-profile";
export const organizationService = {
  getMyProfile: async () => {
    const response =
      await apiClient.get<OrganizationProfile>(
        "/organization/profile/me"
      );

    return response.data;
  },
  createProfile: async (
  data: OrganizationProfileFormData
) => {
  const response =
    await apiClient.post<OrganizationProfile>(
      "/organization/profile",
      data
    );

  return response.data;
},

updateProfile: async (
  data: OrganizationProfileFormData
) => {
  const response =
    await apiClient.put<OrganizationProfile>(
      "/organization/profile/me",
      data
    );

  return response.data;
},
};