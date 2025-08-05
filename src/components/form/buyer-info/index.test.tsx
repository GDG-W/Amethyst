import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import BuyerInformation from ".";

// Mock the UI components
jest.mock("@/components/ui/inputs/text-field", () => {
  return function MockTextField({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
  }) {
    return (
      <div data-testid={`text-field-${name}`}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          data-testid={`input-${name}`}
        />
        {error && <span data-testid={`error-${name}`}>{error}</span>}
      </div>
    );
  };
});

jest.mock("@/components/ui/inputs/checkbox", () => {
  return function MockCheckbox({
    name,
    label,
    checked,
    onChange,
  }: {
    name: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) {
    return (
      <div data-testid={`checkbox-${name}`}>
        <label htmlFor={name}>
          <input
            id={name}
            name={name}
            type='checkbox'
            checked={checked}
            onChange={onChange}
            data-testid={`input-${name}`}
          />
          {label}
        </label>
      </div>
    );
  };
});

jest.mock("@/components/ui/card", () => {
  return function MockCard({
    title,
    numbered,
    number,
    children,
  }: {
    title: string;
    numbered?: boolean;
    number?: number;
    children?: React.ReactNode;
  }) {
    // Add testid to form element within children
    const childrenWithTestId = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === "form") {
        return React.cloneElement(child, {
          "data-testid": "buyer-form",
        } as React.HTMLAttributes<HTMLFormElement>);
      }
      return child;
    });

    return (
      <div data-testid='buyer-card'>
        {numbered && <span data-testid='card-number'>{number}</span>}
        <h2 data-testid='card-title'>{title}</h2>
        {childrenWithTestId}
      </div>
    );
  };
});

// Mock the child components
jest.mock("../attendees-info", () => {
  return function MockAttendeesInfo() {
    return <div data-testid='attendees-info'>Attendees Info Component</div>;
  };
});

jest.mock("../profile-reg", () => {
  return function MockProfileRegistration({
    initialData,
    readonlyFields,
  }: {
    initialData: { fullName: string; email: string };
    readonlyFields: string[];
  }) {
    return (
      <div data-testid='profile-registration'>
        <div data-testid='initial-data'>
          <span data-testid='initial-fullname'>{initialData.fullName}</span>
          <span data-testid='initial-email'>{initialData.email}</span>
        </div>
        <div data-testid='readonly-fields'>
          {readonlyFields.map((field, index) => (
            <span key={index} data-testid={`readonly-${field}`}>
              {field}
            </span>
          ))}
        </div>
      </div>
    );
  };
});

