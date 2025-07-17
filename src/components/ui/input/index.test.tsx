import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Input from ".";

describe("Input Component", () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  const baseProps = {
    label: "Email",
    name: "email",
    type: "email" as const,
    placeholder: "Enter your email",
    value: "",
    onChange: mockOnChange,
    onBlur: mockOnBlur,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and input field correctly", () => {
    render(<Input {...baseProps} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("displays helper text when provided", () => {
    render(<Input {...baseProps} helperText='We’ll never share your email.' />);
    expect(screen.getByText("We’ll never share your email.")).toBeInTheDocument();
  });

  it("does not show error message before interaction", () => {
    render(<Input {...baseProps} error={true} errorMessage='Invalid email' />);
    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });

  it("shows error message on blur with invalid input", () => {
    render(<Input {...baseProps} error={true} errorMessage='Invalid email' />);
    const input = screen.getByLabelText("Email");
    fireEvent.blur(input);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies green border when success is true after input", () => {
    render(<Input {...baseProps} value='test@example.com' success={true} />);
    const input = screen.getByLabelText("Email");
    expect(input.className).toMatch(/border-green-500/);
  });

  it("calls onChange and onBlur handlers", () => {
    render(<Input {...baseProps} />);
    const input = screen.getByLabelText("Email");

    fireEvent.change(input, { target: { value: "new@email.com" } });
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("renders error state correctly on blur for empty full name", () => {
    render(
      <Input
        label='Full Name'
        name='fullName'
        type='text'
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error={true}
        errorMessage='Full Name is required'
      />,
    );
    const input = screen.getByLabelText("Full Name");
    fireEvent.blur(input);
    expect(screen.getByText("Full Name is required")).toBeInTheDocument();
  });
});
