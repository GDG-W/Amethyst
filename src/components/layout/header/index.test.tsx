import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import Header from ".";

jest.mock(
  "@/components/icons/logo",
  () =>
    function MockLogo() {
      return <div data-testid='logo'>Logo</div>;
    },
);

describe("Header", () => {
  it("renders the header container", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the 'Claim Ticket' link", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /claim ticket/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
