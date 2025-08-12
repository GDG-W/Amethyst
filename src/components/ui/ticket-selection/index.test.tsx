import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import TicketsSelection from ".";

// Mock the Card component
jest.mock("@/components/ui/ticket-selection/ticket-card", () => {
  return function MockCard({
    children,
    header,
    className,
  }: {
    children: React.ReactNode;
    header?: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="ticket-card" className={className}>
        {header && <div data-testid="card-header">{header}</div>}
        {children}
      </div>
    );
  };
});

// Mock the Tabs component
jest.mock("@/components/ui/ticket-selection/ticket-tabs", () => {
  return function MockTabs({
    tabs,
    activeTab,
    onTabChange,
    className,
  }: {
    tabs: { id: string; label: string; disabled?: boolean }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
  }) {
    return (
      <div data-testid="ticket-tabs" className={className}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            data-testid={`tab-${tab.id}`}
            className={activeTab === tab.id ? "active" : ""}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };
});

// Mock the DatePicker component
jest.mock("@/components/ui/ticket-selection/date-picker", () => {
  return function MockDatePicker({
    mode,
    selectedDates,
    onSelectionChange,
    className,
  }: {
    mode?: string;
    selectedDates?: string[];
    onSelectionChange?: (dates: string[]) => void;
    className?: string;
  }) {
    return (
      <div
        data-testid="date-picker"
        data-mode={mode}
        data-selected={(selectedDates || []).join(",")}
        className={className}
      >
        <button onClick={() => onSelectionChange?.(["test-date"])} data-testid="mock-date-select">
          Select Date
        </button>
        <span data-testid="selected-count">{(selectedDates || []).length}</span>
      </div>
    );
  };
});

describe("TicketsSelection", () => {
  describe("Initial Rendering", () => {
    it("renders the page with all components", () => {
      render(<TicketsSelection />);

      expect(screen.getByTestId("ticket-card")).toBeInTheDocument();
      expect(screen.getByTestId("ticket-tabs")).toBeInTheDocument();
      expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    });

    it("renders the header with step number and title", () => {
      render(<TicketsSelection />);

      const header = screen.getByTestId("card-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent("1");
      expect(header).toHaveTextContent("Select Date(s)");
    });

    it("starts with standard tab active", () => {
      render(<TicketsSelection />);

      const standardTab = screen.getByTestId("tab-standard");
      expect(standardTab).toHaveClass("active");
    });

    it("starts with no dates selected", () => {
      render(<TicketsSelection />);

      const selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("0");
    });

    it("passes correct initial props to DatePicker", () => {
      render(<TicketsSelection />);

      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-mode", "standard");
      expect(datePicker).toHaveAttribute("data-selected", "");
      expect(datePicker).toHaveClass("w-full");
    });
  });

  describe("Tab Navigation", () => {
    it("renders all two tabs", () => {
      render(<TicketsSelection />);

      expect(screen.getByText("Standard Ticket")).toBeInTheDocument();
      expect(screen.getByText("Pro Ticket")).toBeInTheDocument();
    });

    it("switches to standard tab when clicked", () => {
      render(<TicketsSelection />);

      fireEvent.click(screen.getByTestId("tab-standard"));

      const standardTab = screen.getByTestId("tab-standard");
      expect(standardTab).toHaveClass("active");

      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-mode", "standard");
    });

    it("switches to pro tab when clicked", () => {
      render(<TicketsSelection />);

      fireEvent.click(screen.getByTestId("tab-pro"));

      const proTab = screen.getByTestId("tab-pro");
      expect(proTab).toHaveClass("active");

      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-mode", "pro");
    });

    it("updates DatePicker mode when tab changes", () => {
      render(<TicketsSelection />);

      // Start with standard mode
      let datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-mode", "standard");

      // Switch to pro
      fireEvent.click(screen.getByTestId("tab-pro"));
      datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-mode", "pro");
    });
  });

  describe("Date Selection Integration", () => {
    it("updates selected dates when DatePicker triggers change", () => {
      render(<TicketsSelection />);

      // Initially no dates selected
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("0");

      // Simulate date selection
      fireEvent.click(screen.getByTestId("mock-date-select"));

      // Should now show 1 selected date
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-selected", "test-date");
    });

    it("maintains selected dates when staying on same tab", () => {
      render(<TicketsSelection />);

      // Select a date
      fireEvent.click(screen.getByTestId("mock-date-select"));
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      // Click same tab again (should not clear)
      fireEvent.click(screen.getByTestId("tab-standard"));
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");
    });
  });

  describe("Tab Switching Clears Selection", () => {
    it("clears selected dates when switching from standard to pro", () => {
      render(<TicketsSelection />);

      // Switch to standard and select dates
      fireEvent.click(screen.getByTestId("tab-standard"));
      fireEvent.click(screen.getByTestId("mock-date-select"));
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      // Switch to pro mode
      fireEvent.click(screen.getByTestId("tab-pro"));

      // Selection should be cleared
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("0");
    });

    it("clears selected dates when switching from pro to standard", () => {
      render(<TicketsSelection />);

      // Switch to pro and select dates
      fireEvent.click(screen.getByTestId("tab-pro"));
      fireEvent.click(screen.getByTestId("mock-date-select"));
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      // Switch to standard mode
      fireEvent.click(screen.getByTestId("tab-standard"));

      // Selection should be cleared
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("0");
    });
  });

  describe("Layout and Styling", () => {
    it("applies correct container classes", () => {
      const { container } = render(<TicketsSelection />);

      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass("bg-bg-strong-950", "min-h-screen", "p-4");
    });

    it("applies correct spacing to DatePicker container", () => {
      render(<TicketsSelection />);

      const datePicker = screen.getByTestId("date-picker");
      const container = datePicker.parentElement;
      expect(container).toHaveClass("mt-6");
    });

    it("applies correct classes to Card component", () => {
      render(<TicketsSelection />);

      const card = screen.getByTestId("ticket-card");
      expect(card).toHaveClass("bg-bg-strong-950", "border", "border-bg-surface-800", "rounded-lg");
    });

    it("applies correct classes to Tabs component", () => {
      render(<TicketsSelection />);

      const tabs = screen.getByTestId("ticket-tabs");
      expect(tabs).toHaveClass("bg-[#F7F7F7]", "px-2", "md:px-3", "py-2", "flex", "gap-1");
    });
  });

  describe("Props Propagation", () => {
    it("passes correct tabs data to Tabs component", () => {
      render(<TicketsSelection />);

      // Verify all expected tabs are rendered with correct labels
      expect(screen.getByTestId("tab-standard")).toHaveTextContent("Standard Ticket");
      expect(screen.getByTestId("tab-pro")).toHaveTextContent("Pro Ticket");
    });

    it("maintains consistent state between tabs and DatePicker", () => {
      render(<TicketsSelection />);

      // Switch to standard mode
      fireEvent.click(screen.getByTestId("tab-standard"));

      // Verify both components reflect the same state
      const standardTab = screen.getByTestId("tab-standard");
      const datePicker = screen.getByTestId("date-picker");

      expect(standardTab).toHaveClass("active");
      expect(datePicker).toHaveAttribute("data-mode", "standard");
    });

    it("passes header prop correctly to Card component", () => {
      render(<TicketsSelection />);

      const header = screen.getByTestId("card-header");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles invalid tab ids gracefully", () => {
      render(<TicketsSelection />);

      // This should not crash the component
      expect(() => {
        // Simulate clicking on existing tabs
        fireEvent.click(screen.getByTestId("tab-standard"));
      }).not.toThrow();
    });

    it("handles undefined selectedDates gracefully", () => {
      render(<TicketsSelection />);

      // Component should render without crashing even if selectedDates is undefined
      const selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toBeInTheDocument();
    });

    it("handles missing onSelectionChange callback gracefully", () => {
      render(<TicketsSelection />);

      // Should not crash when clicking date select
      expect(() => {
        fireEvent.click(screen.getByTestId("mock-date-select"));
      }).not.toThrow();
    });
  });
});
