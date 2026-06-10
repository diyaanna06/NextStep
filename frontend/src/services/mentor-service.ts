import { apiClient } from "./api-client";

import { MentorProfile } from "@/types/mentor";

export const mentorService = {
  getMyProfile: async () => {
    const response =
      await apiClient.get<MentorProfile>(
        "/mentor/profile/me"
      );

    return response.data;
  },

  getAllMentors:
    async () => {
      const response =
        await apiClient.get<
          MentorProfile[]
        >("/mentor");

      return response.data;
    },

  getMentorById:
    async (id: number) => {
      const response =
        await apiClient.get<MentorProfile>(
          `/mentor/${id}`
        );

      return response.data;
    },
};