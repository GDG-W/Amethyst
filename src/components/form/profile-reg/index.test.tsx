import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProfileRegistration from ".";

describe("ProfileRegistration", () => {
  it("allows user to fill out text fields", async () => {
    const user = userEvent.setup();
    render(<ProfileRegistration />);

    const fullNameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email address");

    // User types in their information
    await user.type(fullNameInput, "John Doe");
    await user.type(emailInput, "john.doe@example.com");

    // Form shows what the user typed
    expect(fullNameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  it("shows user's existing information when provided", () => {
    const existingData = {
      fullName: "Jane Smith",
      email: "jane@company.com",
    };

    render(<ProfileRegistration initialData={existingData} />);

    // User sees their existing information pre-filled
    expect(screen.getByDisplayValue("Jane Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("jane@company.com")).toBeInTheDocument();
  });

  it("prevents user from editing readonly fields", async () => {
    const userData = {
      fullName: "Locked User",
      email: "locked@company.com",
    };

    render(<ProfileRegistration initialData={userData} readonlyFields={["fullName", "email"]} />);

    const fullNameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email address");

    // User cannot edit these fields
    expect(fullNameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();

    // Fields still show the correct values
    expect(fullNameInput).toHaveValue("Locked User");
    expect(emailInput).toHaveValue("locked@company.com");
  });

  it("allows user to edit some fields while others remain readonly", async () => {
    const user = userEvent.setup();
    render(<ProfileRegistration readonlyFields={["fullName"]} />);

    const fullNameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email address");

    // User cannot edit name but can edit email
    expect(fullNameInput).toBeDisabled();
    expect(emailInput).not.toBeDisabled();

    // User can type in the email field
    await user.type(emailInput, "user@example.com");
    expect(emailInput).toHaveValue("user@example.com");
  });

  it("updates form when user provides new initial data", () => {
    const { rerender } = render(<ProfileRegistration />);

    // Initially empty
    expect(screen.getByLabelText("Full Name")).toHaveValue("");
    expect(screen.getByLabelText("Email address")).toHaveValue("");

    // User's data gets loaded
    rerender(
      <ProfileRegistration
        initialData={{
          fullName: "Updated User",
          email: "updated@example.com",
        }}
      />
    );

    // Form now shows the loaded data
    expect(screen.getByDisplayValue("Updated User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("updated@example.com")).toBeInTheDocument();
  });

  it("provides accessible form with proper labels and structure", () => {
    render(<ProfileRegistration />);

    // User can navigate and understand the form structure
    expect(screen.getByText("Register Your Profile")).toBeInTheDocument();

    // Test text input fields that properly support labels
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();

    // For select fields, verify they exist by their label text (not getByLabelText)
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Experience Level")).toBeInTheDocument();

    // Form fields have helpful placeholder text for inputs
    expect(screen.getByPlaceholderText("Enter full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument();

    // Verify select field placeholders exist
    expect(screen.getByText("Select gender")).toBeInTheDocument();
    expect(screen.getByText("Select role")).toBeInTheDocument();
    expect(screen.getByText("Select experience level")).toBeInTheDocument();
  });

  it("handles empty configuration gracefully", async () => {
    const user = userEvent.setup();
    render(<ProfileRegistration readonlyFields={[]} />);

    // All fields should be editable
    const fullNameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email address");

    expect(fullNameInput).not.toBeDisabled();
    expect(emailInput).not.toBeDisabled();

    // User can interact with all fields
    await user.type(fullNameInput, "Free User");
    await user.type(emailInput, "free@example.com");

    expect(fullNameInput).toHaveValue("Free User");
    expect(emailInput).toHaveValue("free@example.com");
  });
});
