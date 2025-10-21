import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import Logo from ".";

jest.mock("../../../assets/svg/svg-export", () => ({
  DevfestLogo: () => <svg data-testid="devfest-logo"></svg>,
}));

describe("Logo Component", () => {
  it("renders the logo container", () => {
    render(<Logo />);
    const container = screen.getByRole("group");
    expect(container).toBeInTheDocument();
  });

  it("renders the Devfest SVG logo", () => {
    render(<Logo />);
    const svg = screen.getByTestId("devfest-logo");
    expect(svg).toBeInTheDocument();
  });

  it("renders the correct text label", () => {
    render(<Logo />);
    const text = screen.getByText(/DevFest Lagos/i);
    expect(text).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    render(<Logo />);
    const container = screen.getByRole("group");
    expect(container).toHaveClass("bg-white");
    expect(container).toHaveClass("flex");
  });
});
