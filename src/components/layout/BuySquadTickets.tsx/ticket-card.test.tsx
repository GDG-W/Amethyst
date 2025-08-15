import { fireEvent, render, screen } from "@testing-library/react";

import TicketCard from "./ticket-card";

describe("TicketCard", () => {
  const defaultProps = {
    title: "Standard Pass",
    price: "$100",
    description: "Access to all standard sessions",
    features: ["Feature A", "Feature B", "Feature C"],
    onBuyTickets: jest.fn(),
  };

  it("renders title, price, and description", () => {
    render(<TicketCard {...defaultProps} />);
    expect(screen.getByText("Standard Pass")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Access to all standard sessions")).toBeInTheDocument();
  });

  it("renders all features", () => {
    render(<TicketCard {...defaultProps} />);
    defaultProps.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it("applies correct background for 'standard' variant", () => {
    const { container } = render(<TicketCard {...defaultProps} variant="standard" />);
    expect(container.firstChild).toHaveClass("bg-[#C3ECF6]");
  });

  it("applies correct background for 'pro' variant", () => {
    const { container } = render(<TicketCard {...defaultProps} variant="pro" />);
    expect(container.firstChild).toHaveClass("bg-[#FFE7A5]");
  });

  it("calls onBuyTickets when button is clicked", () => {
    render(<TicketCard {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /buy tickets/i }));
    expect(defaultProps.onBuyTickets).toHaveBeenCalledTimes(1);
  });
});
