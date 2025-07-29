import React from "react";
import { render, screen } from "@testing-library/react";

import {
  BreadcrumbContainer,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./";
import "@testing-library/jest-dom";

describe("Breadcrumb Components", () => {
  it("renders BreadcrumbContainer as <nav> with aria-label", () => {
    render(<BreadcrumbContainer data-testid='breadcrumb-container' />);
    const nav = screen.getByTestId("breadcrumb-container");
    expect(nav.tagName).toBe("NAV");
    expect(nav).toHaveAttribute("aria-label", "breadcrumb");
  });

  it("renders BreadcrumbList as <ol> with class and hydration warning suppressed", () => {
    render(<BreadcrumbList data-testid='breadcrumb-list' />);
    const list = screen.getByTestId("breadcrumb-list");
    expect(list.tagName).toBe("OL");
    expect(list.className).toContain("flex items-center");
  });

  it("renders BreadcrumbItem as <li> with expected classes", () => {
    render(<BreadcrumbItem data-testid='breadcrumb-item'>Item</BreadcrumbItem>);
    const item = screen.getByTestId("breadcrumb-item");
    expect(item.tagName).toBe("LI");
    expect(item.className).toContain("inline-flex items-center gap-1");
    expect(item).toHaveTextContent("Item");
  });

  it("renders BreadcrumbLink as <a> with default styles", () => {
    render(
      <BreadcrumbLink href='/test' data-testid='breadcrumb-link'>
        Link
      </BreadcrumbLink>,
    );
    const link = screen.getByTestId("breadcrumb-link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
    expect(link.className).toContain("text-soft-400");
    expect(link).toHaveTextContent("Link");
  });

  it("renders BreadcrumbSeparator with ChevronRight by default", () => {
    render(<BreadcrumbSeparator data-testid='separator' />);
    const separator = screen.getByTestId("separator");

    expect(separator.tagName).toBe("LI");
    expect(separator).toHaveAttribute("aria-hidden", "true");
    expect(separator).toHaveAttribute("role", "presentation");
    expect(separator).toHaveAttribute("data-slot", "breadcrumb-separator");

    const svg = separator.querySelector("svg");
    expect(svg).toBeInTheDocument(); // Lucide ChevronRight renders as SVG
  });

  it("renders BreadcrumbSeparator with custom children", () => {
    render(<BreadcrumbSeparator data-testid='custom-separator'>/</BreadcrumbSeparator>);
    const separator = screen.getByTestId("custom-separator");
    expect(separator).toHaveTextContent("/");
  });
});
