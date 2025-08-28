import z from "zod";

import { Gender, Role, ExperienceLevel } from "@/constants/enums";

const ClaimTicketSchema = z.object({
  fullname: z.string().min(2, "Your full name is required"),
  // email: z.email(),
  gender: z.enum(Gender),
  role: z.enum(Role),
  experience: z.enum(ExperienceLevel),
});

export type ClaimTicketFormData = z.infer<typeof ClaimTicketSchema>;

export default ClaimTicketSchema;
