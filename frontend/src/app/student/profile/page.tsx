"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  studentProfileSchema,
  StudentProfileFormData,
} from "@/lib/validations/student-profile";

import { studentProfileService } from "@/services/student-profile-service";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["student-profile"],
    queryFn: () =>
      studentProfileService.getProfile(),
  });

  const mutation = useMutation({
    mutationFn: (
      data: StudentProfileFormData
    ) =>
      studentProfileService.updateProfile(
        data
      ),

    onSuccess: () => {
      alert(
        "Profile updated successfully!"
      );
    },

    onError: () => {
      alert(
        "Failed to update profile."
      );
    },
  });

  const form =
    useForm<StudentProfileFormData>({
      resolver: zodResolver(
        studentProfileSchema
      ),

      defaultValues: {
        full_name: "",
        college: "",
        degree: "",
        graduation_year: 2026,
        skills: "",
        career_interests: "",
        resume_link: "",
      },
    });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name:
          profile.full_name,

        college:
          profile.college,

        degree:
          profile.degree,

        graduation_year:
          profile.graduation_year,

        skills:
          profile.skills ?? "",

        career_interests:
          profile.career_interests ??
          "",

        resume_link:
          profile.resume_link ??
          "",
      });
    }
  }, [profile, form]);

  if (isLoading) {
    return (
      <div>
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load profile.
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(
        (data) =>
          mutation.mutate(data)
      )}
      className="space-y-4 max-w-xl"
    >
      <Input
        placeholder="Full Name"
        {...form.register(
          "full_name"
        )}
      />

      <Input
        placeholder="College"
        {...form.register(
          "college"
        )}
      />

      <Input
        placeholder="Degree"
        {...form.register(
          "degree"
        )}
      />

      <Input
        type="number"
        placeholder="Graduation Year"
        {...form.register(
          "graduation_year",
          {
            valueAsNumber: true,
          }
        )}
      />

      <Textarea
        placeholder="Skills"
        {...form.register(
          "skills"
        )}
      />

      <Textarea
        placeholder="Career Interests"
        {...form.register(
          "career_interests"
        )}
      />

      <Input
        placeholder="Resume Link"
        {...form.register(
          "resume_link"
        )}
      />

      <Button
        type="submit"
        disabled={
          mutation.isPending
        }
      >
        {mutation.isPending
          ? "Saving..."
          : "Save Changes"}
      </Button>
    </form>
  );
}