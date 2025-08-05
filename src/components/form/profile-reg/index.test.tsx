import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import ProfileRegistration from ".";

// Mock the UI components
jest.mock("@/components/ui/inputs/text-field", () => {
  return function MockTextField({
    id,
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    disabled,
  }: {
    id: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
  }) {
    return (
      <div data-testid={`text-field-${name}`}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          data-testid={`input-${name}`}
        />
        {error && <span data-testid={`error-${name}`}>{error}</span>}
      </div>
    );
  };
});

jest.mock("@/components/ui/inputs/select", () => {
  return function MockSelectField({
    id,
    label,
    options,
    placeholder,
    value,
    onChange,
    error,
  }: {
    id: string;
    label: string;
    options: Array<{ value: string; label: string }>;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
  }) {
    return (
      <div data-testid={`select-field-${id}`}>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={`select-${id}`}
        >
          <option value=''>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span data-testid={`error-${id}`}>{error}</span>}
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
          "data-testid": "profile-form",
        } as React.HTMLAttributes<HTMLFormElement>);
      }
      return child;
    });

    return (
      <div data-testid='profile-card'>
        {numbered && <span data-testid='card-number'>{number}</span>}
        <h2 data-testid='card-title'>{title}</h2>
        {childrenWithTestId}
      </div>
    );
  };
});

