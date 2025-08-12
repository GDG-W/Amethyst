import React, { act } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MultiInput from ".";

describe("MultiInput", () => {
  const mockOnChange = jest.fn();
  const mockValidate = jest.fn();
  const defaultProps = {
    id: "multi-input",
    label: "Tags",
    value: [],
    onChange: mockOnChange,
    placeholder: "Select options",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with label and placeholder", () => {
    render(<MultiInput {...defaultProps} extraLabel="(optional)" />);
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("(optional)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select options")).toBeInTheDocument();
  });

  it("adds items on Enter key", async () => {
    render(<MultiInput {...defaultProps} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "tag1{Enter}");
    expect(mockOnChange).toHaveBeenCalledWith(["tag1"]);
  });

  it("adds items on comma key", async () => {
    render(<MultiInput {...defaultProps} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "tag1,");
    expect(mockOnChange).toHaveBeenCalledWith(["tag1"]);
  });

  it("does not add empty items", async () => {
    render(<MultiInput {...defaultProps} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "{Enter}");
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("does not add duplicate items", async () => {
    render(<MultiInput {...defaultProps} value={["tag1"]} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "tag1{Enter}");
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("removes items when close button is clicked", async () => {
    const { container } = render(<MultiInput {...defaultProps} value={["tag1", "tag2"]} />);

    const closeButtons = container.querySelectorAll("button");
    await userEvent.click(closeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith(["tag2"]);
  });

  it("shows error message when validation fails", async () => {
    mockValidate.mockReturnValue("Invalid tag");
    render(<MultiInput {...defaultProps} validate={mockValidate} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "invalid{Enter}");
    expect(screen.getByText("Invalid tag")).toBeInTheDocument();
  });

  it("clears error when valid input is entered", async () => {
    mockValidate.mockImplementation((value) => (value === "invalid" ? "Invalid tag" : undefined));

    const { rerender } = render(<MultiInput {...defaultProps} validate={mockValidate} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "invalid{Enter}");
    expect(screen.getByText("Invalid tag")).toBeInTheDocument();

    mockOnChange.mockImplementation((newValue) => {
      rerender(<MultiInput {...defaultProps} value={newValue} validate={mockValidate} />);
    });

    await userEvent.type(input, "valid{Enter}");
    expect(screen.queryByText("Invalid tag")).not.toBeInTheDocument();
  });

  it("handles paste with multiple values", async () => {
    const onChange = jest.fn();
    render(<MultiInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText("Select options");

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => "a@b.com, c@d.com",
      },
    });

    expect(onChange).toHaveBeenCalledWith(["a@b.com", "c@d.com"]);
  });

  it("focuses input when clicked", async () => {
    render(<MultiInput {...defaultProps} />);
    const input = screen.getByRole("textbox");

    await act(async () => {
      await userEvent.click(input);
    });

    expect(input).toHaveFocus();
  });

  it("shows existing items as chips", () => {
    render(<MultiInput {...defaultProps} value={["tag1", "tag2"]} />);

    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });
});
