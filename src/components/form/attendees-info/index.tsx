"use client";

import React from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import MultiInput from "@/components/ui/inputs/multi-input";
import Card from "@/components/ui/card";

const attendeeSchema = z.object({
  emails: z
    .array(z.string().email("Please enter a valid email address"))
    .min(1, "At least one email address is required"),
  belongsToMe: z.boolean(),
});

type FormData = z.infer<typeof attendeeSchema>;

const AttendeesInfo = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      emails: [],
      belongsToMe: false,
    },
  });

  const {
    field: emailsField,
    fieldState: { error: emailsError },
  } = useController({
    name: "emails",
    control,
  });

  // Email validation function for MultiInput
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  return (
    <Card
      title='Attendee information'
      subtitle='Kindly Press "Enter" key or comma after entering each email to add it to the list.'
      numbered={true}
      number={4}
    >
      <form onSubmit={handleSubmit(() => {})}>
        <div className='space-y-4 px-5 py-7'>
          <div>
            <MultiInput
              id='attendee-emails'
              label='Email address'
              //   extraLabel='Wednesday'
              placeholder='Enter email address'
              value={emailsField.value}
              onChange={emailsField.onChange}
              error={emailsError?.message}
              validate={validateEmail}
            />
          </div>
          <div>
            <MultiInput
              id='attendee-emails'
              label='Email address'
              //   extraLabel='Thursday'
              placeholder='Enter email address'
              value={emailsField.value}
              onChange={emailsField.onChange}
              error={emailsError?.message}
              validate={validateEmail}
            />
          </div>
          <div>
            <MultiInput
              id='attendee-emails'
              label='Email address'
              //   extraLabel='Friday'
              placeholder='Enter email address'
              value={emailsField.value}
              onChange={emailsField.onChange}
              error={emailsError?.message}
              validate={validateEmail}
            />
          </div>
          <div>
            <MultiInput
              id='attendee-emails'
              label='Email address'
              //   extraLabel='Saturday'
              placeholder='Enter email address'
              value={emailsField.value}
              onChange={emailsField.onChange}
              error={emailsError?.message}
              validate={validateEmail}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AttendeesInfo;
