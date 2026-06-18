"use client";
import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import {
  useQueryClient,
} from "@tanstack/react-query";
export default function ProfilePage() {
  const queryClient =
  useQueryClient();
const [resumeFile, setResumeFile] =
  useState<File | null>(null);
const {
  data: profile,
  isLoading,
  error,
} = useQuery({
    queryKey: ["student-profile"],
    queryFn: () => studentProfileService.getProfile(),
  });
  const uploadResumeMutation =
  useMutation({
    mutationFn: (file: File) =>
      studentProfileService.uploadResume(
        file
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["student-profile"],
      });

      toast.success(
        "Resume uploaded successfully"
      );

      setResumeFile(null);
    },

    onError: () => {
      toast.error(
        "Failed to upload resume"
      );
    },
  });

const deleteResumeMutation =
  useMutation({
    mutationFn: () =>
      studentProfileService.deleteResume(),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["student-profile"],
      });

      toast.success(
        "Resume deleted successfully"
      );
    },

    onError: () => {
      toast.error(
        "Failed to delete resume"
      );
    },
  });
  const mutation =
  useMutation({
    mutationFn: (
      data: StudentProfileFormData
    ) => {
      if (profile) {
        return studentProfileService.updateProfile(
          data
        );
      }

      return studentProfileService.createProfile(
        data
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          queryKey: [
            "student-profile",
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
  const form = useForm<StudentProfileFormData>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
  full_name: "",
  college: "",
  degree: "",
  graduation_year: undefined,
  skills: "",
  career_interests: "",
},
  });

  useEffect(() => {
    if (profile) {
      form.reset({
  full_name: profile.full_name,
  college: profile.college,
  degree: profile.degree,
  graduation_year: profile.graduation_year,
  skills: profile.skills ?? "",
  career_interests:
    profile.career_interests ?? "",
});
    
    }
  }, [profile, form]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading profile…
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
const handleViewResume =
  async () => {
    try {
      const response =
        await studentProfileService.getResumeUrl();

      window.open(
        response.url,
        "_blank"
      );
    } catch {
      toast.error(
        "Failed to open resume"
      );
    }
  };
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
    ? "Keep your academic and career information up to date."
    : "Complete your profile to unlock applications and mentorship requests."
}
      />

      <Card>
        <CardHeader>
         <CardTitle>
  {profile
    ? "Personal & academic details"
    : "Set up your profile"}
</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input id="full_name" {...form.register("full_name")} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="college">College</Label>
              <Input id="college" {...form.register("college")} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" {...form.register("degree")} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="graduation_year">Graduation year</Label>
              <Input
                id="graduation_year"
                type="number"
                {...form.register("graduation_year", { valueAsNumber: true })}
              />
            </div>

            
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                placeholder="e.g. React, Python, Data analysis"
                {...form.register("skills")}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="career_interests">Career interests</Label>
              <Textarea
                id="career_interests"
                placeholder="What roles or fields excite you?"
                {...form.register("career_interests")}
              />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" disabled={mutation.isPending} size="lg">
                {mutation.isPending
  ? profile
    ? "Saving..."
    : "Creating..."
  : profile
    ? "Save changes"
    : "Create profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
  <CardHeader>
    <CardTitle>
      Resume
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    {profile?.resume_filename ? (
      <>
        <div>
          <p className="font-medium">
            {profile.resume_filename}
          </p>

          {profile.resume_uploaded_at && (
            <p className="text-sm text-muted-foreground">
              Uploaded{" "}
              {new Date(
                profile.resume_uploaded_at
              ).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={
              handleViewResume
            }
          >
            View Resume
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              deleteResumeMutation.mutate()
            }
          >
            Delete Resume
          </Button>
        </div>
      </>
    ) : (
      <p className="text-sm text-muted-foreground">
        No resume uploaded yet.
      </p>
    )}

    <Input
      type="file"
      accept=".pdf"
      onChange={(e) =>
        setResumeFile(
          e.target.files?.[0] ?? null
        )
      }
    />

    <Button
      type="button"
      disabled={!resumeFile}
      onClick={() => {
        if (resumeFile) {
          uploadResumeMutation.mutate(
            resumeFile
          );
        }
      }}
    >
      Upload Resume
    </Button>
  </CardContent>
</Card>
    </div>
  );
}
