import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Card from ".";

describe("Card", () => {
  it("renders children content", () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    const { container } = render(<Card>Content</Card>);
    const cardElement = container.firstChild;

    expect(cardElement).toHaveClass("bg-bg-strong-950");
    expect(cardElement).toHaveClass("border");
    expect(cardElement).toHaveClass("border-bg-surface-800");
    expect(cardElement).toHaveClass("rounded-lg");
    expect(cardElement).toHaveClass("p-4");
    expect(cardElement).toHaveClass("w-full");
    expect(cardElement).toHaveClass("max-w-sm");
    expect(cardElement).toHaveClass("sm:max-w-md");
    expect(cardElement).toHaveClass("md:max-w-lg");
  });

  it("applies custom className", () => {
    const { container } = render(<Card className='custom-class'>Content</Card>);

    expect(container.firstChild).toHaveClass("custom-class");
    // Should also still have default classes
    expect(container.firstChild).toHaveClass("bg-bg-strong-950");
  });

  it("renders header when provided", () => {
    render(
      <Card header={<h2>Card Header</h2>}>
        <p>Card content</p>
      </Card>,
    );

    expect(screen.getByText("Card Header")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("does not render header section when header is not provided", () => {
    const { container } = render(
      <Card>
        <p>Card content</p>
      </Card>,
    );

    // Check that there's no div with the header classes
    const headerDiv = container.querySelector(".flex.items-center.gap-3.mb-4");
    expect(headerDiv).not.toBeInTheDocument();
  });

  it("applies correct header styling when header is provided", () => {
    const { container } = render(<Card header={<span>Header</span>}>Content</Card>);

    const headerDiv = container.querySelector(".flex.items-center.gap-3.mb-4");
    expect(headerDiv).toBeInTheDocument();
    expect(headerDiv).toHaveClass("flex", "items-center", "gap-3", "mb-4");
  });

  it("handles empty string className", () => {
    const { container } = render(<Card className=''>Content</Card>);

    // Should still have default classes
    expect(container.firstChild).toHaveClass(
      "bg-bg-strong-950",
      "border",
      "border-bg-surface-800",
      "rounded-lg",
    );
  });

  it("handles complex children", () => {
    render(
      <Card>
        <div>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders with both header and custom className", () => {
    const { container } = render(
      <Card header={<span>Test Header</span>} className='extra-class'>
        <p>Content</p>
      </Card>,
    );

    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("extra-class");
    expect(cardElement).toHaveClass("bg-bg-strong-950");
    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("handles undefined className prop", () => {
    const { container } = render(<Card>Content</Card>);

    // Should still render with default classes when className is undefined
    expect(container.firstChild).toHaveClass("bg-bg-strong-950");
  });
});
