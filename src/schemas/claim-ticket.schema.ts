import z from "zod";

import { Gender, Role, ExperienceLevel } from "@/constants/enums";

const ClaimTicketSchema = z.object({
  fullName: z.string().min(2, "full name must be provided!"),
  email: z.email(),
  gender: z.enum(Gender),
  role: z.enum(Role),
  experienceLevel: z.enum(ExperienceLevel),
});

export type ClaimTicketFormData = z.infer<typeof ClaimTicketSchema>;

export default ClaimTicketSchema;
