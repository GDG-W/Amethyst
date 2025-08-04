"use client";

import React from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextField from "@/components/ui/inputs/text-field";
import Card from "@/components/ui/card";

const attendeeSchema = z.object({
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  belongsToMe: z.boolean(),
});

type FormData = z.infer<typeof attendeeSchema>;

const AttendeeInfo = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      email: "",
      belongsToMe: false,
    },
  });

  const {
    field: emailField,
    fieldState: { error: emailError },
  } = useController({
    name: "email",
    control,
  });

  return (
    <Card
      title='Attendee information'
      subtitle='Kindly Press “Enter” key after entering each email to add it to the list.'
      numbered={true}
      number={4}
    >
      <form onSubmit={handleSubmit(() => {})}>
        <div className='space-y-4 px-5 py-7'>
          <div>
            <TextField
              label='Email address'
              name='email'
              type='email'
              placeholder='Enter email address'
              value={emailField.value}
              onChange={emailField.onChange}
              onBlur={emailField.onBlur}
              error={emailError?.message}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AttendeeInfo;
