import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { TicketCard } from "./ticket-card";

describe("TicketCard Component", () => {
  // const numberedItems = [
  //   {
  //     id: "1",
  //     day: "Monday",
  //     track: "Track A",
  //     itemName: "Session 1",
  //     description: "A detailed session",
  //     currency: "₦",
  //     amount: 25000,
  //     type: "VIP",
  //   },
  // ];

  // const unnumberedItems = [
  //   {
  //     id: "2",
  //     day: "Tuesday",
  //     amount: 15000,
  //     currency: "₦",
  //     type: "Regular",
  //   },
  // ];

  it("renders numbered variant with a serial number", () => {
    render(<TicketCard variant='numbered' sn={3} />); // items={numberedItems}
    expect(screen.getByText("Ticket Details")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // sn
    // expect(screen.getByText("Session 1")).toBeInTheDocument();
    // expect(screen.getByText(/₦25,000/)).toBeInTheDocument();
    // expect(screen.getByText("VIP")).toBeInTheDocument();
  });

  it("renders numbered variant without serial number", () => {
    render(<TicketCard variant='numbered' />); // items={numberedItems}
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    // expect(screen.getByText("Session 1")).toBeInTheDocument();
  });

  it("renders fallback message if numbered items are undefined", () => {
    render(<TicketCard variant='numbered' />); // items={undefined}
    expect(
      screen.getByText(/Select your ticket date\(s\) to see ticket details\./i),
    ).toBeInTheDocument();
  });

  it("renders unnumbered variant correctly", () => {
    render(<TicketCard variant='unnumbered' />); // items={unnumberedItems}
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    // expect(screen.getByText("Tuesday (Regular)")).toBeInTheDocument();
    // expect(screen.getByText(/₦15,000/)).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /Proceed to pay/i })).toBeInTheDocument();
  });

  it("renders fallback message if unnumbered items are undefined", () => {
    render(<TicketCard variant='unnumbered' />); // items={undefined}
    expect(
      screen.getByText(/Select your ticket date\(s\) to see order summary\./i),
    ).toBeInTheDocument();
  });

  // it("displays discount and total properly in unnumbered", () => {
  //   render(<TicketCard variant='unnumbered' items={unnumberedItems} />);
  //   expect(screen.getByText(/₦5,000/)).toBeInTheDocument(); // 15,000 - 10,000
  // });

  it("is styled responsively (basic class checks)", () => {
    const { container } = render(<TicketCard variant='numbered' sn={1} />); // items={numberedItems}
    const card = container.querySelector(".w-full");
    expect(card).toHaveClass("max-w-[450px]");

    const text = container.querySelector("h5");
    expect(text).toHaveClass("text-sm", "md:text-base");
  });
});
