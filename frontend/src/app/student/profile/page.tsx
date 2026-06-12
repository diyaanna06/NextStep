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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
export default function ProfilePage() {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["student-profile"],
    queryFn: () => studentProfileService.getProfile(),
  });

  const mutation = useMutation({
  mutationFn: (
    data: StudentProfileFormData
  ) =>
    studentProfileService.updateProfile(
      data
    ),

  onSuccess: () => {
    toast.success(
      "Profile updated",
      {
        description:
          "Your profile has been updated successfully.",
      }
    );
  },

  onError: () => {
    toast.error(
      "Failed to update profile",
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
      graduation_year: 2026,
      skills: "",
      career_interests: "",
      resume_link: "",
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
        career_interests: profile.career_interests ?? "",
        resume_link: profile.resume_link ?? "",
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

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Profile"
        description="Keep your academic and career information up to date."
      />

      <Card>
        <CardHeader>
          <CardTitle>Personal & academic details</CardTitle>
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

            <div className="space-y-1.5">
              <Label htmlFor="resume_link">Resume link</Label>
              <Input
                id="resume_link"
                placeholder="https://…"
                {...form.register("resume_link")}
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
                {mutation.isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
