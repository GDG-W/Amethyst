"use client";

import React from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MultiInput from "@/components/ui/inputs/multi-input";
import Card from "@/components/ui/card";
import { createAttendeeSchema, AttendeeFormData } from "@/schemas/attendeeSchema";

type AttendeesInfoProps = {
  selectedDates: Array<{
    id: string;
    dayName: string;
    ticketCount: number;
  }>;
  buyerEmail?: string;
  onChange?: (data: AttendeeFormData) => void;
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

const AttendeeInfo = ({ selectedDates, onChange }: AttendeesInfoProps) => {
  const ticketQuantities = selectedDates.reduce(
    (acc, date) => {
      acc[date.id] = date.ticketCount;
      return acc;
    },
    {} as Record<string, number>
  );

  const schema = createAttendeeSchema(ticketQuantities);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailsByDate: getDefaultEmailsByDate(selectedDates),
      belongsToMe: false,
    },
  });

  const { field: emailsField } = useController({
    name: "emailsByDate",
    control,
  });

  const formValues = watch();

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const handleEmailChange = (dateId: string, emails: string[]) => {
    const maxEmails = ticketQuantities[dateId];
    if (emails.length > maxEmails) {
      return;
    }
    const newValue = {
      ...emailsField.value,
      [dateId]: emails,
    };
    emailsField.onChange(newValue);

    onChange?.({
      emailsByDate: newValue,
      belongsToMe: formValues.belongsToMe,
    });
  };
  console.log(errors);

  return (
    <Card
      title="Attendee information"
      subtitle='Kindly Press "Enter" key or comma after entering each email to add it to the list.'
      numbered={true}
      number={4}
    >
      <form onSubmit={handleSubmit(() => {})}>
        <div className="space-y-4 px-5 py-7">
          {selectedDates.map((date, index) => (
            <div key={`${date.id || date.dayName}-${index}`}>
              <MultiInput
                id={`attendee-emails-${date.id || index}`}
                label="Email address"
                extraLabel={`${date.dayName}`}
                placeholder="Enter email address"
                value={emailsField.value[date.id]}
                onChange={(emails) => handleEmailChange(date.id, emails)}
                error={errors.emailsByDate?.[date.id]?.message}
                validate={validateEmail}
                maxItems={date.ticketCount}
              />
            </div>
          ))}
        </div>
      </form>
    </Card>
  );
};

export default AttendeeInfo;
