import React from "react";
import { render, screen } from "@testing-library/react";

import Breadcrumb from "./index";

describe("Breadcrumb component", () => {
  const breadcrumbList = ["Home", "Shop", "Details"];

  it("renders all breadcrumb items", () => {
    render(<Breadcrumb breadcrumbList={breadcrumbList} activeIndex={1} />);

    breadcrumbList.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders correct number of chevron icons", () => {
    render(<Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} />);

    // There should be 2 chevrons between 3 items (after the first)
    const chevrons = screen.getAllByTestId("chevron-icon");
    expect(chevrons).toHaveLength(2);

    // Chevrons should be decorative
    chevrons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("applies active class only to the active breadcrumb", () => {
    render(<Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} />);

    const activeItem = screen.getByText("Details");
    const inactiveItem = screen.getByText("Shop");

    expect(activeItem).toHaveClass("text-away-base");
    expect(inactiveItem).toHaveClass("text-soft-400");
  });

  it("sets aria-current='page' only on the active breadcrumb", () => {
    render(<Breadcrumb breadcrumbList={breadcrumbList} activeIndex={2} />);

    const activeItem = screen.getByText("Details");
    const inactiveItem = screen.getByText("Home");

    expect(activeItem).toHaveAttribute("aria-current", "page");
    expect(inactiveItem).not.toHaveAttribute("aria-current");
  });

  it("does not render chevron before the first item", () => {
    render(<Breadcrumb breadcrumbList={breadcrumbList} activeIndex={0} />);

    const firstItem = screen.getByText("Home");
    const chevrons = screen.getAllByTestId("chevron-icon");

    // Ensure chevrons are not rendered before first item
    expect(firstItem.previousSibling).not.toBeInTheDocument();
    expect(chevrons).toHaveLength(2); // only between items 1-2 and 2-3
  });
});
