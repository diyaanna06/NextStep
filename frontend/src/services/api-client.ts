import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);