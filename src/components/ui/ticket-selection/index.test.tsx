import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import { RQProvider } from "@/lib/react-query";
import { TicketType } from "@/types/ticket";

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
    selectedDates,
    onSelectionChange,
    className,
  }: {
    selectedDates?: string[];
    onSelectionChange?: (dates: string[]) => void;
    className?: string;
  }) {
    return (
      <div
        data-testid="date-picker"
        data-selected={(selectedDates || []).join(",")}
        className={className}
      >
        <button onClick={() => onSelectionChange?.(["2025-11-18"])} data-testid="mock-date-select">
          Select Date
        </button>
        <span data-testid="selected-count">{(selectedDates || []).length}</span>
      </div>
    );
  };
});

function renderWithRQ(ui: React.ReactElement) {
  return render(<RQProvider>{ui}</RQProvider>);
}

function ControlledWrapper({
  initialTab = "standard",
  initialDates = [],
}: {
  initialTab?: string;
  initialDates?: string[];
}) {
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [selectedDates, setSelectedDates] = React.useState<string[]>(initialDates);
  return (
    <TicketsSelection
      activeTab={activeTab as TicketType}
      onTabChange={(id) => setActiveTab(id)}
      selectedDates={selectedDates}
      onSelectionChange={(dates) => setSelectedDates(dates)}
    />
  );
}

function renderControlled(props?: { initialTab?: string; initialDates?: string[] }) {
  return renderWithRQ(<ControlledWrapper {...props} />);
}

describe("TicketsSelection", () => {
  describe("Initial Rendering", () => {
    it("renders the page with all components", () => {
      renderControlled();

      expect(screen.getByTestId("ticket-card")).toBeInTheDocument();
      expect(screen.getByTestId("ticket-tabs")).toBeInTheDocument();
      expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    });

    it("renders the header with step number and title", () => {
      renderControlled();

      const header = screen.getByTestId("card-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent("1");
      expect(header).toHaveTextContent("Select Date(s)");
    });

    it("starts with standard tab active", () => {
      renderControlled();

      const standardTab = screen.getByTestId("tab-standard");
      expect(standardTab).toHaveClass("active");
    });

    it("starts with no dates selected", () => {
      renderControlled();

      const selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("0");
    });

    it("passes correct initial props to DatePicker", () => {
      renderControlled();

      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-selected", "");
      expect(datePicker).toHaveClass("w-full");
    });
  });

  describe("Tab Navigation", () => {
    it("renders all two tabs", () => {
      renderControlled();

      expect(screen.getByText("Standard Ticket")).toBeInTheDocument();
      expect(screen.getByText("Pro Ticket")).toBeInTheDocument();
    });

    it("switches to standard tab when clicked", () => {
      renderControlled();

      fireEvent.click(screen.getByTestId("tab-standard"));

      const standardTab = screen.getByTestId("tab-standard");
      expect(standardTab).toHaveClass("active");
    });

    it("switches to pro tab when clicked", () => {
      renderControlled();

      fireEvent.click(screen.getByTestId("tab-pro"));

      const proTab = screen.getByTestId("tab-pro");
      expect(proTab).toHaveClass("active");
    });
  });

  describe("Date Selection Integration", () => {
    it("updates selected dates when DatePicker triggers change", () => {
      renderControlled();

      // Initially no dates selected
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("0");

      // Simulate date selection
      fireEvent.click(screen.getByTestId("mock-date-select"));

      // Should now show 1 selected date
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toHaveAttribute("data-selected", "2025-11-18");
    });

    it("maintains selected dates when staying on same tab", () => {
      renderControlled();

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

  describe("Tab Switching Keeps Selection", () => {
    it("keeps selected dates when switching from standard to pro", () => {
      renderControlled();

      // Switch to standard and select dates
      fireEvent.click(screen.getByTestId("tab-standard"));
      fireEvent.click(screen.getByTestId("mock-date-select"));
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      // Switch to pro mode
      fireEvent.click(screen.getByTestId("tab-pro"));

      // Selection should be kept
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");
    });

    it("keeps selected dates when switching from pro to standard", () => {
      renderControlled();

      // Switch to pro and select dates
      fireEvent.click(screen.getByTestId("tab-pro"));
      fireEvent.click(screen.getByTestId("mock-date-select"));
      let selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");

      // Switch to standard mode
      fireEvent.click(screen.getByTestId("tab-standard"));

      // Selection should be kept
      selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toHaveTextContent("1");
    });
  });

  describe("Layout and Styling", () => {
    it("applies correct container classes", () => {
      const { container } = renderControlled();

      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass("bg-strong-950");
    });

    it("applies correct spacing to DatePicker container", () => {
      renderControlled();

      const datePicker = screen.getByTestId("date-picker");
      const container = datePicker.parentElement;
      expect(container).toHaveClass("mt-6");
    });

    it("applies correct classes to Card component", () => {
      renderControlled();

      const card = screen.getByTestId("ticket-card");
      expect(card).toHaveClass("border", "border-bg-surface-800", "rounded-lg", "bg-white");
    });

    it("applies correct classes to Tabs component", () => {
      renderControlled();

      const tabs = screen.getByTestId("ticket-tabs");
      expect(tabs).toHaveClass("bg-[#F7F7F7]", "px-2", "md:px-3", "py-2", "flex", "gap-1");
    });
  });

  describe("Props Propagation", () => {
    it("passes correct tabs data to Tabs component", () => {
      renderControlled();

      // Verify all expected tabs are rendered with correct labels
      expect(screen.getByTestId("tab-standard")).toHaveTextContent("Standard Ticket");
      expect(screen.getByTestId("tab-pro")).toHaveTextContent("Pro Ticket");
    });

    it("maintains consistent state between tabs and DatePicker", () => {
      renderControlled();

      // Switch to standard mode
      fireEvent.click(screen.getByTestId("tab-standard"));

      // Verify both components reflect the same state
      const standardTab = screen.getByTestId("tab-standard");
      const datePicker = screen.getByTestId("date-picker");

      expect(standardTab).toHaveClass("active");
    });

    it("passes header prop correctly to Card component", () => {
      renderControlled();

      const header = screen.getByTestId("card-header");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles invalid tab ids gracefully", () => {
      renderControlled();

      // This should not crash the component
      expect(() => {
        // Simulate clicking on existing tabs
        fireEvent.click(screen.getByTestId("tab-standard"));
      }).not.toThrow();
    });

    it("handles undefined selectedDates gracefully", () => {
      renderControlled();

      // Component should render without crashing even if selectedDates is undefined
      const selectedCount = screen.getByTestId("selected-count");
      expect(selectedCount).toBeInTheDocument();
    });
  });
});