describe("ProfileRegistration Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the component with correct title and card number", () => {
      render(<ProfileRegistration />);

      expect(screen.getByTestId("card-title")).toHaveTextContent("Register Your Profile");
      expect(screen.getByTestId("card-number")).toHaveTextContent("4");
    });

    it("should render all form fields with correct labels and placeholders", () => {
      render(<ProfileRegistration />);

      // Text fields
      expect(screen.getByTestId("text-field-fullName")).toBeInTheDocument();
      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      expect(screen.getByTestId("input-fullName")).toHaveAttribute(
        "placeholder",
        "Enter full name",
      );

      expect(screen.getByTestId("text-field-email")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByTestId("input-email")).toHaveAttribute(
        "placeholder",
        "Enter email address",
      );
      expect(screen.getByTestId("input-email")).toHaveAttribute("type", "email");

      // Select fields
      expect(screen.getByTestId("select-field-gender")).toBeInTheDocument();
      expect(screen.getByLabelText("Gender")).toBeInTheDocument();

      expect(screen.getByTestId("select-field-role")).toBeInTheDocument();
      expect(screen.getByLabelText("Role")).toBeInTheDocument();

      expect(screen.getByTestId("select-field-experienceLevel")).toBeInTheDocument();
      expect(screen.getByLabelText("Experience Level")).toBeInTheDocument();
    });

    it("should render form element with correct structure", () => {
      render(<ProfileRegistration />);

      const form = screen.getByTestId("profile-form");
      expect(form).toBeInTheDocument();

      const formContent = form.querySelector(".space-y-4.px-5.py-7");
      expect(formContent).toBeInTheDocument();
    });
  });

  describe("Default Values", () => {
    it("should initialize with empty form fields", () => {
      render(<ProfileRegistration />);

      expect(screen.getByTestId("input-fullName")).toHaveValue("");
      expect(screen.getByTestId("input-email")).toHaveValue("");
      expect(screen.getByTestId("select-gender")).toHaveValue("");
      expect(screen.getByTestId("select-role")).toHaveValue("");
      expect(screen.getByTestId("select-experienceLevel")).toHaveValue("");
    });

    it("should populate fields with initialData when provided", async () => {
      const initialData = {
        fullName: "John Doe",
        email: "john@example.com",
      };

      render(<ProfileRegistration initialData={initialData} />);

      // Wait for useEffect to run and update the form
      await waitFor(() => {
        expect(screen.getByTestId("input-fullName")).toHaveValue("John Doe");
        expect(screen.getByTestId("input-email")).toHaveValue("john@example.com");
      });
    });

    it("should update fields when initialData changes", async () => {
      const initialData1 = {
        fullName: "John Doe",
        email: "john@example.com",
      };

      const { rerender } = render(<ProfileRegistration initialData={initialData1} />);

      await waitFor(() => {
        expect(screen.getByTestId("input-fullName")).toHaveValue("John Doe");
        expect(screen.getByTestId("input-email")).toHaveValue("john@example.com");
      });

      const initialData2 = {
        fullName: "Jane Smith",
        email: "jane@example.com",
      };

      rerender(<ProfileRegistration initialData={initialData2} />);

      await waitFor(() => {
        expect(screen.getByTestId("input-fullName")).toHaveValue("Jane Smith");
        expect(screen.getByTestId("input-email")).toHaveValue("jane@example.com");
      });
    });
  });

  describe("Form Input Functionality", () => {
    it("should handle text field input changes", async () => {
      const user = userEvent.setup();
      render(<ProfileRegistration />);

      const fullNameInput = screen.getByTestId("input-fullName");
      const emailInput = screen.getByTestId("input-email");

      await act(async () => {
        await user.type(fullNameInput, "John Doe");
        await user.type(emailInput, "john@example.com");
      });

      expect(fullNameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("john@example.com");
    });

    it("should handle select field changes", async () => {
      const user = userEvent.setup();
      render(<ProfileRegistration />);

      const genderSelect = screen.getByTestId("select-gender");
      const roleSelect = screen.getByTestId("select-role");
      const experienceSelect = screen.getByTestId("select-experienceLevel");

      await act(async () => {
        await user.selectOptions(genderSelect, "male");
        await user.selectOptions(roleSelect, "developer");
        await user.selectOptions(experienceSelect, "intermediate");
      });

      expect(genderSelect).toHaveValue("male");
      expect(roleSelect).toHaveValue("developer");
      expect(experienceSelect).toHaveValue("intermediate");
    });
  });

  describe("Select Field Options", () => {
    it("should render gender options correctly", () => {
      render(<ProfileRegistration />);

      const genderSelect = screen.getByTestId("select-gender");
      const options = genderSelect.querySelectorAll("option");

      expect(options).toHaveLength(5); // placeholder + 4 options
      expect(options[0]).toHaveTextContent("Select gender");
      expect(options[1]).toHaveTextContent("Male");
      expect(options[2]).toHaveTextContent("Female");
      expect(options[3]).toHaveTextContent("Non-binary");
      expect(options[4]).toHaveTextContent("Prefer not to say");
    });

    it("should render role options correctly", () => {
      render(<ProfileRegistration />);

      const roleSelect = screen.getByTestId("select-role");
      const options = roleSelect.querySelectorAll("option");

      expect(options).toHaveLength(11); // placeholder + 10 options
      expect(options[0]).toHaveTextContent("Select role");
      expect(options[1]).toHaveTextContent("Developer");
      expect(options[2]).toHaveTextContent("Designer");
      expect(options[3]).toHaveTextContent("Product Manager");
      // ... other options
    });

    it("should render experience level options correctly", () => {
      render(<ProfileRegistration />);

      const experienceSelect = screen.getByTestId("select-experienceLevel");
      const options = experienceSelect.querySelectorAll("option");

      expect(options).toHaveLength(4); // placeholder + 3 options
      expect(options[0]).toHaveTextContent("Select experience level");
      expect(options[1]).toHaveTextContent("Beginner - 0-1 year experience, just starting out");
      expect(options[2]).toHaveTextContent(
        "Mid-level - 1-4 years experience, comfortable with most tools",
      );
      expect(options[3]).toHaveTextContent(
        "Senior - 4+ years, possibly leading projects or mentoring others",
      );
    });
  });

  describe("Readonly Fields Functionality", () => {
    it("should disable specified readonly fields", () => {
      const readonlyFields = ["fullName", "email"];
      render(<ProfileRegistration readonlyFields={readonlyFields} />);

      expect(screen.getByTestId("input-fullName")).toBeDisabled();
      expect(screen.getByTestId("input-email")).toBeDisabled();
      expect(screen.getByTestId("select-gender")).not.toBeDisabled();
      expect(screen.getByTestId("select-role")).not.toBeDisabled();
      expect(screen.getByTestId("select-experienceLevel")).not.toBeDisabled();
    });

    it("should prevent changes to readonly text fields", async () => {
      const user = userEvent.setup();
      const initialData = { fullName: "John Doe", email: "john@example.com" };
      const readonlyFields = ["fullName"];

      render(<ProfileRegistration initialData={initialData} readonlyFields={readonlyFields} />);

      await waitFor(() => {
        expect(screen.getByTestId("input-fullName")).toHaveValue("John Doe");
      });

      const fullNameInput = screen.getByTestId("input-fullName");

      // Try to type in the readonly field - it should not change
      await act(async () => {
        await user.type(fullNameInput, "Changed Name");
      });

      // Value should remain the same since it's readonly
      expect(fullNameInput).toHaveValue("John Doe");
    });

    it("should allow changes to non-readonly fields when some fields are readonly", async () => {
      const user = userEvent.setup();
      const readonlyFields = ["fullName"];

      render(<ProfileRegistration readonlyFields={readonlyFields} />);

      const emailInput = screen.getByTestId("input-email");

      await act(async () => {
        await user.type(emailInput, "test@example.com");
      });

      expect(emailInput).toHaveValue("test@example.com");
    });
  });

  describe("Form Validation", () => {
    it("should show validation errors on form submission when fields are empty", async () => {
      render(<ProfileRegistration />);

      const form = screen.getByTestId("profile-form");

      await act(async () => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(screen.getByTestId("error-fullName")).toHaveTextContent("Full name is required");
        expect(screen.getByTestId("error-email")).toHaveTextContent("Email address is required");
        expect(screen.getByTestId("error-gender")).toHaveTextContent("Gender is required");
        expect(screen.getByTestId("error-role")).toHaveTextContent("Role is required");
        expect(screen.getByTestId("error-experienceLevel")).toHaveTextContent(
          "Experience level is required",
        );
      });
    });

    it("should show validation error for short full name on form submission", async () => {
      const user = userEvent.setup();
      render(<ProfileRegistration />);

      const fullNameInput = screen.getByTestId("input-fullName");
      const form = screen.getByTestId("profile-form");

      await act(async () => {
        await user.type(fullNameInput, "A");
      });

      await act(async () => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(screen.getByTestId("error-fullName")).toHaveTextContent(
          "Full name must be at least 2 characters",
        );
      });
    });

    it("should show validation error for invalid email on form submission", async () => {
      const user = userEvent.setup();
      render(<ProfileRegistration />);

      const emailInput = screen.getByTestId("input-email");
      const form = screen.getByTestId("profile-form");

      await act(async () => {
        await user.type(emailInput, "invalid-email");
      });

      await act(async () => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(screen.getByTestId("error-email")).toHaveTextContent(
          "Please enter a valid email address",
        );
      });
    });

    it("should not show validation errors when all fields are valid", async () => {
      const user = userEvent.setup();
      render(<ProfileRegistration />);

      // Fill all required fields with valid data
      await act(async () => {
        await user.type(screen.getByTestId("input-fullName"), "John Doe");
        await user.type(screen.getByTestId("input-email"), "john@example.com");
        await user.selectOptions(screen.getByTestId("select-gender"), "male");
        await user.selectOptions(screen.getByTestId("select-role"), "developer");
        await user.selectOptions(screen.getByTestId("select-experienceLevel"), "intermediate");
      });

      const form = screen.getByTestId("profile-form");

      await act(async () => {
        fireEvent.submit(form);
      });

      // Should not have any error messages
      expect(screen.queryByTestId("error-fullName")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-email")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-gender")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-role")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-experienceLevel")).not.toBeInTheDocument();
    });

    it("should show validation errors for empty select fields on form submission", async () => {
      render(<ProfileRegistration />);

      // Try to submit form to trigger validation
      const form = screen.getByTestId("profile-form");

      await act(async () => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(screen.getByTestId("error-gender")).toHaveTextContent("Gender is required");
        expect(screen.getByTestId("error-role")).toHaveTextContent("Role is required");
        expect(screen.getByTestId("error-experienceLevel")).toHaveTextContent(
          "Experience level is required",
        );
      });
    });
  });

  describe("Form Submission", () => {
    it("should handle form submission without errors when all fields are valid", async () => {
      const user = userEvent.setup();
      render(<ProfileRegistration />);

      // Fill all required fields
      await act(async () => {
        await user.type(screen.getByTestId("input-fullName"), "John Doe");
        await user.type(screen.getByTestId("input-email"), "john@example.com");
        await user.selectOptions(screen.getByTestId("select-gender"), "male");
        await user.selectOptions(screen.getByTestId("select-role"), "developer");
        await user.selectOptions(screen.getByTestId("select-experienceLevel"), "intermediate");
      });

      const form = screen.getByTestId("profile-form");

      await act(async () => {
        fireEvent.submit(form);
      });

      // Should not throw any errors and no validation errors should appear
      expect(() => fireEvent.submit(form)).not.toThrow();
      expect(screen.queryByTestId("error-fullName")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-email")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-gender")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-role")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-experienceLevel")).not.toBeInTheDocument();
    });

    it("should show validation errors when trying to submit with invalid data", async () => {
      render(<ProfileRegistration />);

      const form = screen.getByTestId("profile-form");

      await act(async () => {
        fireEvent.submit(form);
      });

      // Validation errors should be shown
      await waitFor(() => {
        expect(screen.getByTestId("error-fullName")).toBeInTheDocument();
        expect(screen.getByTestId("error-email")).toBeInTheDocument();
        expect(screen.getByTestId("error-gender")).toBeInTheDocument();
        expect(screen.getByTestId("error-role")).toBeInTheDocument();
        expect(screen.getByTestId("error-experienceLevel")).toBeInTheDocument();
      });
    });
  });

  describe("Integration with react-hook-form", () => {
    it("should integrate properly with useForm and useController", () => {
      expect(() => render(<ProfileRegistration />)).not.toThrow();
    });

    it("should properly handle form state with initial data", async () => {
      const initialData = {
        fullName: "Test User",
        email: "test@example.com",
      };

      render(<ProfileRegistration initialData={initialData} />);

      await waitFor(() => {
        expect(screen.getByTestId("input-fullName")).toHaveValue("Test User");
        expect(screen.getByTestId("input-email")).toHaveValue("test@example.com");
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper labels for all inputs", () => {
      render(<ProfileRegistration />);

      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByLabelText("Gender")).toBeInTheDocument();
      expect(screen.getByLabelText("Role")).toBeInTheDocument();
      expect(screen.getByLabelText("Experience Level")).toBeInTheDocument();
    });

    it("should have unique ids for all inputs", () => {
      render(<ProfileRegistration />);

      expect(screen.getByTestId("input-fullName")).toHaveAttribute("id", "fullName");
      expect(screen.getByTestId("input-email")).toHaveAttribute("id", "email");
      expect(screen.getByTestId("select-gender")).toHaveAttribute("id", "gender");
      expect(screen.getByTestId("select-role")).toHaveAttribute("id", "role");
      expect(screen.getByTestId("select-experienceLevel")).toHaveAttribute("id", "experienceLevel");
    });
  });

  describe("Component Structure", () => {
    it("should have correct CSS classes for spacing and layout", () => {
      render(<ProfileRegistration />);

      const form = screen.getByTestId("profile-form");
      const formContent = form.querySelector(".space-y-4.px-5.py-7");
      expect(formContent).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined initialData gracefully", () => {
      expect(() => render(<ProfileRegistration initialData={undefined} />)).not.toThrow();
    });

    it("should handle empty readonlyFields array", () => {
      expect(() => render(<ProfileRegistration readonlyFields={[]} />)).not.toThrow();
    });

    it("should handle readonlyFields with invalid field names", () => {
      const readonlyFields = ["invalidField", "anotherInvalidField"];
      expect(() => render(<ProfileRegistration readonlyFields={readonlyFields} />)).not.toThrow();
    });
  });
});
