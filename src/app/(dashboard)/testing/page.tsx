"use client";
import React from "react";

import OrderSummary from "@/components/ui/order-summary";

const page = () => {
  return (
    <div>
      <OrderSummary
        items={[
          { name: "Thursday (Pro) ", price: 200 },
          { name: "Thursday (Pro) ", price: 200 },
        ]}
        handleButtonClick={() => {}}
        currentStep={2}
        noOfSteps={3}
      />
    </div>
  );
};

export default page;
