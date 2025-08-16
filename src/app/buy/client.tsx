"use client";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import BuyTicket from "@/components/steps/buy-ticket";
import Breadcrumb from "@/components/ui/breadcrumb";
import OrderSummary from "@/components/ui/order-summary";
import Button from "@/components/ui/button";

const steps = ["Buy Ticket", "Buyer Information"];

export default function BuyPageClient() {
  const [step, setStep] = useState(0);
  const [orderItems, setOrderItems] = useState<{ name: string; price: number }[]>([]);

  const handleContinue = () => {
    if (orderItems.length < 1) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleGoBack = () => {
    if (step > 0) setStep(step - 1);
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
          <Button
            onClick={handleContinue}
            className="mt-10 sm:hidden"
            disabled={orderItems.length < 1}
          >
            {step === steps.length - 1 ? "Proceed to Pay" : "Continue"}
          </Button>
        </div>
        <div className="hidden sm:block sm:flex-[8]">
          <OrderSummary
            items={orderItems}
            currentStep={step + 1}
            noOfSteps={steps.length}
            handleButtonClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
}
