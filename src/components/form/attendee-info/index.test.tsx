import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AttendeeInfo from ".";

describe("AttendeeInfo", () => {
  it("renders with title and subtitle", () => {
    render(<AttendeeInfo selectedDates={[]} />);
    expect(screen.getByText("Attendee information")).toBeInTheDocument();
    expect(
      screen.getByText(
        'Kindly Press "Enter" key or comma after entering each email to add it to the list.',
      ),
    ).toBeInTheDocument();
  });

  it("adds email on Enter key", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "test@example.com{Enter}");

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("adds email on comma key", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 16, dayName: "Tuesday", date: "2024-01-16" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "user@test.com,");

    expect(screen.getByText("user@test.com")).toBeInTheDocument();
  });

  it("validates email format and shows error message", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "invalid-email{Enter}");

    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("does not add invalid email to the list", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "invalid-email{Enter}");

    expect(screen.queryByText("invalid-email")).not.toBeInTheDocument();
  });

  it("clears error when valid email is entered", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "invalid{Enter}");
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();

    await userEvent.type(input, "valid@email.com{Enter}");
    expect(screen.queryByText("Please enter a valid email address")).not.toBeInTheDocument();
  });

  it("removes email when close button is clicked", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "remove@test.com{Enter}");
    expect(screen.getByText("remove@test.com")).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);

    expect(screen.queryByText("remove@test.com")).not.toBeInTheDocument();
  });

  it("does not add empty emails", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "{Enter}");

    const emailChips = screen.queryAllByRole("button");
    expect(emailChips).toHaveLength(0);
  });

  it("does not add duplicate emails", async () => {
    render(
      <AttendeeInfo
        selectedDates={[{ id: "1", day: 15, dayName: "Monday", date: "2024-01-15" }]}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "duplicate@test.com{Enter}");
    await userEvent.type(input, "duplicate@test.com{Enter}");

    const duplicateEmails = screen.getAllByText("duplicate@test.com");
    expect(duplicateEmails).toHaveLength(1);
  });
});
