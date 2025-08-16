import z from "zod";

export const buyerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  belongsToMe: z.boolean(),
});
