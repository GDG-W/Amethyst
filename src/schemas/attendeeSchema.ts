import z from "zod";

export const attendeeSchema = z.object({
  emailsByDate: z.record(
    z.string(),
    z
      .array(z.string().email("Please enter a valid email address"))
      .min(1, "At least one email address is required")
  ),
  belongsToMe: z.boolean(),
});
