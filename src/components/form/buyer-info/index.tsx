"use client";

import React from "react";
import { z } from "zod";

import TextField from "@/components/ui/inputs/text-field";
import Checkbox from "@/components/ui/inputs/checkbox";
import Card from "@/components/ui/card";
import { useBuyFormStore } from "@/store/buy-form-store";

import { buyerSchema } from "@/schemas/buyerSchema";

import ProfileRegistration from "../profile-reg";
import AttendeeInfo from "../attendee-info";

import type { OrderItem, BuyerInfo } from "@/app/buy/client";

type FormData = z.infer<typeof buyerSchema>;

type BuyerInformationProps = {
  selectedDates: OrderItem[];
};

const BuyerInformation = ({ selectedDates }: { selectedDates: OrderItem[] }) => {
  const { buyerInfo, buyerErrors, attendeeInfo, updateBuyerField, setBuyerError } =
    useBuyFormStore();

  const fullName = buyerInfo?.fullName || "";
  const email = buyerInfo?.email || "";
  const belongsToMe = buyerInfo?.belongsToMe || false;

  const handleFieldChange = <K extends keyof BuyerInfo>(field: K, value: BuyerInfo[K]) => {
    updateBuyerField(field, value);
  };

  let ChildComponent;
  if (belongsToMe) {
    ChildComponent = (
      <ProfileRegistration
        initialData={{ fullName, email }}
        readonlyFields={["fullName", "email"]}
      />
    );
  } else {
    ChildComponent = <AttendeeInfo selectedDates={selectedDates} />;
  }

  return (
    <div>
      <Card title="Buyer Information" numbered={true} number={3}>
        <form>
          <div className="space-y-4 px-5 py-7">
            <div>
              <TextField
                label="Full Name"
                name="fullName"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                error={buyerErrors.fullName}
              />
            </div>

            <div>
              <TextField
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                error={buyerErrors.email}
              />
            </div>
          </div>
        </form>
      </Card>

      <div className="mt-4">
        <Checkbox
          name="belongsToMe"
          label="This ticket belongs to me"
          checked={belongsToMe}
          onChange={(checked) => handleFieldChange("belongsToMe", checked.target.checked)}
        />
      </div>

      <div className="mt-6">{ChildComponent}</div>
    </div>
  );
};

export default BuyerInformation;
