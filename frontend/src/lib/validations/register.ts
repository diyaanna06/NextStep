import { z } from "zod";

export const registerSchema =
  z
    .object({
      email: z.email(
        "Please enter a valid email"
      ),

      password: z
        .string()
        .min(
          8,
          "Password must be at least 8 characters"
        ),

      confirmPassword:
        z.string(),

      role: z.enum(
        [
          "student",
          "mentor",
          "organization",
        ],
        {
          message:
            "Please select a role",
        }
      ),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        message:
          "Passwords do not match",

        path: [
          "confirmPassword",
        ],
      }
    );

export type RegisterFormData =
  z.infer<
    typeof registerSchema
  >;