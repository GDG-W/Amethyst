"use client";

import React from "react";

import MultiInput from "@/components/ui/inputs/multi-input";
import Card from "@/components/ui/card";
import { useBuyFormStore } from "@/store/buy-form-store";
import { FRI_STANDARD_ID, SAT_STANDARD_ID, BOTH_DAYS_FULL_ID } from "@/constants/ticket";
// import { date, email } from "zod";

type AttendeesInfoProps = {
  selectedDates?: Array<{
    id: string;
    dayName: string;
    ticketCount: number;
  }>;
  buyerEmail?: string;
};

// Helper function to initialize default values
// const getDefaultEmailsByDate = (selectedDates: AttendeesInfoProps["selectedDates"]) => {
//   return selectedDates.reduce(
//     (acc, date) => {
//       acc[date.id] = [];
//       return acc;
//     },
//     {} as Record<string, string[]>
//   );
// };

const AttendeeInfo = ({ selectedDates = [] }: AttendeesInfoProps) => {
  const { buyerInfo, attendeeInfo, attendeeErrors, updateAttendeeEmails, setAttendeeError } =
    useBuyFormStore();

  const ticketQuantities = (selectedDates || []).reduce(
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

    let isUniqueMail = true;

    const emailSet = new Set(emails.map((e) => e.toLowerCase()));

    // if (buyerInfo && emailSet.has(buyerInfo?.email.toLowerCase())) {
    //   setAttendeeError(dateId, "You can't buy another ticket with the same email!");
    //   return;
    // }

    if (dateId === BOTH_DAYS_FULL_ID || dateId === FRI_STANDARD_ID || dateId === SAT_STANDARD_ID) {
      const friEmails = attendeeInfo?.emailsByDate[`${FRI_STANDARD_ID}`] || [];
      const satEmails = attendeeInfo?.emailsByDate[`${SAT_STANDARD_ID}`] || [];
      const fullEmails = attendeeInfo?.emailsByDate[`${BOTH_DAYS_FULL_ID}`] || [];

      if (dateId === BOTH_DAYS_FULL_ID) {
        const standardEmails = [...friEmails, ...satEmails].map((e) => e.toLowerCase());
        isUniqueMail = standardEmails.every((email) => !emailSet.has(email));
      } else {
        const fullEmailsLower = fullEmails.map((e) => e.toLowerCase());
        isUniqueMail = fullEmailsLower.every((email) => !emailSet.has(email));
      }
    }

    if (!isUniqueMail) {
      setAttendeeError(
        dateId,
        "You can't buy a Full Experience and Standard ticket for the same person!"
      );
      return;
    }

    updateAttendeeEmails(dateId, emails);
    setAttendeeError(dateId, null); // Clear any existing error for this field
  };

  return (
    <Card
      title="Attendee information"
      subtitle='Kindly Press "Enter" key or comma after entering each email to add it to the list.'
      numbered={true}
      number={4}
    >
      <div className="space-y-4 px-5 py-7">
        {(selectedDates || []).map((date, index) => (
          <div key={`${date.id || date.dayName}-${index}`}>
            <MultiInput
              id={`attendee-emails-${date.id || index}`}
              label={date.ticketCount > 1 ? "Email address(es)" : "Email address"}
              extraLabel={`${date.dayName} ${date.id === BOTH_DAYS_FULL_ID ? "(Full Experience)" : ""}`}
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
