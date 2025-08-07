import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import Tabs from ".";

describe("Tabs", () => {
  const mockOnTabChange = jest.fn();
  const defaultTabs = [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders all tabs", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      expect(screen.getByText("Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Tab 2")).toBeInTheDocument();
      expect(screen.getByText("Tab 3")).toBeInTheDocument();
    });

    it("renders without tabs prop (empty array)", () => {
      const { container } = render(<Tabs activeTab='tab1' onTabChange={mockOnTabChange} />);

      // Container should exist but no tab buttons
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Tabs
          tabs={defaultTabs}
          activeTab='tab1'
          onTabChange={mockOnTabChange}
          className='custom-class'
        />,
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("applies default container classes", () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />,
      );

      expect(container.firstChild).toHaveClass(
        "bg-[#F7F7F7]",
        "px-2",
        "md:px-3",
        "py-2",
        "flex",
        "gap-1",
        "border",
        "border-y-[#EBEBEB]",
        "-mx-4",
      );
    });
  });

  describe("Active Tab Styling", () => {
    it("applies active styles to the active tab", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab2' onTabChange={mockOnTabChange} />);

      const activeTab = screen.getByText("Tab 2").closest("button");
      expect(activeTab).toHaveClass(
        "bg-white",
        "text-black",
        "shadow-sm",
        "shadow-[#0E121B08]",
        "border",
        "border-[#EBEBEB]",
      );
    });

    it("applies inactive styles to non-active tabs", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab2' onTabChange={mockOnTabChange} />);

      const inactiveTab = screen.getByText("Tab 1").closest("button");
      expect(inactiveTab).toHaveClass("bg-transparent", "text-[#A3A3A3]", "hover:text-gray-700");
    });
  });

  describe("Tab Interactions", () => {
    it("calls onTabChange when tab is clicked", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      fireEvent.click(screen.getByText("Tab 2"));
      expect(mockOnTabChange).toHaveBeenCalledWith("tab2");
    });

    it("calls onTabChange with correct id for each tab", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      fireEvent.click(screen.getByText("Tab 3"));
      expect(mockOnTabChange).toHaveBeenCalledWith("tab3");

      fireEvent.click(screen.getByText("Tab 1"));
      expect(mockOnTabChange).toHaveBeenCalledWith("tab1");
    });

    it("allows clicking on already active tab", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      fireEvent.click(screen.getByText("Tab 1"));
      expect(mockOnTabChange).toHaveBeenCalledWith("tab1");
    });
  });

  describe("Disabled Tabs", () => {
    const tabsWithDisabled = [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2", disabled: true },
      { id: "tab3", label: "Tab 3" },
    ];

    it("disables tabs when disabled prop is true", () => {
      render(<Tabs tabs={tabsWithDisabled} activeTab='tab1' onTabChange={mockOnTabChange} />);

      const disabledTab = screen.getByText("Tab 2").closest("button");
      expect(disabledTab).toBeDisabled();
    });

    it("applies disabled styling to disabled tabs", () => {
      render(<Tabs tabs={tabsWithDisabled} activeTab='tab1' onTabChange={mockOnTabChange} />);

      const disabledTab = screen.getByText("Tab 2").closest("button");
      expect(disabledTab).toHaveClass("opacity-50", "cursor-not-allowed");
    });

    it("does not call onTabChange when disabled tab is clicked", () => {
      render(<Tabs tabs={tabsWithDisabled} activeTab='tab1' onTabChange={mockOnTabChange} />);

      fireEvent.click(screen.getByText("Tab 2"));
      expect(mockOnTabChange).not.toHaveBeenCalled();
    });

    it("enables tabs when disabled prop is false or undefined", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      const enabledTab = screen.getByText("Tab 1").closest("button");
      expect(enabledTab).not.toBeDisabled();
      expect(enabledTab).toHaveClass("cursor-pointer");
    });
  });

  describe("Tab Keys and Fallbacks", () => {
    it("uses tab id as key when available", () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />,
      );

      // Check that buttons are rendered (indirect test of key usage)
      const buttons = container.querySelectorAll("button");
      expect(buttons).toHaveLength(3);
    });

    it("handles tabs without id using index as key", () => {
      const tabsWithoutId = [
        { id: "0", label: "Tab 1" },
        { id: "1", label: "Tab 2" },
      ];

      const { container } = render(
        <Tabs tabs={tabsWithoutId} activeTab='0' onTabChange={mockOnTabChange} />,
      );

      const buttons = container.querySelectorAll("button");
      expect(buttons).toHaveLength(2);
    });
  });

  describe("Responsive Text Sizing", () => {
    it("applies responsive text classes", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      const tabText = screen.getByText("Tab 1");
      expect(tabText).toHaveClass("text-xs", "md:text-base");
    });
  });

  describe("Layout Classes", () => {
    it("applies flex-1 to tab buttons for equal width distribution", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      const tabButton = screen.getByText("Tab 1").closest("button");
      expect(tabButton).toHaveClass("flex-1");
    });

    it("applies responsive padding classes", () => {
      render(<Tabs tabs={defaultTabs} activeTab='tab1' onTabChange={mockOnTabChange} />);

      const tabButton = screen.getByText("Tab 1").closest("button");
      expect(tabButton).toHaveClass("px-2", "md:px-4", "py-2");
    });
  });
});
