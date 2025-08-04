import z from "zod";

const ClaimTicketSchema = z.object({
  fullName: z.string().min(2, "full name must be provided!"),
  email: z.email(),
  gender: z.enum(["Female", "Male"]),
  role: z.enum(["Frontend Engineer"]),
  experienceLevel: z.enum([
    "Beginner - 0-1 year experience, just starting out",
    "Mid-level - 1-4 years experience, comfortable with most tools",
    "Senior - 4+ years, possibly leading projects or mentoring others",
  ]),
});

export type ClaimTicketFormData = z.infer<typeof ClaimTicketSchema>;

export default ClaimTicketSchema;
