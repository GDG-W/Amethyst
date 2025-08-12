import { render, screen, fireEvent } from "@testing-library/react";

import Checkbox from "./index";

describe("Checkbox", () => {
  const defaultProps = {
    name: "test-checkbox",
    checked: false,
    onChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with label", () => {
    render(<Checkbox {...defaultProps} label="Accept terms" />);

    const label = screen.getByText("Accept terms");
    const input = screen.getByRole("checkbox");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it("renders without label", () => {
    render(<Checkbox {...defaultProps} />);

    const input = screen.getByRole("checkbox");

    expect(input).toBeInTheDocument();
    // Should not find any span with label text
    expect(screen.queryByText("Accept terms")).not.toBeInTheDocument();
  });

  it("calls onChange when clicked", () => {
    render(<Checkbox {...defaultProps} />);

    const input = screen.getByRole("checkbox");
    fireEvent.click(input);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("renders as checked when checked=true", () => {
    render(<Checkbox {...defaultProps} checked={true} />);

    const input = screen.getByRole("checkbox");
    expect(input).toBeChecked();
  });

  it("renders as unchecked when checked=false", () => {
    render(<Checkbox {...defaultProps} checked={false} />);

    const input = screen.getByRole("checkbox");
    expect(input).not.toBeChecked();
  });
});
