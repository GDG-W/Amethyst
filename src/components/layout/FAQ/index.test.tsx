import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Index from "./index";

describe("FAQ Component", () => {
  test("renders topics and questions", () => {
    render(<Index />);

    expect(screen.getByText("Ticketing & Access")).toBeInTheDocument();
    expect(screen.getByText("Claiming Tickets")).toBeInTheDocument();
    expect(screen.getByText("Upgrading Tickets")).toBeInTheDocument();

    expect(screen.getByText("1. What is DevFest?")).toBeInTheDocument();
  });

  test("switches active topic on click", () => {
    render(<Index />);
    const topicButton = screen.getByText("Claiming Tickets");

    fireEvent.click(topicButton);

    expect(topicButton).toHaveClass("bg-white");
  });

  test("toggles question answer on click", () => {
    render(<Index />);
    const question = screen.getByText("1. What is DevFest?");
    // Get all expand buttons and select the first one (for the first question)
    const toggleBtns = screen.getAllByRole("button", { name: /Expand answer/i });
    const toggleBtn = toggleBtns[0]; // First question's toggle button

    expect(screen.queryByText(/DevFest is a community-led/)).not.toBeInTheDocument();

    fireEvent.click(question);
    expect(screen.getByText(/DevFest is a community-led/)).toBeInTheDocument();
    expect(toggleBtn).toHaveTextContent("−");

    fireEvent.click(question);
    expect(screen.queryByText(/DevFest is a community-led/)).not.toBeInTheDocument();
  });

  test("expands one question without affecting others", () => {
    render(<Index />);
    const q1 = screen.getByText("1. What is DevFest?");
    const q2 = screen.getByText("2. How do I register for the event?");

    fireEvent.click(q1);
    expect(screen.getByText(/DevFest is a community-led/)).toBeInTheDocument();

    expect(
      screen.queryByText(/You can register through our official website/)
    ).not.toBeInTheDocument();

    fireEvent.click(q2);
    expect(screen.getByText(/You can register through our official website/)).toBeInTheDocument();
  });
});
