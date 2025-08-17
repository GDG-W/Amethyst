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

export default function BuyPageClient() {
  const [step, setStep] = useState(0);
  const { mutateAsync: checkout } = useCheckout();
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
    if (orderItems.length < 1) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
    return true;
  };

  const handleGoBack = () => {
    if (step > 0) setStep(step - 1);
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

  const prepareCheckoutPayload = (): CheckoutPayload | null => {
    if (!buyerInfo) return null;

    const buyer = { fullname: buyerInfo.fullName.toLowerCase(), email: buyerInfo.email };

    const attendees: CheckoutAttendee[] = [];

    // Add attendees from emailsByDate
    if (attendeeInfo?.emailsByDate) {
      Object.entries(attendeeInfo.emailsByDate).forEach(([dateId, emails]) => {
        emails.forEach((email) => {
          if (!email || email === buyerInfo.email) return;

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

    return {
      buyer,
      attendees,
      callback_url: `${window.location.origin}/payment-success`,
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
          <Button onClick={handleNext} className="mt-10 sm:hidden" disabled={isNextDisabled()}>
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
          />
        </div>
      </div>
    </div>
  );
}
