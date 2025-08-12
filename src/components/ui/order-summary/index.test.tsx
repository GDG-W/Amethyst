import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import OrderSummary from ".";

describe("OrderSummary Component", () => {
  const mockHandleButtonClick = jest.fn();

  const sampleItems = [
    { name: "2 x Thursday (Standard ticket)", price: 30000 },
    { name: "3 x Friday", price: 15000 },
  ];

  it("shows message when no items are passed", () => {
    render(
      <OrderSummary
        items={[]}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />,
    );
    expect(screen.getByText(/Select your ticket/i)).toBeInTheDocument();
  });

  it("displays each item and correct total", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />,
    );

    expect(screen.getByText("2 x Thursday (Standard ticket)")).toBeInTheDocument();
    expect(screen.getByText("3 x Friday")).toBeInTheDocument();

    expect(screen.getByText("₦30000")).toBeInTheDocument();
    expect(screen.getByText("₦15000")).toBeInTheDocument();

    expect(screen.getByText("₦45000")).toBeInTheDocument();
  });

  it("calls handleButtonClick when button is clicked", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />,
    );

    const button = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(button);

    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when no items", () => {
    render(
      <OrderSummary
        items={[]}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows Proceed to Pay on final step", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={3}
        noOfSteps={3}
      />,
    );

    expect(screen.getByText(/Proceed to Pay/i)).toBeInTheDocument();
  });
});
