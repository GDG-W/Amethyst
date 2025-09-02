"use client";
import React, { useMemo, useState } from "react";

import { CloseIcon } from "@/components/icons/close-icon";

import Card from "../card";
import Button from "../button";
import TextFieldUpdated from "../inputs";
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
                <TextFieldUpdated
                  actionDisabled={true}
                  placeholder="Add discount code"
                  onChange={() => {}}
                  actionLabel="Apply"
                  onAction={() => {}}
                />
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
