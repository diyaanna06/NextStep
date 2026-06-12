"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  opportunitySchema,
  OpportunityFormData,
} from "@/lib/validations/opportunity";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  onSubmit: (data: OpportunityFormData) => void;
  isSubmitting: boolean;
}

export function OpportunityForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 sm:grid-cols-2"
    >
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="e.g. Frontend Engineering Intern"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the role, responsibilities and what success looks like."
          {...register("description")}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="opportunity_type">Opportunity type</Label>
        <Input
          id="opportunity_type"
          placeholder="Internship / Full-time"
          {...register("opportunity_type")}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Remote / Bengaluru / …"
          {...register("location")}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="skills_required">Skills required</Label>
        <Input
          id="skills_required"
          placeholder="e.g. React, TypeScript"
          {...register("skills_required")}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="application_deadline">Application deadline</Label>
        <Input
          id="application_deadline"
          type="datetime-local"
          {...register("application_deadline")}
        />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Create opportunity"}
        </Button>
      </div>
    </form>
  );
}
