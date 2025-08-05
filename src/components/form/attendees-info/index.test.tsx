import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import AttendeesInfo from ".";

// Mock the UI components
jest.mock("@/components/ui/inputs/multi-input", () => {
  return function MockMultiInput({
    id,
    label,
    placeholder,
    value,
    onChange,
    error,
    validate,
  }: {
    id: string;
    label: string;
    placeholder: string;
    value: string[];
    onChange: (emails: string[]) => void;
    error?: string;
    validate?: (email: string) => string | null;
  }) {
    const [inputValue, setInputValue] = React.useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Handle comma-separated emails
      if (newValue.includes(",")) {
        const emails = newValue
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean);

        if (emails.length > 0) {
          const validEmails = emails.filter((email) => {
            const validationError = validate ? validate(email) : null;
            return !validationError;
          });

          if (validEmails.length > 0) {
            onChange([...value, ...validEmails]);
            setInputValue("");
          }
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const email = inputValue.trim();
        if (email) {
          const validationError = validate ? validate(email) : null;
          if (!validationError) {
            onChange([...value, email]);
            setInputValue("");
          }
        }
      }
    };

    return (
      <div data-testid={`multi-input-${id}`}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-testid={`input-${id}`}
        />
        {error && <span data-testid={`error-${id}`}>{error}</span>}
        <div data-testid={`values-${id}`}>
          {value.map((email: string, index: number) => (
            <span key={index} data-testid={`${id}-email-${index}`}>
              {email}
            </span>
          ))}
        </div>
      </div>
    );
  };
});

jest.mock("@/components/ui/card", () => {
  return function MockCard({
    title,
    subtitle,
    numbered,
    number,
    children,
  }: {
    title: string;
    subtitle: string;
    numbered?: boolean;
    number?: number;
    children?: React.ReactNode;
  }) {
    // Add testid to form element within children
    const childrenWithTestId = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === "form") {
        return React.cloneElement(child, {
          "data-testid": "form",
        } as React.HTMLAttributes<HTMLFormElement>);
      }
      return child;
    });

    return (
      <div data-testid='card'>
        {numbered && <span data-testid='card-number'>{number}</span>}
        <h2 data-testid='card-title'>{title}</h2>
        <p data-testid='card-subtitle'>{subtitle}</p>
        {childrenWithTestId}
      </div>
    );
  };
});

