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
  organizationProfileSchema,
  OrganizationProfileFormData,
} from "@/lib/validations/organization-profile";

import { organizationService } from "@/services/organization-service";

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

export default function OrganizationProfilePage() {
  const queryClient =
    useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "organization-profile",
    ],

    queryFn: () =>
      organizationService.getMyProfile(),
  });

  const mutation =
    useMutation({
      mutationFn: (
        data: OrganizationProfileFormData
      ) => {
        if (profile) {
          return organizationService.updateProfile(
            data
          );
        }

        return organizationService.createProfile(
          data
        );
      },

      onSuccess:
        async () => {
          await queryClient.invalidateQueries(
            {
              queryKey: [
                "organization-profile",
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
    useForm<OrganizationProfileFormData>(
      {
        resolver:
          zodResolver(
            organizationProfileSchema
          ),

        defaultValues: {
          organization_name:
            "",

          industry:
            "",

          website:
            "",

          description:
            "",

          location:
            "",
        },
      }
    );

  useEffect(() => {
    if (profile) {
      form.reset({
        organization_name:
          profile.organization_name,

        industry:
          profile.industry,

        website:
          profile.website,

        description:
          profile.description,

        location:
          profile.location,
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
        Loading profile...
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
            ? "Organization Profile"
            : "Complete Your Profile"
        }
        description={
          profile
            ? "Keep your organization information up to date."
            : "Complete your profile to start posting opportunities."
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {profile
              ? "Organization Details"
              : "Set Up Your Organization"}
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
              <Label htmlFor="organization_name">
                Organization Name
              </Label>

              <Input
                id="organization_name"
                {...form.register(
                  "organization_name"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="industry">
                Industry
              </Label>

              <Input
                id="industry"
                placeholder="Technology"
                {...form.register(
                  "industry"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location">
                Location
              </Label>

              <Input
                id="location"
                placeholder="Bangalore, India"
                {...form.register(
                  "location"
                )}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="website">
                Website
              </Label>

              <Input
                id="website"
                placeholder="https://example.com"
                {...form.register(
                  "website"
                )}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                placeholder="Tell students about your organization"
                {...form.register(
                  "description"
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