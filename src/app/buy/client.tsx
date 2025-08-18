"use client";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import BuyTicket from "@/components/steps/buy-ticket";
import Breadcrumb from "@/components/ui/breadcrumb";
import OrderSummary from "@/components/ui/order-summary";
import Button from "@/components/ui/button";
import BuyerInformation from "@/components/form/buyer-info";
import { useBuyFormStore } from "@/store/buy-form-store";
import { useCheckout } from "@/hooks/useCheckout";
import { toast } from "@/components/ui/toast";
import { useTickets } from "@/hooks/useTickets";

const steps = ["Buy Ticket", "Buyer Information"];

export type OrderItem = {
  id: string;
  name: string;
  dayName: string;
  ticketCount: number;
  price: number;
};

export type BuyerInfo = {
  fullName: string;
  email: string;
  belongsToMe: boolean;
};

export type AttendeeInfo = {
  emailsByDate: Record<string, string[]>;
};

type CheckoutAttendee = {
  email: string;
  ticket_ids: string[];
  gender?: string;
  role?: string;
  experience?: string;
};

type CheckoutPayload = {
  buyer: { fullname: string; email: string };
  attendees: CheckoutAttendee[];
  callback_url: string;
};

export default function BuyPageClient() {
  const [step, setStep] = useState(0);
  const { tickets: standardTickets } = useTickets("standard");
  const { tickets: proTickets } = useTickets("pro");
  const { mutateAsync: checkout, isPending } = useCheckout();
  const { orderItems, buyerInfo, attendeeInfo, profileInfo } = useBuyFormStore();

  const isNextDisabled = () => {
    if (step === 0) {
      // Step 0: no tickets selected
      return orderItems.length < 1;
    }

    if (step === 1) {
      if (!buyerInfo || !buyerInfo.fullName || !buyerInfo.email) {
        return true; // buyer info is required
      }

      if (buyerInfo.belongsToMe) {
        // ticket belongs to me → require profile registration info
        return !(
          profileInfo &&
          profileInfo.gender &&
          profileInfo.role &&
          profileInfo.experienceLevel
        );
      } else {
        // ticket for others → require at least one attendee email
        return !(
          attendeeInfo &&
          Object.keys(attendeeInfo.emailsByDate || {}).some(
            (dateId) => attendeeInfo.emailsByDate[dateId].length > 0
          )
        );
      }
    }

    return false;
  };

  const handleContinue = () => {
    if (step === 0) {
      // Remove tickets with 0 quantity
      const { quantities, selectedByType, setSelectedByType } = useBuyFormStore.getState();

      ["standard", "pro"].forEach((type) => {
        const filtered = selectedByType[type as "standard" | "pro"].filter((iso) => {
          const ticket = (type === "pro" ? proTickets : standardTickets).find(
            (t) => t.date.split("T")[0] === iso
          );
          if (!ticket) return false;
          return (quantities[ticket.id] ?? 0) > 0;
        });
        setSelectedByType(type as "standard" | "pro", filtered);
      });

      setStep((s) => Math.min(s + 1, steps.length - 1));
      return true;
    }

    if (step === 1) {
      handleNext();
    }
  };

  const handleGoBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const prepareCheckoutPayload = (): CheckoutPayload | null => {
    if (!buyerInfo) return null;

    const buyer = { fullname: buyerInfo.fullName.toLowerCase(), email: buyerInfo.email };

    const attendees: CheckoutAttendee[] = [];

    // Add attendees from emailsByDate
    if (attendeeInfo?.emailsByDate) {
      Object.entries(attendeeInfo.emailsByDate).forEach(([dateId, emails]) => {
        emails.forEach((email) => {
          if (!email) return;

          const ticket_ids = orderItems
            .filter((i) => i.id === dateId)
            .map((i) => i.id)
            .filter(Boolean);

          if (!ticket_ids.length) return;

          const attendee: CheckoutAttendee = {
            email,
            ticket_ids,
            ...(profileInfo?.gender && { gender: profileInfo.gender }),
            ...(profileInfo?.role && { role: profileInfo.role }),
            ...(profileInfo?.experienceLevel && { experience: profileInfo.experienceLevel }),
          };

          attendees.push(attendee);
        });
      });
    }

    // Add buyer as attendee if "belongsToMe" is checked
    if (buyerInfo.belongsToMe && orderItems.length) {
      const buyerTicketIds = orderItems
        .map((i) => i.id)
        .filter((id) => !attendees.some((att) => att.ticket_ids.includes(id)));

      if (buyerTicketIds.length) {
        const buyerAttendee: CheckoutAttendee = {
          email: buyerInfo.email,
          ticket_ids: buyerTicketIds,
          ...(profileInfo?.gender && { gender: profileInfo.gender }),
          ...(profileInfo?.role && { role: profileInfo.role }),
          ...(profileInfo?.experienceLevel && { experience: profileInfo.experienceLevel }),
        };
        attendees.push(buyerAttendee);
      }
    }

    // Group by unique email and merge ticket_ids
    const grouped: Record<string, CheckoutAttendee> = {};
    attendees.forEach((att) => {
      if (!grouped[att.email]) {
        grouped[att.email] = { ...att, ticket_ids: [...att.ticket_ids] };
      } else {
        grouped[att.email].ticket_ids.push(...att.ticket_ids);
        grouped[att.email].ticket_ids = Array.from(new Set(grouped[att.email].ticket_ids)); // remove duplicates
      }
    });

    const mergedAttendees = Object.values(grouped);

    return {
      buyer,
      attendees: mergedAttendees,
      callback_url: `${window.location.origin}/login`,
    };
  };

  const handleNext = async () => {
    if (step === 0) return handleContinue();

    if (step === 1) {
      const payload = prepareCheckoutPayload();
      console.log(payload);
      if (!payload) return;

      try {
        const res = await checkout(payload);
        console.log(res);
      } catch (err) {
        console.log(err);
        toast.error("Checkout failed", "Please try again in a few minutes");
      }
    }
  };

  return (
    <div className="pt-6">
      <div className="flex items-center gap-3">
        <button
          disabled={step === 0}
          onClick={handleGoBack}
          className="disabled:text-soft-400 flex items-center gap-1 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="inline" size={20} />
          <span className="label-4 cursor-pointer">Go Back</span>
        </button>
        |
        <Breadcrumb activeIndex={step} breadcrumbList={steps} />
      </div>
      <div className="flex flex-col gap-[20px] pt-5 sm:flex-row">
        <div className="w-full sm:flex-[9]">
          {step === 0 && <BuyTicket />}
          {step === 1 && <BuyerInformation selectedDates={orderItems} />}
          <Button
            onClick={handleNext}
            className="mt-10 sm:hidden"
            disabled={isNextDisabled()}
            loading={isPending}
          >
            {step === steps.length - 1 ? "Proceed to Pay" : "Continue"}
          </Button>
        </div>
        <div className="hidden sm:block sm:flex-[8]">
          <OrderSummary
            items={orderItems}
            currentStep={step + 1}
            noOfSteps={steps.length}
            handleButtonClick={handleNext}
            disabled={isNextDisabled()}
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
}
