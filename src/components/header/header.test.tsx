import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

import Header from "./header";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the icon components
jest.mock("../icons/LogoIcon", () => {
  return function MockLogoIcon() {
    return <div data-testid='logo-icon'>Logo</div>;
  };
});

jest.mock("../icons/CloseIcon", () => {
  return function MockCloseIcon() {
    return <div data-testid='close-icon'>×</div>;
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

  it("renders the close button with text", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("renders the close icon inside button", () => {
    render(<Header />);
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("calls router.push with '/' when close button is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
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

  it("applies hover styles to close button", () => {
    render(<Header />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toHaveClass("hover:text-gray-600");
  });

  it("applies transition styles to close button", () => {
    render(<Header />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toHaveClass("transition-colors");
  });
});
