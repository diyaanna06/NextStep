import { z } from "zod";

export const studentProfileSchema =
  z.object({
    full_name: z.string().min(
      1,
      "Full name is required"
    ),

    college: z.string().min(
      1,
      "College is required"
    ),

    degree: z.string().min(
      1,
      "Degree is required"
    ),

    graduation_year: z
      .number({
        error: "Graduation year is required",
      })
      .min(
        2000,
        "Graduation year must be after 2000"
      ),

    skills: z.string(),

    career_interests:
      z.string(),
  });

export type StudentProfileFormData =
  z.infer<
    typeof studentProfileSchema
  >;