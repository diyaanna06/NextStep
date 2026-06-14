import { apiClient } from "./api-client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role:
    | "student"
    | "mentor"
    | "organization";
}

export const authService = {
  login: async (
    data: LoginRequest
  ) => {
    const params =
      new URLSearchParams();

    params.append(
      "username",
      data.username
    );

    params.append(
      "password",
      data.password
    );

    const response =
      await apiClient.post<LoginResponse>(
        "/auth/login",
        params,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

    return response.data;
  },

  register: async (
    data: RegisterRequest
  ) => {
    const response =
      await apiClient.post(
        "/auth/register",
        data
      );

    return response.data;
  },

  getCurrentUser:
    async () => {
      const response =
        await apiClient.get(
          "/auth/me"
        );

      return response.data;
    },
};