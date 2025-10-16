import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useBuyFormStore } from "@/store/buy-form-store";

import OrderSummary from ".";

jest.mock("@/store/buy-form-store");

const mockedUseBuyFormStore = useBuyFormStore as unknown as jest.Mock;

describe("OrderSummary Component", () => {
  const mockHandleButtonClick = jest.fn();
  const sampleItems = [
    { name: "2 x Thursday (Standard ticket)", price: 30000 },
    { name: "3 x Friday", price: 15000 },
  ];

  beforeEach(() => {
    mockedUseBuyFormStore.mockClear();
    mockHandleButtonClick.mockClear();

    mockedUseBuyFormStore.mockReturnValue({
      discountCode: "",
      discountError: null,
      setDiscountCode: jest.fn(),
      setDiscountError: jest.fn(),
    });
  });

  it("shows message when no items are passed", () => {
    render(
      <OrderSummary
        items={[]}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />
    );
    expect(screen.getByText("Select your ticket date(s) to see order summary")).toBeInTheDocument();
  });

  it("displays each item and correct total", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />
    );

    expect(screen.getByText("2 x Thursday (Standard ticket)")).toBeInTheDocument();
    expect(screen.getByText("3 x Friday")).toBeInTheDocument();
    expect(screen.getByText("₦45000")).toBeInTheDocument(); // Total
  });

  it("calls handleButtonClick when button is clicked", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
      />
    );

    const button = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(button);
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when the disabled prop is true", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={1}
        noOfSteps={3}
        disabled={true} // Set disabled prop
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows 'Proceed to Pay' on final step", () => {
    render(
      <OrderSummary
        items={sampleItems}
        handleButtonClick={mockHandleButtonClick}
        currentStep={3}
        noOfSteps={3}
      />
    );

    expect(screen.getByRole("button", { name: /Proceed to Pay/i })).toBeInTheDocument();
  });

  describe("Discount Code Functionality", () => {
    it("toggles the discount code input field on click", () => {
      render(
        <OrderSummary
          items={sampleItems}
          handleButtonClick={mockHandleButtonClick}
          currentStep={1}
          noOfSteps={3}
        />
      );

      expect(screen.queryByPlaceholderText(/Add discount code/i)).not.toBeInTheDocument();

      const addDiscountLink = screen.getByText(/Add discount code/i);
      fireEvent.click(addDiscountLink);
      expect(screen.getByPlaceholderText(/Add discount code/i)).toBeInTheDocument();

      const closeIcon = screen.getByTestId("close-icon");
      fireEvent.click(closeIcon);
      expect(screen.queryByPlaceholderText(/Add discount code/i)).not.toBeInTheDocument();
    });

    it("calls setDiscountCode on input change and shows validation error for invalid code", () => {
      const setDiscountCode = jest.fn();
      const setDiscountError = jest.fn();
      mockedUseBuyFormStore.mockReturnValue({
        discountCode: "",
        discountError: "Discount code must be 6 characters long",
        setDiscountCode,
        setDiscountError,
      });

      render(
        <OrderSummary
          items={sampleItems}
          handleButtonClick={mockHandleButtonClick}
          currentStep={1}
          noOfSteps={3}
        />
      );

      fireEvent.click(screen.getByText(/Add discount code/i));
      const input = screen.getByPlaceholderText(/Add discount code/i);

      fireEvent.change(input, { target: { value: "123" } });

      expect(setDiscountCode).toHaveBeenCalledWith("123");

      expect(screen.getByText("Discount code must be 6 characters long")).toBeInTheDocument();
    });

    it("clears the error for a valid code", () => {
      const setDiscountCode = jest.fn();
      const setDiscountError = jest.fn();
      mockedUseBuyFormStore.mockReturnValue({
        discountCode: "123456",
        discountError: null,
        setDiscountCode,
        setDiscountError,
      });

      render(
        <OrderSummary
          items={sampleItems}
          handleButtonClick={mockHandleButtonClick}
          currentStep={1}
          noOfSteps={3}
        />
      );

      fireEvent.click(screen.getByText(/Add discount code/i));
      const input = screen.getByPlaceholderText(/Add discount code/i);

      fireEvent.change(input, { target: { value: "123456" } });

      expect(screen.queryByText(/Discount code must be/i)).not.toBeInTheDocument();
    });
  });
});
