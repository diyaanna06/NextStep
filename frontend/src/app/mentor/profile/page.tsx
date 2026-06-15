"use client";

import { useEffect } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  mentorProfileSchema,
  MentorProfileFormData,
} from "@/lib/validations/mentor-profile";

import { mentorService } from "@/services/mentor-service";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PageHeader } from "@/components/shared/page-header";

import { Loader2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";

import { AxiosError } from "axios";

export default function MentorProfilePage() {
  const queryClient =
    useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "mentor-profile",
    ],

    queryFn: () =>
      mentorService.getMyProfile(),
  });

  const mutation =
    useMutation({
      mutationFn: (
        data: MentorProfileFormData
      ) => {
        if (profile) {
          return mentorService.updateProfile(
            data
          );
        }

        return mentorService.createProfile(
          {
            ...data,

            availability_status:
              true,
          }
        );
      },

      onSuccess:
        async () => {
          await queryClient.invalidateQueries(
            {
              queryKey:
                [
                  "mentor-profile",
                ],
            }
          );

          toast.success(
            profile
              ? "Profile updated"
              : "Profile created",
            {
              description:
                profile
                  ? "Your profile has been updated successfully."
                  : "Your profile has been created successfully.",
            }
          );
        },

      onError: () => {
        toast.error(
          profile
            ? "Failed to update profile"
            : "Failed to create profile",
          {
            description:
              "Please try again later.",
          }
        );
      },
    });

  const form =
    useForm<MentorProfileFormData>(
      {
        resolver:
          zodResolver(
            mentorProfileSchema
          ),

        defaultValues: {
          full_name: "",

          current_role:
            "",

          company: "",

          years_of_experience:
            undefined,

          expertise_areas:
            "",
        },
      }
    );

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name:
          profile.full_name,

        current_role:
          profile.current_role,

        company:
          profile.company,

        years_of_experience:
          profile.years_of_experience,

        expertise_areas:
          profile.expertise_areas,
      });
    }
  }, [
    profile,
    form,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading profile…
      </div>
    );
  }

  const isProfileMissing =
    error instanceof
      AxiosError &&
    error.response
      ?.status ===
      404;

  if (
    error &&
    !isProfileMissing
  ) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          profile
            ? "Your Profile"
            : "Complete Your Profile"
        }
        description={
          profile
            ? "Keep your professional information up to date."
            : "Complete your profile to start mentoring students."
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {profile
              ? "Professional details"
              : "Set up your profile"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(
              (data) =>
                mutation.mutate(
                  data
                )
            )}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="full_name">
                Full Name
              </Label>

              <Input
                id="full_name"
                {...form.register(
                  "full_name"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="current_role">
                Current Role
              </Label>

              <Input
                id="current_role"
                placeholder="Software Engineer"
                {...form.register(
                  "current_role"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="company">
                Company
              </Label>

              <Input
                id="company"
                placeholder="Google"
                {...form.register(
                  "company"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="years_of_experience">
                Years of Experience
              </Label>

              <Input
                id="years_of_experience"
                type="number"
                {...form.register(
                  "years_of_experience",
                  {
                    valueAsNumber:
                      true,
                  }
                )}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="expertise_areas">
                Expertise Areas
              </Label>

              <Textarea
                id="expertise_areas"
                placeholder="Backend Development, System Design, Interview Preparation"
                {...form.register(
                  "expertise_areas"
                )}
              />
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={
                  mutation.isPending
                }
                size="lg"
              >
                {mutation.isPending
                  ? profile
                    ? "Saving..."
                    : "Creating..."
                  : profile
                  ? "Save Changes"
                  : "Create Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}