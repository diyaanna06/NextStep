import { apiClient } from "./api-client";
import { StudentProfile } from "@/types/student-profile";

export const studentProfileService = {
  getProfile: async (): Promise<StudentProfile> => {
    const response = await apiClient.get(
      "/profile/me"
    );

    return response.data;
  },

  createProfile: async (
    profile: Partial<StudentProfile>
  ): Promise<StudentProfile> => {
    const response = await apiClient.post(
      "/profile",
      profile
    );

    return response.data;
  },

  updateProfile: async (
    profile: Partial<StudentProfile>
  ): Promise<StudentProfile> => {
    const response = await apiClient.put(
      "/profile/me",
      profile
    );

    return response.data;
  },

  uploadResume: async (
    file: File
  ) => {
    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await apiClient.post(
        "/profile/resume",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  },

  getResumeUrl: async (): Promise<{
    url: string;
  }> => {
    const response =
      await apiClient.get(
        "/profile/resume"
      );

    return response.data;
  },

  deleteResume: async () => {
    const response =
      await apiClient.delete(
        "/profile/resume"
      );

    return response.data;
  },
  getStudentResume: async (
  studentId: number
): Promise<{ url: string }> => {
  const response =
    await apiClient.get(
      `/profile/${studentId}/resume`
    );

  return response.data;
},
};