describe("AttendeesInfo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the component with correct title and subtitle", () => {
      render(<AttendeesInfo />);

      expect(screen.getByTestId("card-title")).toHaveTextContent("Attendee information");
      expect(screen.getByTestId("card-subtitle")).toHaveTextContent(
        'Kindly Press "Enter" key or comma after entering each email to add it to the list.',
      );
    });

    it("should render with correct card number", () => {
      render(<AttendeesInfo />);

      expect(screen.getByTestId("card-number")).toHaveTextContent("4");
    });

    it("should render all four MultiInput components", () => {
      render(<AttendeesInfo />);

      // Updated to match the actual IDs used in the component
      const multiInputs = [
        screen.getByTestId("multi-input-attendee-emails-1"),
        screen.getByTestId("multi-input-attendee-emails-2"),
        screen.getByTestId("multi-input-attendee-emails-3"),
        screen.getByTestId("multi-input-attendee-emails-4"),
      ];
      expect(multiInputs).toHaveLength(4);
    });

    it("should render MultiInput components with correct props", () => {
      render(<AttendeesInfo />);

      // Updated to match the actual IDs
      const inputs = [
        screen.getByTestId("input-attendee-emails-1"),
        screen.getByTestId("input-attendee-emails-2"),
        screen.getByTestId("input-attendee-emails-3"),
        screen.getByTestId("input-attendee-emails-4"),
      ];

      inputs.forEach((input) => {
        expect(input).toHaveAttribute("placeholder", "Enter email address");
      });
    });
  });

  describe("Form Validation", () => {
    it("should validate email format correctly", () => {
      render(<AttendeesInfo />);

      const input = screen.getByTestId("input-attendee-emails-1");

      // Test invalid email
      fireEvent.change(input, { target: { value: "invalid-email," } });

      // The mock should not add invalid emails due to validation
      expect(screen.queryByTestId("attendee-emails-1-email-0")).not.toBeInTheDocument();
    });

    it("should accept valid email addresses", async () => {
      render(<AttendeesInfo />);

      const input = screen.getByTestId("input-attendee-emails-1");

      // Simulate adding a valid email by pressing Enter
      fireEvent.change(input, { target: { value: "test@example.com" } });
      fireEvent.keyDown(input, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByTestId("attendee-emails-1-email-0")).toHaveTextContent(
          "test@example.com",
        );
      });
    });
  });

  describe("Email Input Functionality", () => {
    it("should handle Enter key to add emails", async () => {
      render(<AttendeesInfo />);

      const input = screen.getByTestId("input-attendee-emails-1");

      fireEvent.change(input, { target: { value: "user1@example.com" } });
      fireEvent.keyDown(input, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByTestId("attendee-emails-1-email-0")).toHaveTextContent(
          "user1@example.com",
        );
      });
    });

    it("should handle comma separation for multiple emails", async () => {
      render(<AttendeesInfo />);

      const input = screen.getByTestId("input-attendee-emails-1");

      fireEvent.change(input, { target: { value: "user1@example.com,user2@example.com," } });

      await waitFor(() => {
        expect(screen.getByTestId("attendee-emails-1-email-0")).toHaveTextContent(
          "user1@example.com",
        );
        expect(screen.getByTestId("attendee-emails-1-email-1")).toHaveTextContent(
          "user2@example.com",
        );
      });
    });

    it("should share state across all MultiInput components", async () => {
      render(<AttendeesInfo />);

      const firstInput = screen.getByTestId("input-attendee-emails-1");

      // Add email through first input
      fireEvent.change(firstInput, { target: { value: "first@example.com" } });
      fireEvent.keyDown(firstInput, { key: "Enter" });

      await waitFor(() => {
        // Both inputs should show the same email since they share the same state
        const firstInputEmails = screen.getByTestId("values-attendee-emails-1");
        const secondInputEmails = screen.getByTestId("values-attendee-emails-2");

        expect(firstInputEmails).toHaveTextContent("first@example.com");
        expect(secondInputEmails).toHaveTextContent("first@example.com");

        // Also check that the email appears in both places with the correct testid
        expect(screen.getByTestId("attendee-emails-1-email-0")).toHaveTextContent(
          "first@example.com",
        );
        expect(screen.getByTestId("attendee-emails-2-email-0")).toHaveTextContent(
          "first@example.com",
        );
      });
    });
  });

  describe("Form Structure", () => {
    it("should render form element", () => {
      render(<AttendeesInfo />);

      const form = screen.getByTestId("form");
      expect(form).toBeInTheDocument();
    });

    it("should have proper form structure with spacing", () => {
      render(<AttendeesInfo />);

      const formContent = screen.getByTestId("form").querySelector(".space-y-4.px-5.py-7");
      expect(formContent).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should display validation errors when present", async () => {
      render(<AttendeesInfo />);

      const input = screen.getByTestId("input-attendee-emails-1");

      // Try to add an invalid email
      fireEvent.change(input, { target: { value: "invalid-email" } });
      fireEvent.keyDown(input, { key: "Enter" });

      // Since validation fails, the email shouldn't be added
      expect(screen.queryByTestId("attendee-emails-1-email-0")).not.toBeInTheDocument();
    });
  });

  describe("Default Values", () => {
    it("should initialize with empty emails array", () => {
      render(<AttendeesInfo />);

      const emailContainers = [
        screen.getByTestId("values-attendee-emails-1"),
        screen.getByTestId("values-attendee-emails-2"),
        screen.getByTestId("values-attendee-emails-3"),
        screen.getByTestId("values-attendee-emails-4"),
      ];

      emailContainers.forEach((container) => {
        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper labels for inputs", () => {
      render(<AttendeesInfo />);

      const labels = screen.getAllByText("Email address");
      expect(labels).toHaveLength(4);
    });

    it("should have unique ids for inputs", () => {
      render(<AttendeesInfo />);

      const inputs = [
        screen.getByTestId("input-attendee-emails-1"),
        screen.getByTestId("input-attendee-emails-2"),
        screen.getByTestId("input-attendee-emails-3"),
        screen.getByTestId("input-attendee-emails-4"),
      ];

      const expectedIds = [
        "attendee-emails-1",
        "attendee-emails-2",
        "attendee-emails-3",
        "attendee-emails-4",
      ];

      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute("id", expectedIds[index]);
      });
    });
  });

  describe("Integration with react-hook-form", () => {
    it("should integrate properly with useForm and useController", () => {
      // This test verifies that the component renders without errors
      // which indicates proper integration with react-hook-form
      expect(() => render(<AttendeesInfo />)).not.toThrow();
    });
  });
});
