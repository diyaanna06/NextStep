"use client";

import { useEffect } from "react";

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
  onSubmit: (
    data: OpportunityFormData
  ) => void;

  isSubmitting: boolean;

  defaultValues?: OpportunityFormData;

  submitText?: string;

  onCancel?: () => void;
}

export function OpportunityForm({
  onSubmit,
  isSubmitting,

  defaultValues,

  submitText =
    "Create Opportunity",

  onCancel,
}: Props) {
  const {
    register,

    handleSubmit,

    reset,

    formState: {
      errors,
    },
  } =
    useForm<OpportunityFormData>(
      {
        resolver:
          zodResolver(
            opportunitySchema
          ),

        defaultValues,
      }
    );

  useEffect(() => {
    if (
      defaultValues
    ) {
      reset(
        defaultValues
      );
    } else {
      reset({
        title: "",

        description:
          "",

        opportunity_type:
          "",

        location:
          "",

        skills_required:
          "",

        application_deadline:
          "",
      });
    }
  }, [
    defaultValues,
    reset,
  ]);

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="grid gap-5 sm:grid-cols-2"
    >
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="title">
          Title
        </Label>

        <Input
          id="title"
          placeholder="e.g. Frontend Engineering Intern"
          {...register(
            "title"
          )}
        />

        {errors.title && (
          <p className="text-xs text-destructive">
            {
              errors
                .title
                .message
            }
          </p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          placeholder="Describe the role, responsibilities and what success looks like."
          {...register(
            "description"
          )}
        />

        {errors.description && (
          <p className="text-xs text-destructive">
            {
              errors
                .description
                .message
            }
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="opportunity_type">
          Opportunity type
        </Label>

        <Input
          id="opportunity_type"
          placeholder="Internship / Full-time"
          {...register(
            "opportunity_type"
          )}
        />

        {errors.opportunity_type && (
          <p className="text-xs text-destructive">
            {
              errors
                .opportunity_type
                .message
            }
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">
          Location
        </Label>

        <Input
          id="location"
          placeholder="Remote / Bengaluru"
          {...register(
            "location"
          )}
        />

        {errors.location && (
          <p className="text-xs text-destructive">
            {
              errors
                .location
                .message
            }
          </p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="skills_required">
          Skills required
        </Label>

        <Input
          id="skills_required"
          placeholder="e.g. React, TypeScript"
          {...register(
            "skills_required"
          )}
        />

        {errors.skills_required && (
          <p className="text-xs text-destructive">
            {
              errors
                .skills_required
                .message
            }
          </p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="application_deadline">
          Application deadline
        </Label>

        <Input
          id="application_deadline"
          type="datetime-local"
          {...register(
            "application_deadline"
          )}
        />

        {errors.application_deadline && (
          <p className="text-xs text-destructive">
            {
              errors
                .application_deadline
                .message
            }
          </p>
        )}
      </div>

      <div className="sm:col-span-2 flex gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={
            isSubmitting
          }
        >
          {isSubmitting
            ? "Saving..."
            : submitText}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={
              onCancel
            }
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}