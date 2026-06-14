"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validations/register";

import { authService } from "@/services/auth-service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();

  const {
  register,
  handleSubmit,
  setValue,
  getValues,
  formState: {
    errors,
    isSubmitting,
  },
} =
  useForm<RegisterFormData>({
    resolver:
      zodResolver(
        registerSchema
      ),

    defaultValues: {
      role: undefined,
    },
  });

  const onSubmit =
    async (
      data: RegisterFormData
    ) => {
      try {
        await authService.register(
          {
            email:
              data.email,

            password:
              data.password,

            role:
              data.role,
          }
        );

        toast.success(
          "Registration successful",
          {
            description:
              "Please sign in to continue.",
          }
        );

        router.push(
          "/login"
        );
      } catch {
        toast.error(
          "Registration failed",
          {
            description:
              "Please try again.",
          }
        );
      }
    };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Panel */}
      <div className="relative hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground text-primary font-bold">
            N
          </div>

          <span className="font-heading text-lg font-semibold">
            NextStep
          </span>
        </div>

        <div>
          <h2 className="font-heading text-3xl font-semibold leading-tight">
            Start your next step today.
          </h2>

          <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
            Connect with mentors, discover opportunities, and accelerate your career.
          </p>
        </div>

        <p className="text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} NextStep
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
                N
              </div>

              <span className="font-heading text-lg font-semibold">
                NextStep
              </span>
            </div>
          </div>

          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Join NextStep and begin your journey.
          </p>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="mt-8 space-y-5"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register(
                  "email"
                )}
              />

              {errors.email && (
                <p className="text-xs text-destructive">
                  {
                    errors
                      .email
                      .message
                  }
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register(
                  "password"
                )}
              />

              {errors.password && (
                <p className="text-xs text-destructive">
                  {
                    errors
                      .password
                      .message
                  }
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register(
                  "confirmPassword"
                )}
              />

              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {
                    errors
                      .confirmPassword
                      .message
                  }
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>
                Role
              </Label>

              <Select
                value={
                  getValues("role")
                }
                onValueChange={(
                  value
                ) =>
                  setValue(
                    "role",
                    value as
                      | "student"
                      | "mentor"
                      | "organization",
                    {
                      shouldValidate:
                        true,
                    }
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="student">
                    Student
                  </SelectItem>

                  <SelectItem value="mentor">
                    Mentor
                  </SelectItem>

                  <SelectItem value="organization">
                    Organization
                  </SelectItem>
                </SelectContent>
              </Select>

              {errors.role && (
                <p className="text-xs text-destructive">
                  {
                    errors
                      .role
                      .message
                  }
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={
                isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}