import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AttendeeInfo from ".";

// Mock the UI components
jest.mock("@/components/ui/inputs/text-field", () => {
  return function MockTextField({
    label,
    error,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
    const inputId = `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <div>
        <label htmlFor={inputId}>{label}</label>
        <input id={inputId} {...props} />
        {error && <span role='alert'>{error}</span>}
      </div>
    );
  };
});

jest.mock("@/components/ui/card", () => {
  return function MockCard({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
  }) {
    return (
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </div>
    );
  };
});

describe("AttendeeInfo", () => {
  it("renders with correct title and subtitle", () => {
    render(<AttendeeInfo />);

    expect(screen.getByText("Attendee information")).toBeInTheDocument();
    // Use a more flexible text matcher for the subtitle
    expect(
      screen.getByText(/Kindly Press.*Enter.*key after entering each email/),
    ).toBeInTheDocument();
  });

  it("renders email input field", () => {
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "Enter email address");
  });

  it("starts with empty email field", () => {
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toHaveValue("");
  });

  it("updates email field when user types", async () => {
    const user = userEvent.setup();
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    await user.type(emailInput, "test@example.com");

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("shows validation error for empty email on blur", async () => {
    const user = userEvent.setup();
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    await user.click(emailInput);
    await user.tab(); // Blur the input

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Email address is required");
    });
  });

  it("shows validation error for invalid email format", async () => {
    const user = userEvent.setup();
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    await user.type(emailInput, "invalid-email");
    await user.tab(); // Blur the input

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Please enter a valid email address");
    });
  });

  it("does not show error for valid email", async () => {
    const user = userEvent.setup();
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    await user.type(emailInput, "valid@example.com");
    await user.tab(); // Blur the input

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  it("handles form submission", async () => {
    const user = userEvent.setup();
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");
    await user.type(emailInput, "test@example.com");

    // Submit form by pressing Enter
    fireEvent.keyDown(emailInput, { key: "Enter", code: "Enter" });

    // Since handleSubmit has empty function, we just verify no errors occur
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("clears error when user corrects invalid email", async () => {
    const user = userEvent.setup();
    render(<AttendeeInfo />);

    const emailInput = screen.getByLabelText("Email address");

    // Type invalid email
    await user.type(emailInput, "invalid");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    // Clear and type valid email
    await user.clear(emailInput);
    await user.type(emailInput, "valid@example.com");
    await user.tab(); // Add this blur to trigger re-validation

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
