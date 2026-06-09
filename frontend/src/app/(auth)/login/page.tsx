"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/lib/validations/login";

import type { LoginFormData } from "@/lib/validations/login";

import { authService } from "@/services/auth-service";

import { useAuthStore } from "@/stores/auth-store";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const login =
    useAuthStore(
      (state) => state.login
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } =
    useForm<LoginFormData>({
      resolver: zodResolver(
        loginSchema
      ),
    });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const tokenResponse =
        await authService.login({
          username: data.email,
          password: data.password,
        });

      // Temporarily store token first
      useAuthStore.setState({
        token:
          tokenResponse.access_token,
     
      });

      const user =
        await authService.getCurrentUser();

      // Store complete auth state
      login(
        user,
        tokenResponse.access_token
      );

      if (
        user.role === "student"
      ) {
        router.push("/student");
      } else if (
        user.role === "mentor"
      ) {
        router.push("/mentor");
      } else {
        router.push(
          "/organization"
        );
      }
    } catch (error) {
        console.error(error);

        useAuthStore.getState().logout();

        alert(
          "Login failed. Please check your credentials."
        );
      }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8">

        <h1 className="mb-2 text-center text-3xl font-bold">
          NextStep
        </h1>

        <p className="mb-6 text-center text-muted-foreground">
          Welcome back
        </p>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register(
                "email"
              )}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register(
                "password"
              )}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors
                    .password
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isSubmitting
            }
          >
            {isSubmitting
              ? "Signing In..."
              : "Sign In"}
          </Button>

        </form>

      </div>
    </div>
  );
}