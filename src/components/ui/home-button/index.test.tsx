import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Button from ".";

type ButtonVariant = "primary" | "secondary" | "ghost";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders with children text", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("renders with React node children", () => {
      render(
        <Button>
          <span data-testid="icon">🚀</span>
          <span>Launch</span>
        </Button>
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent("🚀Launch");
    });
  });

  describe("Variants", () => {
    it("renders primary variant by default", () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-[#F6B51E]");
      expect(button).toHaveClass("border-[#1E1E1E]");
      expect(button).toHaveClass("w-[10.9375rem]");
      expect(button).toHaveClass("md:w-[16.125rem]");
    });

    it("renders secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-[#1E1E1E]");
      expect(button).toHaveClass("border-2");
      expect(button).toHaveClass("border-white");
      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("w-[13.81rem]");
    });

    it("renders ghost variant correctly", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-[#1E1E1E]");
      expect(button).toHaveClass("border-none");
      expect(button).toHaveClass("text-white");
    });
  });

  describe("Base Classes", () => {
    it("applies all base classes", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("p-4");
      expect(button).toHaveClass("h-[52px]");
      expect(button).toHaveClass("md:h-[3.75rem]");
      expect(button).toHaveClass("rounded-full");
      expect(button).toHaveClass("heading-6");
      expect(button).toHaveClass("border-4");
      expect(button).toHaveClass("transition-all");
      expect(button).toHaveClass("duration-200");
      expect(button).toHaveClass("hover:scale-105");
      expect(button).toHaveClass("font-akira");
    });
  });

  describe("Click Handling", () => {
    it("calls onClick when provided", () => {
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Clickable</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("does not throw error when onClick is not provided", () => {
      render(<Button>No Click Handler</Button>);

      expect(() => {
        fireEvent.click(screen.getByRole("button"));
      }).not.toThrow();
    });

    it("calls onClick multiple times when clicked multiple times", () => {
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Multi Click</Button>);
      const button = screen.getByRole("button");

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Custom Classes", () => {
    it("applies custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("custom-class");
    });

    it("applies multiple custom classes", () => {
      render(<Button className="custom-1 custom-2">Multiple Custom</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("custom-1");
      expect(button).toHaveClass("custom-2");
    });

    it("combines custom classes with base and variant classes", () => {
      render(
        <Button variant="secondary" className="extra-margin">
          Combined Classes
        </Button>
      );
      const button = screen.getByRole("button");

      expect(button).toHaveClass("p-4");
      expect(button).toHaveClass("rounded-full");

      expect(button).toHaveClass("bg-[#1E1E1E]");
      expect(button).toHaveClass("text-white");

      expect(button).toHaveClass("extra-margin");
    });

    it("handles empty className prop", () => {
      render(<Button className="">Empty Class</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("p-4");
      expect(button).toHaveClass("bg-[#F6B51E]");
    });
  });

  describe("Integration Tests", () => {
    it("works with all props combined", () => {
      const mockOnClick = jest.fn();
      render(
        <Button variant="ghost" onClick={mockOnClick} className="integration-test">
          <span>🎯</span> Full Test
        </Button>
      );

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("🎯 Full Test");

      expect(button).toHaveClass("bg-[#1E1E1E]");
      expect(button).toHaveClass("border-none");
      expect(button).toHaveClass("p-4");
      expect(button).toHaveClass("integration-test");

      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("maintains accessibility attributes", () => {
      render(<Button>Accessible Button</Button>);
      const button = screen.getByRole("button");

      expect(button.tagName).toBe("BUTTON");
      expect(button).toBeVisible();
      expect(button).toBeEnabled();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined variant gracefully", () => {
      render(<Button variant={undefined as unknown as ButtonVariant}>Undefined Variant</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-[#F6B51E]");
    });

    it("handles null children", () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("");
    });

    it("handles empty string children", () => {
      render(<Button>{""}</Button>);
      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("");
    });

    it("handles complex React node children", () => {
      render(
        <Button>
          <div>
            <span>Nested</span>
            <strong>Content</strong>
          </div>
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("NestedContent");
      expect(button.querySelector("div")).toBeInTheDocument();
      expect(button.querySelector("span")).toBeInTheDocument();
      expect(button.querySelector("strong")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for primary variant", () => {
      const { container } = render(<Button>Primary Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for secondary variant", () => {
      const { container } = render(<Button variant="secondary">Secondary Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for ghost variant", () => {
      const { container } = render(<Button variant="ghost">Ghost Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
