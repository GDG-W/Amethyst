"use client";

import React from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import MultiInput from "@/components/ui/inputs/multi-input";
import Card from "@/components/ui/card";
import { attendeeSchema } from "@/schemas/attendeeSchema";

type FormData = z.infer<typeof attendeeSchema>;

type AttendeesInfoProps = {
  selectedDates: Array<{
    id: string;
    day: number;
    dayName: string;
    date: string;
  }>;
};

// Helper function to initialize default values
const getDefaultEmailsByDate = (selectedDates: AttendeesInfoProps["selectedDates"]) => {
  return selectedDates.reduce(
    (acc, date) => {
      acc[date.id] = [];
      return acc;
    },
    {} as Record<string, string[]>
  );
};

const AttendeeInfo = ({ selectedDates }: AttendeesInfoProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      emailsByDate: getDefaultEmailsByDate(selectedDates),
      belongsToMe: false,
    },
  });

  const { field: emailsField } = useController({
    name: "emailsByDate",
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

  // Handle email changes for specific dates
  const handleEmailChange = (dateId: string, emails: string[]) => {
    emailsField.onChange({
      ...emailsField.value,
      [dateId]: emails,
    });
  };

  return (
    <Card
      title="Attendee information"
      subtitle='Kindly Press "Enter" key or comma after entering each email to add it to the list.'
      numbered={true}
      number={4}
    >
      <form onSubmit={handleSubmit(() => {})}>
        <div className="space-y-4 px-5 py-7">
          {selectedDates.map((date) => (
            <div key={date.id}>
              <MultiInput
                id={`attendee-emails-${date.id}`}
                label="Email address"
                extraLabel={`${date.dayName}`}
                placeholder="Enter email address"
                value={emailsField.value[date.id]}
                onChange={(emails) => handleEmailChange(date.id, emails)}
                error={errors.emailsByDate?.[date.id]?.message}
                validate={validateEmail}
              />
            </div>
          ))}
        </div>
      </form>
    </Card>
  );
};

export default AttendeeInfo;
