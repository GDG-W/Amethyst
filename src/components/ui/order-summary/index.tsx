"use client";

import React, { useMemo, useState } from "react";

import z from "zod";

import { CloseIcon } from "@/components/icons/close-icon";

import { useBuyFormStore } from "@/store/buy-form-store";

import Button from "../button";
import Card from "../card";
import TextField from "../inputs/text-field";

type OrderItemsType = {
  name: string;
  price: number;
};

interface OrderSummaryInterface {
  items: OrderItemsType[];
  handleButtonClick: () => void;
  currentStep: number;
  noOfSteps: number;
  loading?: boolean;
  disabled?: boolean;
}
function calculateTotal(listItems: OrderItemsType[]) {
  return listItems.reduce((total: number, item: OrderItemsType) => total + item.price, 0);
}
const OrderSummary = ({
  items,
  handleButtonClick,
  currentStep,
  noOfSteps,
  disabled,
  loading,
}: OrderSummaryInterface) => {
  const [applyDiscount, setApplyDiscount] = useState(false);
  const total = useMemo(() => calculateTotal(items), [items]);
  const { setDiscountCode, setDiscountError, discountCode, discountError } = useBuyFormStore();

  const handleFieldChange = (field: string, value: string) => {
    setDiscountCode(value);
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    if (!value) {
      setDiscountError(null);
      return;
    }
    const schema = z.object({
      discountCode: z.string(),
    });
    const result = schema.safeParse({ [field]: value });

    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === field);
      setDiscountError(issue ? issue.message : null);
    } else {
      setDiscountError(null);
    }
  };

  return (
    <Card title="Order Summary">
      <div className="flex h-full min-h-70 flex-col justify-between gap-2 p-4">
        {items.length < 1 ? (
          <p className="text-sm">Select your ticket date(s) to see order summary</p>
        ) : (
          <ul className="mb-4">
            {items.map((item, index) => {
              return (
                <li
                  key={`${item.name}-${item.price}-${index}`}
                  className="mb-3 flex items-center justify-between gap-3"
                >
                  <p className="text-sub-600 font-medium tracking-tight">{item.name}</p>
                  <p className="label-3 font-medium tracking-tight text-black">
                    &#8358;{item.price}
                  </p>
                </li>
              );
            })}

            <hr className="border-soft-200 mt-4 h-0 border-t border-dashed" />
            <li className="text-away-base mt-5 flex cursor-pointer items-center justify-between gap-3 font-medium tracking-tight underline underline-offset-4">
              <span onClick={() => setApplyDiscount(true)}>Add discount code</span>
              {applyDiscount && (
                <span onClick={() => setApplyDiscount(false)}>
                  <CloseIcon />
                </span>
              )}
            </li>
            <li className="my-5">
              {applyDiscount && (
                <div className="flex">
                  <TextField
                    value={discountCode ?? ""}
                    name="discountCode"
                    placeholder="Add discount code"
                    onChange={(e) => handleFieldChange("discountCode", e.target.value)}
                    onBlur={(e) => validateField("discountCode", e.target.value)}
                    error={discountError}
                    actionLabel="Apply"
                  />
                </div>
              )}
            </li>

            <hr className="border-soft-200 mb-4 h-0 border-t border-dashed" />
            <li className="flex items-center justify-between gap-3">
              <p className="text-sub-600 text-sm font-medium">Total</p>
              <p className="label-3 text-sm font-medium text-black">&#8358;{total}</p>
            </li>
          </ul>
        )}
        <Button disabled={disabled} onClick={handleButtonClick} loading={loading}>
          {currentStep >= noOfSteps ? "Proceed to Pay" : "Continue"}
        </Button>
      </div>
    </Card>
  );
};

export default OrderSummary;
