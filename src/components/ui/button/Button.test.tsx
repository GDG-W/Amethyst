import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

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

  it("applies the correct variant class", () => {
    render(<Button variant='secondary'>Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-away-base");
  });

  it("applies the correct size class", () => {
    render(<Button size='large'>Large</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/sm:w-40/);
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
    expect(button).toContainElement(button.querySelector("span")); // spinner is present
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
});
