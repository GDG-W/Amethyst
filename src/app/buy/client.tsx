"use client";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import BuyTicket from "@/components/steps/buy-ticket";
import Breadcrumb from "@/components/ui/breadcrumb";
import OrderSummary from "@/components/ui/order-summary";
import Button from "@/components/ui/button";
import AttendeeInfo from "@/components/form/attendee-info";
import BuyerInformation from "@/components/form/buyer-info";

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
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo | null>(null);
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfo | null>(null);

  const handleContinue = () => {
    if (orderItems.length < 1) return;
    queryClient.setQueryData(["orderItems"], orderItems);
    setStep((s) => Math.min(s + 1, steps.length - 1));
    return true;
  };

  const handleGoBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleBuyerSubmit = (buyer: BuyerInfo, attendees: AttendeeInfo): boolean => {
    console.log({ buyer, attendees });
    if (!buyer || !attendees) return false;

    setBuyerInfo(buyer);
    setAttendeeInfo(attendees);

    queryClient.setQueryData(["buyerInfo"], buyer);
    queryClient.setQueryData(["attendeeInfo"], attendees);

    console.log("Buyer Info:", buyer);
    console.log("Attendee Info:", attendees);

    setStep((s) => Math.min(s + 1, steps.length - 1));
    return true;
  };

  const handleNext = () => {
    if (step === 0) {
      return handleContinue();
    } else if (step === 1) {
      console.log({ buyerInfo, attendeeInfo });
      if (buyerInfo && attendeeInfo) {
        return handleBuyerSubmit(buyerInfo, attendeeInfo);
      }
      return false;
    }
    return false;
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
          <span className="label-4">Go Back</span>
        </button>
        |
        <Breadcrumb activeIndex={step} breadcrumbList={steps} />
      </div>
      <div className="flex flex-col gap-[20px] pt-5 sm:flex-row">
        <div className="w-full sm:flex-[9]">
          {step === 0 && <BuyTicket onItemsChange={setOrderItems} />}
          {step === 1 && (
            <BuyerInformation selectedDates={orderItems} onSubmit={handleBuyerSubmit} />
          )}
          <Button onClick={handleNext} className="mt-10 sm:hidden" disabled={orderItems.length < 1}>
            {step === steps.length - 1 ? "Proceed to Pay" : "Continue"}
          </Button>
        </div>
        <div className="hidden sm:block sm:flex-[8]">
          <OrderSummary
            items={orderItems}
            currentStep={step + 1}
            noOfSteps={steps.length}
            handleButtonClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
