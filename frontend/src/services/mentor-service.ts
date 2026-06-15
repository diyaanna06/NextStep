import { apiClient } from "./api-client";

import {
  MentorProfile,
  UpdateMentorProfileRequest,
} from "@/types/mentor";

export const mentorService = {
  getMyProfile: async () => {
    const response =
      await apiClient.get<MentorProfile>(
        "/mentor/profile/me"
      );

    return response.data;
  },

  getAllMentors: async () => {
    const response =
      await apiClient.get<
        MentorProfile[]
      >("/mentor");

    return response.data;
  },

  getAvailableMentors:
    async () => {
      const response =
        await apiClient.get<
          MentorProfile[]
        >(
          "/mentor?available=true"
        );

      return response.data;
    },
createProfile: async (
  data: UpdateMentorProfileRequest
) => {
  const response =
    await apiClient.post<
      MentorProfile
    >(
      "/mentor/profile",
      data
    );

  return response.data;
},
  updateProfile: async (
    data: UpdateMentorProfileRequest
  ) => {
    const response =
      await apiClient.put<
        MentorProfile
      >(
        "/mentor/profile/me",
        data
      );

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