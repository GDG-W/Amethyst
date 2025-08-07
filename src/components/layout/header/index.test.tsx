import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { usePathname } from "next/navigation";

import Header from ".";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock(
  "@/components/icons/logo",
  () =>
    function MockLogo() {
      return <div data-testid='logo'>Logo</div>;
    },
);

const mockedUsePathname = usePathname as jest.Mock;

describe("Header", () => {
  it("renders the header container", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the logo", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<Header />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the 'Claim Ticket' link when on the buy page", () => {
    mockedUsePathname.mockReturnValue("/buy");
    render(<Header />);
    const link = screen.getByRole("link", { name: /claim ticket/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/claim");
  });

  it("does not render the 'Claim Ticket' link on other pages", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<Header />);
    const link = screen.queryByRole("link", { name: /claim ticket/i });
    expect(link).not.toBeInTheDocument();
  });

  it("renders the 'Buy Tickets!' button on the claim page", () => {
    mockedUsePathname.mockReturnValue("/claim");
    render(<Header />);
    const link = screen.getByRole("link", { name: /buy tickets/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/buy");
  });

  it("renders the 'Buy Tickets!' button on the upgrade page", () => {
    mockedUsePathname.mockReturnValue("/upgrade");
    render(<Header />);
    const link = screen.getByRole("link", { name: /buy tickets/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/buy");
  });

  it("does not render the 'Buy Tickets!' button on other pages", () => {
    mockedUsePathname.mockReturnValue("/buy");
    render(<Header />);
    const link = screen.queryByRole("link", { name: /buy tickets/i });
    expect(link).not.toBeInTheDocument();
  });
});
