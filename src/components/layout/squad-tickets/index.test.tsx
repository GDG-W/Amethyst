import "@testing-library/jest-dom";

import { render, screen, within } from "@testing-library/react";

import TicketSection from "./index";

interface MockTicketCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  variant: "standard" | "pro";
  onBuyTickets?: () => void;
}

jest.mock("./ticket-card", () => {
  return function MockTicketCard({
    title,
    price,
    description,
    features,
    variant,
  }: MockTicketCardProps) {
    return (
      <div data-testid={`ticket-card-${variant}`}>
        <h3>{title}</h3>
        <p>{price}</p>
        <p>{description}</p>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <span data-testid="variant">{variant}</span>
      </div>
    );
  };
});

beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

describe("TicketSection", () => {
  describe("Section Structure", () => {
    it("renders the main section with correct styling", () => {
      render(<TicketSection />);

      const section = screen.getByRole("region");
      expect(section).toHaveClass(
        "flex",
        "w-full",
        "flex-col",
        "items-center",
        "justify-center",
        "overflow-hidden",
        "bg-[#1E1E1E]"
      );
    });

    it("renders the main heading", () => {
      render(<TicketSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent?.replace(/\s+/g, "")).toBe("BUYTICKETSFORYOUANDYOURSQUAD");
      expect(heading).toHaveClass("font-akira", "heading-5", "md:heading-1", "text-white");
    });

    it("renders the description paragraph", () => {
      render(<TicketSection />);

      const description = screen.getByText(/DevFest hits different when you roll with your crew/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("text-[#CCCCCC]");
    });
  });

  describe("Ticket Cards", () => {
    it("renders exactly 2 ticket cards", () => {
      render(<TicketSection />);

      const ticketCards = screen.getAllByTestId(/ticket-card-/);
      expect(ticketCards).toHaveLength(2);
    });

    it("renders standard ticket card with correct props", () => {
      render(<TicketSection />);

      const standardCard = screen.getByTestId("ticket-card-standard");
      expect(standardCard).toBeInTheDocument();

      const { getByText } = within(standardCard);
      expect(getByText("STANDARD TICKET")).toBeInTheDocument();
      expect(getByText("8,000 per day")).toBeInTheDocument();
      expect(getByText(/Open to everyone — whether you're just starting out/)).toBeInTheDocument();

      expect(getByText("Access to all talks and sessions")).toBeInTheDocument();
      expect(getByText("Access to one day")).toBeInTheDocument();
      expect(getByText("Access to sponsor booths")).toBeInTheDocument();
      expect(getByText("Entry to the networking area")).toBeInTheDocument();
    });

    it("renders pro ticket card with correct props", () => {
      render(<TicketSection />);

      const proCard = screen.getByTestId("ticket-card-pro");
      expect(proCard).toBeInTheDocument();

      const { getByText } = within(proCard);
      expect(getByText("FULL EXPERIENCE TICKET")).toBeInTheDocument();
      expect(getByText("15,000 BOTH DAYS")).toBeInTheDocument();
      expect(getByText(/For those who want more access and a more focused/)).toBeInTheDocument();

      expect(getByText("Access to all talks and sessions")).toBeInTheDocument();
      expect(getByText("Access to both days")).toBeInTheDocument();
      expect(getByText("Access to sponsor booths")).toBeInTheDocument();
      expect(getByText("Entry to the networking area")).toBeInTheDocument();
    });

    it("passes correct variant props to ticket cards", () => {
      render(<TicketSection />);

      const variants = screen.getAllByTestId("variant");
      expect(variants).toHaveLength(2);
      expect(variants[0]).toHaveTextContent("standard");
      expect(variants[1]).toHaveTextContent("pro");
    });
  });

  describe("Content Verification", () => {
    it("displays correct pricing information", () => {
      render(<TicketSection />);

      expect(screen.getByText("8,000 per day")).toBeInTheDocument();
      expect(screen.getByText("15,000 BOTH DAYS")).toBeInTheDocument();
    });

    it("displays all standard ticket features", () => {
      render(<TicketSection />);
      const standardCard = screen.getByTestId("ticket-card-standard");

      const standardFeatures = [
        "Access to all talks and sessions",
        "Access to one day",
        "Access to sponsor booths",
        "Entry to the networking area",
      ];

      standardFeatures.forEach((feature) => {
        expect(within(standardCard).getByText(feature)).toBeInTheDocument();
      });
    });

    it("displays all pro ticket features", () => {
      render(<TicketSection />);
      const proCard = screen.getByTestId("ticket-card-pro");

      const proFeatures = [
        "Access to all talks and sessions",
        "Access to both days",
        "Access to sponsor booths",
        "Entry to the networking area",
      ];

      proFeatures.forEach((feature) => {
        expect(within(proCard).getByText(feature)).toBeInTheDocument();
      });
    });
  });

  describe("Layout and Responsive Design", () => {
    it("applies correct responsive classes to heading", () => {
      render(<TicketSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("heading-5", "md:heading-1");
      expect(heading).toHaveClass("leading-[2rem]", "md:leading-[4rem]");
      expect(heading).toHaveClass("w-5/6", "md:w-full");
    });

    it("applies correct responsive classes to description", () => {
      render(<TicketSection />);

      const description = screen.getByText(/DevFest hits different/);
      expect(description).toHaveClass("label-4", "md:label-3");
      expect(description).toHaveClass("w-5/6", "max-w-2xl");
    });

    it("has proper container layout for ticket cards", () => {
      render(<TicketSection />);

      const ticketContainer = screen.getByTestId("ticket-card-standard").parentElement;
      expect(ticketContainer).toHaveClass(
        "flex",
        "h-full",
        "w-full",
        "flex-wrap",
        "justify-center",
        "gap-8",
        "px-5"
      );
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<TicketSection />);

      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it("uses semantic section element", () => {
      render(<TicketSection />);

      const section = screen.getByRole("region");
      expect(section).toBeInTheDocument();
    });

    it("has readable text content", () => {
      render(<TicketSection />);

      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      expect(screen.getByText(/DevFest hits different/)).toBeInTheDocument();
    });
  });
});

describe("TicketSection Data Structure", () => {
  it("maintains correct ticket data structure", () => {
    render(<TicketSection />);

    expect(screen.getByTestId("ticket-card-standard")).toBeInTheDocument();
    expect(screen.getByTestId("ticket-card-pro")).toBeInTheDocument();
  });

  it("handles ticket mapping correctly", () => {
    render(<TicketSection />);

    const allTicketCards = screen.getAllByTestId(/^ticket-card-/);
    expect(allTicketCards).toHaveLength(2);
  });

  it("renders tickets in correct order", () => {
    render(<TicketSection />);

    const ticketCards = screen.getAllByTestId(/^ticket-card-/);
    expect(ticketCards[0]).toHaveAttribute("data-testid", "ticket-card-standard");
    expect(ticketCards[1]).toHaveAttribute("data-testid", "ticket-card-pro");
  });
});
