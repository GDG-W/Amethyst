import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Index from "./index";

beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

describe("FAQ Component", () => {
  test("renders topics and questions", () => {
    render(<Index />);

    expect(screen.getByText("Ticketing & Access")).toBeInTheDocument();
    expect(screen.getByText("Claiming Tickets")).toBeInTheDocument();
    expect(screen.getByText("Upgrading Tickets")).toBeInTheDocument();

    expect(
      screen.getByText("Can I buy tickets for the event through this platform?")
    ).toBeInTheDocument();
  });

  test("switches active topic on click", () => {
    render(<Index />);
    const topicButton = screen.getByText("Claiming Tickets");

    fireEvent.click(topicButton);

    expect(topicButton).toHaveClass("bg-white");
  });

  test("toggles question answer on click", async () => {
    render(<Index />);
    const question = screen.getByText("Can I buy tickets for the event through this platform?");
    // Get all expand buttons and select the first one (for the first question)
    const toggleBtns = screen.getAllByRole("button", { name: /Expand answer/i });
    const toggleBtn = toggleBtns[0]; // First question's toggle button

    expect(screen.queryByText(/allows you to securely purchase/)).not.toBeInTheDocument();

    fireEvent.click(question);
    expect(screen.getByText(/allows you to securely purchase/)).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute("aria-label", "Collapse answer");

    fireEvent.click(question);

    // Wait for the exit animation to complete and the element to be removed from DOM
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(screen.queryByText(/allows you to securely purchase/)).not.toBeInTheDocument();
  });

  test("expands one question without affecting others", () => {
    render(<Index />);
    const q1 = screen.getByText("Can I buy tickets for the event through this platform?");
    const q2 = screen.getByText("Is lunch or swag included in my ticket?");

    fireEvent.click(q1);
    expect(screen.getByText(/allows you to securely purchase/)).toBeInTheDocument();

    expect(screen.queryByText(/meals and merchandise are not included/)).not.toBeInTheDocument();

    fireEvent.click(q2);
    expect(screen.getByText(/meals and merchandise are not included/)).toBeInTheDocument();
  });
});
