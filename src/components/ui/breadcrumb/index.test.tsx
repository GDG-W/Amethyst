import React from "react";
import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";

import Breadcrumb from "./";
import "@testing-library/jest-dom";

// Mock usePathname from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Breadcrumb component", () => {
  const breadcrumbList = [
    { name: "Home Page", link: "/" },
    { name: "Buy Ticket", link: "/buy" },
    { name: "Buyer Information", link: "/buyer" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("highlights only the first breadcrumb when path is '/'", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Breadcrumb breadcrumbList={breadcrumbList} />);

    expect(screen.getByText("Home Page")).toHaveClass("!text-away-base");
    expect(screen.getByText("Buy Ticket")).not.toHaveClass("!text-away-base");
    expect(screen.getByText("Buyer Information")).not.toHaveClass("!text-away-base");

    const separators = screen.queryAllByTestId("separator");
    separators.forEach((sep) => {
      expect(sep).not.toHaveClass("!text-away-base");
    });
  });

  it("highlights the second item and its separator when path is '/buy'", () => {
    (usePathname as jest.Mock).mockReturnValue("/buy");

    render(<Breadcrumb breadcrumbList={breadcrumbList} />);

    expect(screen.getByText("Buy Ticket")).toHaveClass("!text-away-base");

    const separators = screen.getAllByTestId("separator");
    expect(separators[0]).toHaveClass("!text-away-base"); // Before Buy Ticket
    expect(separators[1]).not.toHaveClass("!text-away-base"); // Before Buyer Info
  });

  it("highlights the third item and its separator when path is '/buyer'", () => {
    (usePathname as jest.Mock).mockReturnValue("/buyer");

    render(<Breadcrumb breadcrumbList={breadcrumbList} />);

    expect(screen.getByText("Buyer Information")).toHaveClass("!text-away-base");

    const separators = screen.getAllByTestId("separator");
    expect(separators[1]).toHaveClass("!text-away-base"); // Before Buyer Info
  });
});
