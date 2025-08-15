import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Breadcrumb from "./index";

describe("Breadcrumb component", () => {
  const breadcrumbList = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Details", link: "/details" },
  ];

  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  it("renders all breadcrumb items", () => {
    render(
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={1} handleClick={mockHandleClick} />
    );

    breadcrumbList.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("renders correct number of chevron icons", () => {
    render(
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} handleClick={mockHandleClick} />
    );

    // There should be 2 chevrons between 3 items (after the first)
    const chevrons = screen.getAllByTestId("chevron-icon");
    expect(chevrons).toHaveLength(2);

    // Chevrons should be decorative
    chevrons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("applies active class only to the active breadcrumb", () => {
    render(
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} handleClick={mockHandleClick} />
    );

    const activeItem = screen.getByText("Details");
    const inactiveItem = screen.getByText("Shop");

    expect(activeItem).toHaveClass("text-away-base");
    expect(inactiveItem).toHaveClass("text-soft-400");
  });

  it("sets aria-current='page' only on the active breadcrumb", () => {
    render(
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} handleClick={mockHandleClick} />
    );

    const activeItem = screen.getByText("Details");
    const inactiveItem = screen.getByText("Home");

    expect(activeItem).toHaveAttribute("aria-current", "page");
    expect(inactiveItem).not.toHaveAttribute("aria-current");
  });

  it("calls handleClick with the correct index when a breadcrumb button is clicked", () => {
    render(
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={0} handleClick={mockHandleClick} />
    );

    const item = screen.getByText("Home");
    fireEvent.click(item);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith(0);
  });

  it("does not render chevron before the first item", () => {
    render(
      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={0} handleClick={mockHandleClick} />
    );

    const firstItem = screen.getByText("Home");
    const chevrons = screen.getAllByTestId("chevron-icon");

    // Ensure chevrons are not rendered before first item
    expect(firstItem.previousSibling).not.toBeInTheDocument();
    expect(chevrons).toHaveLength(2); // only between items 1-2 and 2-3
  });
});
