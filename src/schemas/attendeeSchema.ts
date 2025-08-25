import z from "zod";

export const createAttendeeSchema = (ticketQuantities: Record<string, number>) => {
  return z
    .object({
      emailsByDate: z.record(
        z.string(),
        z.array(z.string().email("Please enter a valid email address"))
      ),
      belongsToMe: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (data.belongsToMe) return;

      Object.entries(data.emailsByDate).forEach(([dateId, emails]) => {
        const maxEmails = ticketQuantities[dateId];
        if (emails.length > maxEmails) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["emailsByDate", dateId],
            message: `Maximum ${maxEmails} email(s) allowed for this day`,
          });
        }
      });
    });
};

export type AttendeeFormData =
  ReturnType<typeof createAttendeeSchema> extends z.ZodType<infer U> ? U : never;
