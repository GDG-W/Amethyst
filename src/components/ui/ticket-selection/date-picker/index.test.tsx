import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import DatePicker from ".";

describe("DatePicker", () => {
  const mockOnSelectionChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders November 2025 header", () => {
      render(<DatePicker />);
      expect(screen.getByText("November 2025")).toBeInTheDocument();
    });

    it("renders all 5 dates", () => {
      render(<DatePicker />);
      expect(screen.getByText("18")).toBeInTheDocument();
      expect(screen.getByText("19")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("21")).toBeInTheDocument();
      expect(screen.getByText("22")).toBeInTheDocument();
    });

    it("renders day names", () => {
      render(<DatePicker />);
      expect(screen.getByText("Tue")).toBeInTheDocument();
      expect(screen.getByText("Wed")).toBeInTheDocument();
      expect(screen.getByText("Thu")).toBeInTheDocument();
      expect(screen.getByText("Fri")).toBeInTheDocument();
      expect(screen.getByText("Sat")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DatePicker className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Selection Count Display", () => {
    it("does not show selection count when no dates selected", () => {
      render(<DatePicker selectedDates={[]} />);
      expect(screen.queryByText(/Selected/)).not.toBeInTheDocument();
    });

    it("shows correct selection count for single selection", () => {
      render(<DatePicker selectedDates={["tue-18"]} />);
      expect(screen.getByText("1 Selected")).toBeInTheDocument();
    });

    it("shows correct selection count for multiple selections", () => {
      render(<DatePicker selectedDates={["tue-18", "wed-19", "thu-20"]} />);
      expect(screen.getByText("3 Selected")).toBeInTheDocument();
    });
  });

  describe("Standard Mode", () => {
    it("allows multiple date selection", () => {
      render(
        <DatePicker
          mode="standard"
          selectedDates={["tue-18"]}
          onSelectionChange={mockOnSelectionChange}
        />
      );

      fireEvent.click(screen.getByText("19"));
      expect(mockOnSelectionChange).toHaveBeenCalledWith(["tue-18", "wed-19"]);
    });

    it("removes date from selection when clicked again", () => {
      render(
        <DatePicker
          mode="standard"
          selectedDates={["tue-18", "wed-19"]}
          onSelectionChange={mockOnSelectionChange}
        />
      );

      fireEvent.click(screen.getByText("18"));
      expect(mockOnSelectionChange).toHaveBeenCalledWith(["wed-19"]);
    });

    it("maintains multiple selected states", () => {
      render(<DatePicker mode="standard" selectedDates={["tue-18", "wed-19"]} />);

      const button18 = screen.getByText("18").closest("button");
      const button19 = screen.getByText("19").closest("button");

      expect(button18).toHaveClass("bg-[#F6B51E]", "text-white");
      expect(button19).toHaveClass("bg-[#F6B51E]", "text-white");
    });
  });

  describe("Availability-driven behavior", () => {
    it("enables only available dates in pro mode", () => {
      render(
        <DatePicker
          mode="pro"
          availableDateKeys={new Set(["2025-11-20"])}
          selectedDates={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      );

      // Tue and Wed disabled; Thu enabled
      expect(screen.getByText("18").closest("button")).toBeDisabled();
      expect(screen.getByText("19").closest("button")).toBeDisabled();
      expect(screen.getByText("20").closest("button")).not.toBeDisabled();

      fireEvent.click(screen.getByText("20"));
      expect(mockOnSelectionChange).toHaveBeenCalledWith(["thu-20"]);
    });

    it("enables only provided dates in standard mode", () => {
      render(
        <DatePicker
          mode="standard"
          availableDateKeys={new Set(["2025-11-18", "2025-11-21"])}
          selectedDates={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      );

      expect(screen.getByText("18").closest("button")).not.toBeDisabled();
      expect(screen.getByText("19").closest("button")).toBeDisabled();
      expect(screen.getByText("20").closest("button")).toBeDisabled();
      expect(screen.getByText("21").closest("button")).not.toBeDisabled();
      expect(screen.getByText("22").closest("button")).toBeDisabled();
    });
  });

  describe("Check Icons", () => {
    it("shows check icon container for selected dates", () => {
      render(<DatePicker selectedDates={["tue-18"]} />);
      const selectedButton = screen.getByText("18").closest("button");
      // Look for the white background container that holds the check icon
      const checkContainer = selectedButton?.querySelector(".bg-white.rounded-full");
      expect(checkContainer).toBeInTheDocument();
    });

    it("shows hover check icon container for unselected, enabled dates", () => {
      render(<DatePicker selectedDates={[]} />);
      const enabledButton = screen.getByText("18").closest("button");
      // Look for the gray background container with opacity-0 class
      const hoverCheckContainer = enabledButton?.querySelector(
        ".bg-\\[\\#E2E4E9\\].rounded-full.opacity-0"
      );
      expect(hoverCheckContainer).toBeInTheDocument();
    });

    it("does not show any check icon containers for disabled dates", () => {
      render(<DatePicker mode="pro" availableDateKeys={new Set(["2025-11-20"])} />);
      const disabledButton = screen.getByText("18").closest("button");
      // Should not have either the white or gray check containers
      const whiteContainer = disabledButton?.querySelector(".bg-white.rounded-full");
      const grayContainer = disabledButton?.querySelector(".bg-\\[\\#E2E4E9\\].rounded-full");
      expect(whiteContainer).not.toBeInTheDocument();
      expect(grayContainer).not.toBeInTheDocument();
    });

    it("selected date has white background check container", () => {
      render(<DatePicker selectedDates={["wed-19"]} />);
      const selectedButton = screen.getByText("19").closest("button");
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
      render(<DatePicker selectedDates={[]} />);
      const unselectedButton = screen.getByText("20").closest("button");
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
      render(<DatePicker mode="standard" />);

      expect(() => {
        fireEvent.click(screen.getByText("18"));
      }).not.toThrow();
    });
  });
});
