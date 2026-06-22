import { z } from "zod";

export const opportunitySchema =
  z.object({
    title: z
      .string()
      .min(
        1,
        "Title is required"
      ),

    description: z
      .string()
      .min(
        1,
        "Description is required"
      ),

    opportunity_type:
      z.string().min(
        1,
        "Opportunity type is required"
      ),

    location: z
      .string()
      .min(
        1,
        "Location is required"
      ),

    skills_required:
      z.string().min(
        1,
        "Skills are required"
      ),

    application_deadline:
      z.string().min(
        1,
        "Deadline is required"
      ),
  });

export type OpportunityFormData =
  z.infer<
    typeof opportunitySchema
  >;