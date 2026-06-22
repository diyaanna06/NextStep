import { z } from "zod";

export const mentorProfileSchema = z.object({
  full_name: z
    .string()
    .min(
      2,
      "Full name is required"
    ),

  current_role: z
    .string()
    .min(
      2,
      "Current role is required"
    ),

  company: z
    .string()
    .min(
      2,
      "Company is required"
    ),

  years_of_experience:
    z
      .number({
        error:
          "Years of experience is required",
      })
      .min(
        0,
        "Years of experience cannot be negative"
      ),

  expertise_areas:
    z
      .string()
      .min(
        2,
        "Expertise areas are required"
      ),

  
});

export type MentorProfileFormData =
  z.infer<
    typeof mentorProfileSchema
  >;