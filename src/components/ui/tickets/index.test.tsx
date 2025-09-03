import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TicketList from "./index";

describe("TicketList Component", () => {
  describe("Core Functionality", () => {
    it("renders the correct number of tickets", () => {
      const { container } = render(<TicketList />);

      // Count ticket containers by their clip path styling
      const ticketElements = container.querySelectorAll("[style*='clipPath']");
      expect(ticketElements).toHaveLength(5);
    });

    it("applies pro tag logic correctly - only shows for 20th November Pro ticket", () => {
      render(<TicketList />);

      // Based on the tickets array, only the 20th November Pro ticket should show pro tag
      const proTags = document.querySelectorAll("[data-testid='pro-tag'], .pro-tag");
      expect(proTags).toHaveLength(1);
    });

    it("applies correct border colors for different dates", () => {
      const { container } = render(<TicketList />);

      // Should have tickets with different colored borders based on dates
      expect(container.querySelector(".bg-\\[\\#34A853\\]")).toBeInTheDocument(); // 18th - green
      expect(container.querySelector(".bg-\\[\\#EA4335\\]")).toBeInTheDocument(); // 19th - red
      expect(container.querySelector(".bg-\\[\\#F9AB00\\]")).toBeInTheDocument(); // 20th - yellow
      expect(container.querySelector(".bg-\\[\\#4285F4\\]")).toBeInTheDocument(); // 21st - blue
      expect(container.querySelector(".bg-\\[\\#1E1E1E\\]")).toBeInTheDocument(); // 22nd - black
    });

    it("renders tickets with barcode containers", () => {
      const { container } = render(<TicketList />);

      // Should have 5 barcode containers (look for the positioned containers that hold barcodes)
      const barcodeContainers = container.querySelectorAll(
        ".absolute.top-6.right-16, .absolute.top-12"
      );
      expect(barcodeContainers.length).toBeGreaterThanOrEqual(5);
    });

    it("maintains scrollable container structure", () => {
      const { container } = render(<TicketList />);

      expect(container.querySelector(".custom-scrollbar")).toBeInTheDocument();
      expect(container.querySelector(".overflow-y-auto")).toBeInTheDocument();
    });

    it("handles tickets with default time and ticket type values", () => {
      const { container } = render(<TicketList />);

      // The component should render without errors even if some tickets
      // rely on default props (this tests the default prop logic indirectly)
      const ticketElements = container.querySelectorAll("[style*='clipPath']");
      expect(ticketElements).toHaveLength(5);
    });
  });
});
