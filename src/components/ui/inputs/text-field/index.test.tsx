import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import TextField from ".";

describe("TextField", () => {
  const defaultProps = {
    id: "test-input",
    label: "Test Label",
    placeholder: "Test placeholder",
    type: "text",
    value: "",
    onChange: jest.fn(),
  };

  it("renders the input with label", () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders the extra label when provided", () => {
    render(<TextField {...defaultProps} extraLabel='(optional)' />);
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("calls onChange when typing in the input", () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByLabelText("Test Label");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("shows error message when error is passed", () => {
    render(<TextField {...defaultProps} error='This field is required' />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows helperText when no error is passed", () => {
    render(<TextField {...defaultProps} helperText='Helpful tip' />);
    expect(screen.getByText("Helpful tip")).toBeInTheDocument();
  });

  it("disables the input when disabled is true", () => {
    render(<TextField {...defaultProps} disabled />);
    expect(screen.getByTestId("test-input")).toBeDisabled();
  });

  it("applies error styles when error is present", () => {
    render(<TextField {...defaultProps} error='Invalid input' />);
    const input = screen.getByLabelText("Test Label");
    expect(input.className).toMatch(/border-red-500/);
  });

  it("renders no helper or error message if neither is provided", () => {
    render(<TextField {...defaultProps} />);
    expect(screen.queryByText("Helpful tip")).not.toBeInTheDocument();
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });
});
