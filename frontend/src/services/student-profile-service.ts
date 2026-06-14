import { apiClient } from "./api-client";
import { StudentProfile } from "@/types/student-profile";

export const studentProfileService = {
  getProfile: async (): Promise<StudentProfile> => {
    const response =
      await apiClient.get(
        "/profile/me"
      );

    return response.data;
  },

  createProfile: async (
    profile: Partial<StudentProfile>
  ): Promise<StudentProfile> => {
    const response =
      await apiClient.post(
        "/profile",
        profile
      );

    return response.data;
  },

  updateProfile: async (
    profile: Partial<StudentProfile>
  ): Promise<StudentProfile> => {
    const response =
      await apiClient.put(
        "/profile/me",
        profile
      );

    return response.data;
  },
};