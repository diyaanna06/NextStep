import { apiClient } from "./api-client";

import { OrganizationProfile } from "@/types/organization";

export const organizationService = {
  getMyProfile: async () => {
    const response =
      await apiClient.get<OrganizationProfile>(
        "/organization/profile/me"
      );

    return response.data;
  },
};