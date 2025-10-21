"use client";

import React, { useState } from "react";

import { ChevronLeft } from "lucide-react";

import { useCheckout, usePreflightCheckout } from "@/hooks/useCheckout";

import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import BuyTicket from "@/components/steps/buy-ticket";
import BuyerInformation from "@/components/form/buyer-info";
import OrderSummary from "@/components/ui/order-summary";
import { toast } from "@/components/ui/toast";
import { useBuyFormStore } from "@/store/buy-form-store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTickets } from "@/hooks/useTickets";

const steps = ["Buy Ticket", "Buyer Information", "Checkout"];

export type OrderItem = {
  id: string;
  name: string;
  dayName: string;
  ticketCount: number;
  price: number;
  theme: string;
  description: string;
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
  discount_code: string | null;
  callback_url: string;
  claim_url: string;
};

export type DiscountType = {
  amount_payable: number;
  discountedAmount: number;
};

export default function BuyPageClient() {
  const [step, setStep] = useState(0);
  const [discount, setDiscount] = useState<DiscountType>();
  const { tickets: standardTickets } = useTickets("standard");
  const { tickets: proTickets } = useTickets("pro");
  const { orderItems, buyerInfo, attendeeInfo, profileInfo, discountCode } = useBuyFormStore();

  const { mutateAsync: checkout, isPending } = useCheckout();
  const { mutateAsync: preflightCheckout, isPending: isPreflightPending } = usePreflightCheckout();

  const isMobile = useMediaQuery(640, "max");

  const incrementStep = () => {
    setStep((s) => {
      return Math.min(s + 1, steps.length - 1);
    });
  };
  const isNextDisabled = () => {
    if (step === 0) {
      return orderItems.length < 1;
    }

    if (step === 1) {
      if (!buyerInfo || !buyerInfo.fullName || !buyerInfo.email) {
        return true;
      }

      if (buyerInfo.belongsToMe) {
        return !(
          profileInfo &&
          profileInfo.gender &&
          profileInfo.role &&
          profileInfo.experienceLevel
        );
      } else {
        const totalTickets = orderItems.reduce((sum, item) => sum + (item.ticketCount || 0), 0);

        const totalAttendees =
          attendeeInfo && attendeeInfo.emailsByDate
            ? Object.values(attendeeInfo.emailsByDate).reduce(
                (sum: number, emails) => sum + (emails as string[]).filter(Boolean).length,
                0
              )
            : 0;

        return totalAttendees !== totalTickets;
      }
    }

    return false;
  };

  const handleContinue = () => {
    if (step === 0) {
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

      incrementStep();
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
        if (Array.isArray(emails)) {
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
        }
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
      callback_url: `${window.location.origin}/success`,
      claim_url: `${window.location.origin}/claim`,
      discount_code: discountCode,
    };
  };

  const handleNext = async () => {
    if (step === 0) return handleContinue();
    if (step === 1) {
      incrementStep();
      return;
    }
    if (step === 2) {
      const payload = prepareCheckoutPayload();
      if (!payload) {
        toast.error("An error occurred", "Could not prepare your order information.");
        return;
      }

      try {
        await checkout(payload);
      } catch (err) {
        toast.error("Checkout failed", "Please try again in a few minutes");
      }
    }
  };

  const handleDiscountApply = async () => {
    if (step === 0) return handleContinue();
    if (step === 1) {
      incrementStep();
      return;
    }
    if (step === 2) {
      const payload = prepareCheckoutPayload();
      if (!payload) {
        toast.error("An error occurred", "Could not prepare your order information.");
        return;
      }
      try {
        const res = await preflightCheckout({ ...payload, is_preflight: true });
        if (res.success) {
          setDiscount({
            amount_payable: res?.data?.amount_payable,
            discountedAmount: res?.data?.discount?.discount?.discountedAmount,
          });
        }
      } catch (error) {
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
          className="disabled:text-soft-400 flex shrink-0 items-center gap-1 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="inline" size={20} />
          <span className="label-4 cursor-pointer">Go Back</span>
        </button>
        |
        <Breadcrumb activeIndex={step} breadcrumbList={isMobile ? steps : steps.slice(0, -1)} />
      </div>
      <div className="flex flex-col gap-[20px] pt-5 sm:flex-row">
        <div className="w-full sm:flex-[9]">
          {step === 0 && <BuyTicket />}
          {(step === 1 || (!isMobile && step === 2)) && (
            <BuyerInformation selectedDates={orderItems} />
          )}
          {isMobile && step === 2 && (
            <OrderSummary
              items={orderItems}
              currentStep={step + 1}
              noOfSteps={steps.length}
              handleButtonClick={handleNext}
              disabled={isNextDisabled()}
              loading={isPending || isPreflightPending}
              discount={discount}
              handleDiscountApply={handleDiscountApply}
            />
          )}
          <Button
            onClick={handleNext}
            className={`mt-10 sm:hidden ${isMobile && step === 2 ? "hidden" : null}`}
            disabled={isNextDisabled()}
            loading={isPending || isPreflightPending}
          >
            {step === steps.length - 1 ? "Proceed to Pay" : "Continue"}
          </Button>
        </div>
        <div className="hidden sm:block sm:flex-[8]">
          <OrderSummary
            items={orderItems}
            currentStep={step + 1}
            noOfSteps={isMobile ? steps.length : steps.length - 1}
            handleButtonClick={handleNext}
            disabled={isNextDisabled()}
            loading={isPending || isPreflightPending}
            discount={discount}
            handleDiscountApply={handleDiscountApply}
          />
        </div>
      </div>
    </div>
  );
}
