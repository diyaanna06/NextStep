import { z } from "zod";

export const organizationProfileSchema = z.object({
  organization_name: z
    .string()
    .min(2, "Organization name is required"),

  industry: z
    .string()
    .min(2, "Industry is required"),

  website: z
    .string()
    .url("Please enter a valid website URL"),

  description: z
    .string()
    .min(10, "Description is required"),

  location: z
    .string()
    .min(2, "Location is required"),
});

export type OrganizationProfileFormData =
  z.infer<typeof organizationProfileSchema>;