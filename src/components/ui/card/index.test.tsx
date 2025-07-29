import React from "react";
import { render } from "@testing-library/react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardItem,
} from "@/components/ui/card";

const renderWithText = (Component: React.ElementType, text: string, testId: string = "") => {
  const { getByText, container } = render(<Component>{text}</Component>);
  expect(getByText(text)).toBeInTheDocument();
  if (testId) {
    expect(container.querySelector(`[data-slot="${testId}"]`)).toBeInTheDocument();
  }
};

describe("Card component suite", () => {
  it("renders Card", () => {
    renderWithText(Card, "Card content", "card");
  });

  it("renders CardHeader", () => {
    renderWithText(CardHeader, "Header", "card-header");
  });

  it("renders CardFooter", () => {
    renderWithText(CardFooter, "Footer", "card-footer");
  });

  it("renders CardTitle", () => {
    renderWithText(CardTitle, "Title", "card-title");
  });

  it("renders CardAction", () => {
    renderWithText(CardAction, "Action", "card-action");
  });

  it("renders CardDescription", () => {
    renderWithText(CardDescription, "Description", "card-description");
  });

  it("renders CardContent", () => {
    renderWithText(CardContent, "Content", "card-content");
  });

  it("renders CardItem", () => {
    renderWithText(CardItem, "Item", "card-item");
  });

  it("applies className overrides", () => {
    const { container } = render(<Card className='custom-class'>Test</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
