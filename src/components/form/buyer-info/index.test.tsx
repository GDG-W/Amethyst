import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BuyerInformation from ".";

describe("BuyerInformation", () => {
  it("renders with title and form fields", () => {
    render(<BuyerInformation />);
    expect(screen.getByText("Buyer Information")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument();
    expect(screen.getByLabelText("This ticket belongs to me")).toBeInTheDocument();
  });

  it("renders with correct placeholders", () => {
    render(<BuyerInformation />);
    expect(screen.getByPlaceholderText("Enter full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument();
  });

  it("updates full name field on input", async () => {
    render(<BuyerInformation />);
    const fullNameInput = screen.getByPlaceholderText("Enter full name");

    await userEvent.type(fullNameInput, "John Doe");
    expect(fullNameInput).toHaveValue("John Doe");
  });

  it("updates email field on input", async () => {
    render(<BuyerInformation />);
    const emailInput = screen.getByPlaceholderText("Enter email address");

    await userEvent.type(emailInput, "john@example.com");
    expect(emailInput).toHaveValue("john@example.com");
  });

  it("toggles belongsToMe checkbox", async () => {
    render(<BuyerInformation />);
    const checkbox = screen.getByLabelText("This ticket belongs to me");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("shows AttendeeInfo component when belongsToMe is false", () => {
    render(<BuyerInformation />);
    // Look for the "Attendee information" heading from the AttendeeInfo component
    expect(screen.getByText("Attendee information")).toBeInTheDocument();
  });

  it("shows ProfileRegistration component when belongsToMe is true", async () => {
    render(<BuyerInformation />);
    const checkbox = screen.getByLabelText("This ticket belongs to me");

    await userEvent.click(checkbox);

    // When ProfileRegistration is shown, AttendeeInfo should be hidden
    expect(screen.queryByText("Attendee information")).not.toBeInTheDocument();
  });

  it("passes correct data to ProfileRegistration when belongsToMe is true", async () => {
    render(<BuyerInformation />);

    const fullNameInput = screen.getByPlaceholderText("Enter full name");
    const emailInput = screen.getByPlaceholderText("Enter email address");
    const checkbox = screen.getByLabelText("This ticket belongs to me");

    await userEvent.type(fullNameInput, "Jane Smith");
    await userEvent.type(emailInput, "jane@test.com");
    await userEvent.click(checkbox);

    // Verify that ProfileRegistration is rendered and AttendeeInfo is not
    expect(screen.queryByText("Attendee information")).not.toBeInTheDocument();

    // Verify the form values are maintained
    expect(fullNameInput).toHaveValue("Jane Smith");
    expect(emailInput).toHaveValue("jane@test.com");
  });

  it("switches between components when checkbox is toggled", async () => {
    render(<BuyerInformation />);
    const checkbox = screen.getByLabelText("This ticket belongs to me");

    // Initially shows AttendeeInfo (checkbox unchecked)
    expect(screen.getByText("Attendee information")).toBeInTheDocument();

    // Toggle to show ProfileRegistration (AttendeeInfo should be hidden)
    await userEvent.click(checkbox);
    expect(screen.queryByText("Attendee information")).not.toBeInTheDocument();

    // Toggle back to show AttendeeInfo
    await userEvent.click(checkbox);
    expect(screen.getByText("Attendee information")).toBeInTheDocument();
  });

  it("maintains form field values when switching between components", async () => {
    render(<BuyerInformation />);

    const fullNameInput = screen.getByPlaceholderText("Enter full name");
    const emailInput = screen.getByPlaceholderText("Enter email address");
    const checkbox = screen.getByLabelText("This ticket belongs to me");

    // Enter values
    await userEvent.type(fullNameInput, "Test User");
    await userEvent.type(emailInput, "test@user.com");

    // Toggle checkbox multiple times
    await userEvent.click(checkbox);
    await userEvent.click(checkbox);

    // Values should be maintained
    expect(fullNameInput).toHaveValue("Test User");
    expect(emailInput).toHaveValue("test@user.com");
  });
});
