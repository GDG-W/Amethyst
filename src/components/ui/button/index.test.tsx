import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from ".";

describe("Button Component", () => {
  it("renders the button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the secondary variant class", () => {
    render(<Button variant='secondary'>Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-away-base");
  });
  it("applies the primary variant class", () => {
    render(<Button variant='primary'>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-away-base");
  });
  it("applies the link variant class", () => {
    render(<Button variant='link'>Link</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent");
  });

  it("disables the button when disabled is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows spinner when loading is true", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toContainElement(button.querySelector("span"));
    expect(button.querySelector("span")).toHaveClass("animate-spin");
  });
  it("does not call onClick when loading", () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading...
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies the full size class by default", () => {
    render(<Button>Full</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  it("applies the fit size class when specified", () => {
    render(<Button size='fit'>Fit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-fit");
  });
});
