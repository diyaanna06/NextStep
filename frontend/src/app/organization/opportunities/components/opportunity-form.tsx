"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  opportunitySchema,
  OpportunityFormData,
} from "@/lib/validations/opportunity";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

interface Props {
  onSubmit: (
    data: OpportunityFormData
  ) => void;

  isSubmitting: boolean;
}

export function OpportunityForm({
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } =
    useForm<OpportunityFormData>({
      resolver:
        zodResolver(
          opportunitySchema
        ),
    });

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <Input
        placeholder="Title"
        {...register(
          "title"
        )}
      />

      {errors.title && (
        <p className="text-sm text-red-500">
          {
            errors.title
              .message
          }
        </p>
      )}

      <Input
        placeholder="Description"
        {...register(
          "description"
        )}
      />

      <Input
        placeholder="Opportunity Type"
        {...register(
          "opportunity_type"
        )}
      />

      <Input
        placeholder="Location"
        {...register(
          "location"
        )}
      />

      <Input
        placeholder="Skills Required"
        {...register(
          "skills_required"
        )}
      />

      <Input
        type="datetime-local"
        {...register(
          "application_deadline"
        )}
      />

      <Button
        type="submit"
        disabled={
          isSubmitting
        }
      >
        {isSubmitting
          ? "Saving..."
          : "Create Opportunity"}
      </Button>
    </form>
  );
}