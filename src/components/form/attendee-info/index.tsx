"use client";

import React from "react";

import MultiInput from "@/components/ui/inputs/multi-input";
import Card from "@/components/ui/card";
import { useBuyFormStore } from "@/store/buy-form-store";

type AttendeesInfoProps = {
  selectedDates: Array<{
    id: string;
    dayName: string;
    ticketCount: number;
  }>;
  buyerEmail?: string;
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
  const { attendeeInfo, attendeeErrors, updateAttendeeEmails, setAttendeeError } =
    useBuyFormStore();

  const ticketQuantities = selectedDates.reduce(
    (acc, date) => {
      acc[date.id] = date.ticketCount;
      return acc;
    },
    {} as Record<string, number>
  );

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

    updateAttendeeEmails(dateId, emails);

    // Clear any existing error for this field
    setAttendeeError(dateId, null);
  };

  return (
    <Card
      title="Attendee information"
      subtitle='Kindly Press "Enter" key or comma after entering each email to add it to the list.'
      numbered={true}
      number={4}
    >
      <div className="space-y-4 px-5 py-7">
        {selectedDates.map((date, index) => (
          <div key={`${date.id || date.dayName}-${index}`}>
            <MultiInput
              id={`attendee-emails-${date.id || index}`}
              label={date.ticketCount > 1 ? "Email address(es)" : "Email address"}
              extraLabel={`${date.dayName}`}
              placeholder={date.ticketCount > 1 ? "Enter email address(es)" : "Enter email address"}
              value={attendeeInfo?.emailsByDate[date.id] || []}
              onChange={(emails) => handleEmailChange(date.id, emails)}
              error={attendeeErrors[date.id]}
              validate={validateEmail}
              maxItems={date.ticketCount}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendeeInfo;
