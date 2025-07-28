import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

import Header from ".";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the icon components
jest.mock("../icons/logo", () => {
  return function MockLogoIcon() {
    return <div data-testid='logo-icon'>Logo</div>;
  };
});

describe("Header Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  it("renders the header component", () => {
    render(<Header />);
    const headerContainer =
      screen.getByRole("banner", { hidden: true }) || document.querySelector(".bg-\\[\\#FFFAEB\\]");
    expect(headerContainer || document.body.firstChild).toBeInTheDocument();
  });

  it("renders the logo icon", () => {
    render(<Header />);
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();
  });

  it("renders the claim ticket button with text", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /claim ticket/i })).toBeInTheDocument();
  });

  it("calls router.push with '/' when claim ticket button is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /claim ticket/i }));
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("applies correct background color to main container", () => {
    const { container } = render(<Header />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("bg-[#FFFAEB]");
  });

  it("applies full screen height to main container", () => {
    const { container } = render(<Header />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("h-screen");
  });

  it("applies correct styles to claim ticket button", () => {
    render(<Header />);
    const claimTicketButton = screen.getByRole("button", { name: /claim ticket/i });
    expect(claimTicketButton).toHaveClass("flex");
    expect(claimTicketButton).toHaveClass("items-center");
    expect(claimTicketButton).toHaveClass("gap-1");
    expect(claimTicketButton).toHaveClass("text-static-black");
    expect(claimTicketButton).toHaveClass("underline");
    expect(claimTicketButton).toHaveClass("text-base");
    expect(claimTicketButton).toHaveClass("font-normal");
    expect(claimTicketButton).toHaveClass("cursor-pointer");
  });
});
