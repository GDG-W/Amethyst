import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";

import type { Crumb } from "./types";

import { BreadcrumbComponent } from "./";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Breadcrumb Component", () => {
  const mockRouterPush = jest.fn();

  const mockCrumbs: Record<string, Crumb> = {
    "/ticket": {
      label: "Buy Ticket",
      href: "/ticket",
      prev: null,
      next: "/buyer",
    },
    "/buyer": {
      label: "Buyer Information",
      href: "/buyer",
      prev: "/ticket",
      next: null,
    },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all crumbs in order", () => {
    (usePathname as jest.Mock).mockReturnValue("/ticket");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    const items = screen.getAllByRole("link");
    expect(items).toHaveLength(2);

    expect(screen.getByText("Buy Ticket")).toBeInTheDocument();
    expect(screen.getByText("Buyer Information")).toBeInTheDocument();
  });

  it("highlights the current page", () => {
    (usePathname as jest.Mock).mockReturnValue("/ticket");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    const current = screen.getByText("Buy Ticket");
    expect(current.closest("[aria-current='page']")).toBeInTheDocument();
  });

  it("navigates back on button click", () => {
    (usePathname as jest.Mock).mockReturnValue("/buyer");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    const backButton = screen.getByRole("button", { name: /Go Back/i });
    fireEvent.click(backButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/ticket");
  });

  it("navigates home if no previous crumb", () => {
    (usePathname as jest.Mock).mockReturnValue("/ticket");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    const backButton = screen.getByRole("button", { name: /Go Back/i });
    fireEvent.click(backButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("each breadcrumb link is interactive", () => {
    (usePathname as jest.Mock).mockReturnValue("/buyer");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    const link = screen.getByRole("link", { name: /Buy Ticket/i });
    expect(link).toHaveAttribute("href", "/ticket");
  });

  it("should have Go Back button and separator present", () => {
    (usePathname as jest.Mock).mockReturnValue("/ticket");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders breadcrumb with overflow scroll on smaller viewports", () => {
    (usePathname as jest.Mock).mockReturnValue("/ticket");

    const { container } = render(<BreadcrumbComponent crumbs={mockCrumbs} />);
    const breadcrumbContainer = container.querySelector("[aria-label='breadcrumb']");
    expect(breadcrumbContainer).toHaveClass("overflow-x-scroll");
  });

  it("does not render the current page as a link", () => {
    (usePathname as jest.Mock).mockReturnValue("/buyer");

    render(<BreadcrumbComponent crumbs={mockCrumbs} />);

    const current = screen.getByText("Buyer Information");
    expect(current.closest("a")).not.toBeInTheDocument();
    expect(current).toHaveAttribute("aria-current", "page");
  });
});
