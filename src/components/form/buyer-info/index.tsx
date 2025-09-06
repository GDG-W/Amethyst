"use client";

import React, { useMemo } from "react";

import { THURS_PRO_ID, THURS_STANDARD_ID } from "@/constants/ticket";
import Card from "@/components/ui/card";
import Checkbox from "@/components/ui/inputs/checkbox";
import TextField from "@/components/ui/inputs/text-field";
import { buyerSchema } from "@/schemas/buyerSchema";
import { useBuyFormStore } from "@/store/buy-form-store";

import ProfileRegistration from "../profile-reg";
import AttendeeInfo from "../attendee-info";

import type { BuyerInfo, OrderItem } from "@/app/(dashboard)/buy/client";

const BuyerInformation = ({ selectedDates }: { selectedDates: OrderItem[] }) => {
  const { buyerInfo, orderItems, buyerErrors, attendeeInfo, updateBuyerField, setBuyerError } =
    useBuyFormStore();

  const fullName = buyerInfo?.fullName || "";
  const email = buyerInfo?.email || "";
  const belongsToMe = buyerInfo?.belongsToMe || false;

  const validateField = <K extends keyof BuyerInfo>(field: K, value: BuyerInfo[K]) => {
    const partial = { ...buyerInfo, [field]: value };

    const result = buyerSchema.safeParse(partial);

    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === field);
      setBuyerError(field, issue ? issue.message : null);
    } else {
      setBuyerError(field, null);
    }
  };

  const handleFieldChange = <K extends keyof BuyerInfo>(field: K, value: BuyerInfo[K]) => {
    updateBuyerField(field, value);
    validateField(field, value);
  };

  // const canShowBelongsToMe = orderItems.every((item) => (item.ticketCount || 0) === 1);

  const canShowBelongsToMe = useMemo(() => {
    let hasThursStandard = false;
    let hasThursPro = false;
    let allOne = true;

    for (const item of orderItems) {
      if ((item.ticketCount || 0) !== 1) {
        allOne = false;
        break;
      }
      if (item.id === THURS_STANDARD_ID) {
        hasThursStandard = true;
      }
      if (item.id === THURS_PRO_ID) {
        hasThursPro = true;
      }

      if (hasThursStandard && hasThursPro) {
        break;
      }
    }

    return allOne && !(hasThursStandard && hasThursPro);
  }, [orderItems]);

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
                onBlur={(e) => validateField("fullName", e.target.value)}
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
                onBlur={(e) => validateField("fullName", e.target.value)}
                error={buyerErrors.email}
              />
            </div>
          </div>
        </form>
      </Card>

      {canShowBelongsToMe && (
        <div className="mt-4">
          <Checkbox
            name="belongsToMe"
            label="This ticket belongs to me"
            checked={belongsToMe}
            onChange={(checked) => handleFieldChange("belongsToMe", checked.target.checked)}
          />
        </div>
      )}

      <div className="mt-6">{ChildComponent}</div>
    </div>
  );
};

export default BuyerInformation;
