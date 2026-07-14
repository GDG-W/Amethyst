import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import DatePicker from ".";

describe("DatePicker", () => {
  const mockOnSelectionChange = jest.fn();
  const TEST_DATES = [
    { day: 13, dayName: "Fri", date: "2026-11-13" },
    { day: 14, dayName: "Sat", date: "2026-11-14" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders November 2026 header", () => {
      render(<DatePicker dates={TEST_DATES} />);
      expect(screen.getByText("November 2026")).toBeInTheDocument();
    });

    it("renders dates from provided list", () => {
      render(<DatePicker dates={TEST_DATES} />);
      expect(screen.getByText("13")).toBeInTheDocument();
      expect(screen.getByText("14")).toBeInTheDocument();
    });

    it("renders day names", () => {
      render(<DatePicker dates={TEST_DATES} />);
      expect(screen.getByText("Fri")).toBeInTheDocument();
      expect(screen.getByText("Sat")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DatePicker dates={TEST_DATES} className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Selection Count Display", () => {
    it("does not show selection count when no dates selected", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={[]} />);
      expect(screen.queryByText(/Selected/)).not.toBeInTheDocument();
    });

    it("shows correct selection count for single selection", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={["2026-11-13"]} />);
      expect(screen.getByText("1 Selected")).toBeInTheDocument();
    });

    it("shows correct selection count for multiple selections", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={["2026-11-13", "2026-11-14"]} />);
      expect(screen.getByText("2 Selected")).toBeInTheDocument();
    });
  });

  // Selection behavior is exercised indirectly via availability tests below.

  describe("Availability-driven behavior", () => {
    it("enables only available dates in pro mode", () => {
      render(
        <DatePicker
          dates={TEST_DATES}
          availableDateKeys={new Set(["2026-11-14"])}
          selectedDates={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      );

      // Fri disabled; Sat enabled
      expect(screen.getByText("13").closest("button")).toBeDisabled();
      expect(screen.getByText("14").closest("button")).not.toBeDisabled();

      fireEvent.click(screen.getByText("14"));
      expect(mockOnSelectionChange).toHaveBeenCalledWith(["2026-11-14"]);
    });

    it("enables only provided dates in standard mode", () => {
      render(
        <DatePicker
          dates={TEST_DATES}
          availableDateKeys={new Set(["2026-11-13"])}
          selectedDates={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      );

      expect(screen.getByText("13").closest("button")).not.toBeDisabled();
      expect(screen.getByText("14").closest("button")).toBeDisabled();
    });
  });

  describe("Check Icons", () => {
    it("shows check icon container for selected dates", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={["2026-11-13"]} />);
      const selectedButton = screen.getByText("13").closest("button");
      // Look for the white background container that holds the check icon
      const checkContainer = selectedButton?.querySelector(".bg-white.rounded-full");
      expect(checkContainer).toBeInTheDocument();
    });

    it("shows hover check icon container for unselected, enabled dates", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={[]} />);
      const enabledButton = screen.getByText("13").closest("button");
      // Look for the gray background container with opacity-0 class
      const hoverCheckContainer = enabledButton?.querySelector(
        ".bg-\\[\\#E2E4E9\\].rounded-full.opacity-0"
      );
      expect(hoverCheckContainer).toBeInTheDocument();
    });

    it("does not show any check icon containers for disabled dates", () => {
      render(<DatePicker dates={TEST_DATES} availableDateKeys={new Set(["2026-11-14"])} />);
      const disabledButton = screen.getByText("13").closest("button");
      // Should not have either the white or gray check containers
      const whiteContainer = disabledButton?.querySelector(".bg-white.rounded-full");
      const grayContainer = disabledButton?.querySelector(".bg-\\[\\#E2E4E9\\].rounded-full");
      expect(whiteContainer).not.toBeInTheDocument();
      expect(grayContainer).not.toBeInTheDocument();
    });

    it("selected date has white background check container", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={["2026-11-14"]} />);
      const selectedButton = screen.getByText("14").closest("button");
      const checkContainer = selectedButton?.querySelector(".bg-white.rounded-full");
      expect(checkContainer).toBeInTheDocument();
      expect(checkContainer).toHaveClass(
        "bg-white",
        "rounded-full",
        "transition-opacity",
        "duration-200"
      );
    });

    it("unselected enabled date has gray background hover container", () => {
      render(<DatePicker dates={TEST_DATES} selectedDates={[]} />);
      const unselectedButton = screen.getByText("14").closest("button");
      const hoverContainer = unselectedButton?.querySelector(".bg-\\[\\#E2E4E9\\].rounded-full");
      expect(hoverContainer).toBeInTheDocument();
      expect(hoverContainer).toHaveClass(
        "bg-[#E2E4E9]",
        "rounded-full",
        "opacity-0",
        "group-hover:opacity-100",
        "transition-opacity",
        "duration-200"
      );
    });
  });

  describe("Callback Behavior", () => {
    it("does not crash when onSelectionChange is not provided", () => {
      render(<DatePicker dates={TEST_DATES} />);

      expect(() => {
        fireEvent.click(screen.getByText("13"));
      }).not.toThrow();
    });
  });
});
