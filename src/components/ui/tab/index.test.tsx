// index.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { ButtonProps } from "../button";

import Tab from "./index";

jest.mock("../button", () => {
  return {
    __esModule: true,
    default: React.forwardRef<HTMLButtonElement, ButtonProps>(function MockButton(
      { children, ...rest },
      ref
    ) {
      return (
        <button ref={ref} {...rest}>
          {children}
        </button>
      );
    }),
  };
});

describe("Tab", () => {
  const tabs = [
    { name: "details", label: "Details" },
    { name: "rsvp", label: "RSVP" },
    { name: "other", label: "Other" },
  ];

  it("renders all tab labels", () => {
    const setActiveTab = jest.fn();
    render(<Tab tabs={tabs} activeTab="details" setActiveTab={setActiveTab} />);

    expect(screen.getByRole("button", { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /rsvp/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /other/i })).toBeInTheDocument();
  });

  it("applies data-active only to the active tab", () => {
    const setActiveTab = jest.fn();
    render(<Tab tabs={tabs} activeTab="details" setActiveTab={setActiveTab} />);

    const details = screen.getByRole("button", { name: /details/i });
    const rsvp = screen.getByRole("button", { name: /rsvp/i });
    const other = screen.getByRole("button", { name: /other/i });

    expect(details).toHaveAttribute("data-active", "details");
    expect(rsvp).not.toHaveAttribute("data-active");
    expect(other).not.toHaveAttribute("data-active");
  });

  it("calls setActiveTab with the clicked tab name", async () => {
    const user = userEvent.setup();
    const setActiveTab = jest.fn();
    render(<Tab tabs={tabs} activeTab="details" setActiveTab={setActiveTab} />);

    const rsvp = screen.getByRole("button", { name: /rsvp/i });
    await user.click(rsvp);

    expect(setActiveTab).toHaveBeenCalledTimes(1);
    expect(setActiveTab).toHaveBeenCalledWith("rsvp");
  });

  it("updates the active attribute when activeTab prop changes", () => {
    const setActiveTab = jest.fn();
    const { rerender } = render(
      <Tab tabs={tabs} activeTab="details" setActiveTab={setActiveTab} />
    );

    // Initially "details" is active
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute(
      "data-active",
      "details"
    );

    // Rerender with a different active tab
    rerender(<Tab tabs={tabs} activeTab="other" setActiveTab={setActiveTab} />);

    expect(screen.getByRole("button", { name: /details/i })).not.toHaveAttribute("data-active");
    expect(screen.getByRole("button", { name: /other/i })).toHaveAttribute("data-active", "other");
  });

  it("renders nothing interactive if tabs is empty", () => {
    const setActiveTab = jest.fn();
    render(<Tab tabs={[]} activeTab="any" setActiveTab={setActiveTab} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