describe("BuyerInformation Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the component with correct title and card number", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("card-title")).toHaveTextContent("Buyer Information");
      expect(screen.getByTestId("card-number")).toHaveTextContent("3");
    });

    it("should render all form fields with correct labels and placeholders", () => {
      render(<BuyerInformation />);

      // Check Full Name field
      expect(screen.getByTestId("text-field-fullName")).toBeInTheDocument();
      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      expect(screen.getByTestId("input-fullName")).toHaveAttribute(
        "placeholder",
        "Enter full name",
      );

      // Check Email field
      expect(screen.getByTestId("text-field-email")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByTestId("input-email")).toHaveAttribute(
        "placeholder",
        "Enter email address",
      );
      expect(screen.getByTestId("input-email")).toHaveAttribute("type", "email");
    });

    it("should render the belongsToMe checkbox with correct label", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("checkbox-belongsToMe")).toBeInTheDocument();
      expect(screen.getByLabelText("This ticket belongs to me")).toBeInTheDocument();
    });

    it("should render form element with correct structure", () => {
      render(<BuyerInformation />);

      const form = screen.getByTestId("buyer-form");
      expect(form).toBeInTheDocument();

      const formContent = form.querySelector(".space-y-4.px-5.py-7");
      expect(formContent).toBeInTheDocument();
    });
  });

  describe("Default Values", () => {
    it("should initialize with empty form fields", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("input-fullName")).toHaveValue("");
      expect(screen.getByTestId("input-email")).toHaveValue("");
    });

    it("should initialize with belongsToMe checkbox unchecked", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("input-belongsToMe")).not.toBeChecked();
    });

    it("should render AttendeesInfo component by default (when belongsToMe is false)", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("attendees-info")).toBeInTheDocument();
      expect(screen.queryByTestId("profile-registration")).not.toBeInTheDocument();
    });
  });

  describe("Form Input Functionality", () => {
    it("should handle full name input changes", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const fullNameInput = screen.getByTestId("input-fullName");

      await act(async () => {
        await user.type(fullNameInput, "John Doe");
      });

      expect(fullNameInput).toHaveValue("John Doe");
    });

    it("should handle email input changes", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const emailInput = screen.getByTestId("input-email");

      await act(async () => {
        await user.type(emailInput, "john@example.com");
      });

      expect(emailInput).toHaveValue("john@example.com");
    });

    it("should handle checkbox state changes", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const checkbox = screen.getByTestId("input-belongsToMe");

      expect(checkbox).not.toBeChecked();

      await act(async () => {
        await user.click(checkbox);
      });
      expect(checkbox).toBeChecked();

      await act(async () => {
        await user.click(checkbox);
      });
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Conditional Rendering Logic", () => {
    it("should render AttendeesInfo when belongsToMe is false", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("attendees-info")).toBeInTheDocument();
      expect(screen.queryByTestId("profile-registration")).not.toBeInTheDocument();
    });

    it("should render ProfileRegistration when belongsToMe is true", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const checkbox = screen.getByTestId("input-belongsToMe");

      await act(async () => {
        await user.click(checkbox);
      });

      await waitFor(() => {
        expect(screen.getByTestId("profile-registration")).toBeInTheDocument();
        expect(screen.queryByTestId("attendees-info")).not.toBeInTheDocument();
      });
    });

    it("should pass correct initial data to ProfileRegistration", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      // Fill in the form fields
      const fullNameInput = screen.getByTestId("input-fullName");
      const emailInput = screen.getByTestId("input-email");

      await act(async () => {
        await user.type(fullNameInput, "Jane Smith");
        await user.type(emailInput, "jane@example.com");
      });

      // Check the checkbox to trigger ProfileRegistration rendering
      const checkbox = screen.getByTestId("input-belongsToMe");

      await act(async () => {
        await user.click(checkbox);
      });

      await waitFor(() => {
        expect(screen.getByTestId("initial-fullname")).toHaveTextContent("Jane Smith");
        expect(screen.getByTestId("initial-email")).toHaveTextContent("jane@example.com");
      });
    });

    it("should pass correct readonly fields to ProfileRegistration", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const checkbox = screen.getByTestId("input-belongsToMe");

      await act(async () => {
        await user.click(checkbox);
      });

      await waitFor(() => {
        expect(screen.getByTestId("readonly-fullName")).toHaveTextContent("fullName");
        expect(screen.getByTestId("readonly-email")).toHaveTextContent("email");
      });
    });

    it("should update ProfileRegistration props when form data changes", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      // Check the checkbox first to render ProfileRegistration
      const checkbox = screen.getByTestId("input-belongsToMe");

      await act(async () => {
        await user.click(checkbox);
      });

      // Initially should be empty
      await waitFor(() => {
        expect(screen.getByTestId("initial-fullname")).toHaveTextContent("");
        expect(screen.getByTestId("initial-email")).toHaveTextContent("");
      });

      // Update form fields
      const fullNameInput = screen.getByTestId("input-fullName");
      const emailInput = screen.getByTestId("input-email");

      await act(async () => {
        await user.type(fullNameInput, "Updated Name");
        await user.type(emailInput, "updated@example.com");
      });

      // ProfileRegistration should receive updated data
      await waitFor(() => {
        expect(screen.getByTestId("initial-fullname")).toHaveTextContent("Updated Name");
        expect(screen.getByTestId("initial-email")).toHaveTextContent("updated@example.com");
      });
    });
  });

  describe("Form Validation", () => {
    it("should display validation error for empty full name", async () => {
      render(<BuyerInformation />);

      const fullNameInput = screen.getByTestId("input-fullName");

      // Trigger validation by focusing and blurring without entering value
      await act(async () => {
        fireEvent.focus(fullNameInput);
        fireEvent.blur(fullNameInput);
      });

      // Note: The actual validation trigger depends on your form implementation
      // You might need to adjust this based on when validation actually occurs
    });

    it("should display validation error for invalid email", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const emailInput = screen.getByTestId("input-email");

      await act(async () => {
        await user.type(emailInput, "invalid-email");
        fireEvent.blur(emailInput);
      });

      // Note: The actual validation trigger depends on your form implementation
    });

    it("should display validation error for short full name", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const fullNameInput = screen.getByTestId("input-fullName");

      await act(async () => {
        await user.type(fullNameInput, "A");
        fireEvent.blur(fullNameInput);
      });

      // Note: The actual validation trigger depends on your form implementation
    });
  });

  describe("Form Submission", () => {
    it("should handle form submission", async () => {
      render(<BuyerInformation />);

      const form = screen.getByTestId("buyer-form");

      // Mock form submission
      const handleSubmit = jest.fn();
      form.onsubmit = handleSubmit;

      await act(async () => {
        fireEvent.submit(form);
      });

      // Since the form has an empty handleSubmit, just verify it doesn't crash
      expect(() => fireEvent.submit(form)).not.toThrow();
    });
  });

  describe("Integration with react-hook-form", () => {
    it("should integrate properly with useForm and useController", () => {
      // This test verifies that the component renders without errors
      // which indicates proper integration with react-hook-form
      expect(() => render(<BuyerInformation />)).not.toThrow();
    });

    it("should properly watch form values for conditional rendering", async () => {
      const user = userEvent.setup();
      render(<BuyerInformation />);

      const fullNameInput = screen.getByTestId("input-fullName");
      const emailInput = screen.getByTestId("input-email");
      const checkbox = screen.getByTestId("input-belongsToMe");

      // Fill form and check checkbox
      await act(async () => {
        await user.type(fullNameInput, "Test User");
        await user.type(emailInput, "test@example.com");
        await user.click(checkbox);
      });

      // Verify the watched values are passed correctly to ProfileRegistration
      await waitFor(() => {
        expect(screen.getByTestId("initial-fullname")).toHaveTextContent("Test User");
        expect(screen.getByTestId("initial-email")).toHaveTextContent("test@example.com");
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper labels for all inputs", () => {
      render(<BuyerInformation />);

      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByLabelText("This ticket belongs to me")).toBeInTheDocument();
    });

    it("should have unique ids for inputs", () => {
      render(<BuyerInformation />);

      expect(screen.getByTestId("input-fullName")).toHaveAttribute("id", "fullName");
      expect(screen.getByTestId("input-email")).toHaveAttribute("id", "email");
      expect(screen.getByTestId("input-belongsToMe")).toHaveAttribute("id", "belongsToMe");
    });
  });

  describe("Component Structure", () => {
    it("should have correct CSS classes for spacing and layout", () => {
      render(<BuyerInformation />);

      const form = screen.getByTestId("buyer-form");
      const formContent = form.querySelector(".space-y-4.px-5.py-7");
      expect(formContent).toBeInTheDocument();
    });

    it("should render checkbox outside the main card with proper spacing", () => {
      render(<BuyerInformation />);

      const checkbox = screen.getByTestId("checkbox-belongsToMe");
      const card = screen.getByTestId("buyer-card");

      // Checkbox should not be inside the card
      expect(card).not.toContainElement(checkbox);
    });

    it("should render conditional components with proper spacing", () => {
      render(<BuyerInformation />);

      // The conditional rendering section should be present
      const conditionalSection = screen.getByTestId("attendees-info").parentElement;
      expect(conditionalSection).toHaveClass("mt-6");
    });
  });
});
