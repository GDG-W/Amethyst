import { render, screen } from "@testing-library/react";
import React from "react";

import ButtonPlayground from "./buttonPlayground";

describe("Playground Components", () => {
  describe("ButtonPlayground", () => {
    it("renders the Buttons section and all groups", () => {
      render(<ButtonPlayground />);
      expect(screen.getByText("Buttons")).toBeInTheDocument();
      expect(screen.getByText("Primary Buttons")).toBeInTheDocument();
      expect(screen.getByText("Outline & Danger Buttons")).toBeInTheDocument();
      expect(screen.getByText("Other Variants")).toBeInTheDocument();
    });
    it("renders all button variants and labels", () => {
      render(<ButtonPlayground />);
      [
        "Loading",
        "With icon (right)",
        "Text only",
        "Outline with icon",
        "Danger",
        "Danger with icon",
        "Ghost with left icon",
        "Primary with custom background color",
        "Disabled",
      ].forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
    it("renders buttons with icons and disabled state", () => {
      render(<ButtonPlayground />);
      expect(screen.getByText("Delete Selected Items")).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      const disabledButton = screen.getByText("Login").closest("button");
      expect(disabledButton).toBeDisabled();
    });
  });

  // Example extensible test for future playground sections
  describe("Playground Section Structure", () => {
    function testPlaygroundSection(Component: React.ComponentType, sectionTitle: string) {
      it(`renders Section, SectionTitle, and ComponentGrid for ${sectionTitle}`, () => {
        const { container } = render(<Component />);
        // Section
        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
        // SectionTitle as first child
        const firstChild = section && section.firstElementChild;
        expect(firstChild).toBeTruthy();
        expect(firstChild?.textContent).toBe(sectionTitle);
        // ComponentGrid exists after SectionTitle
        const grid = section && section.querySelector(".grid");
        expect(grid).toBeInTheDocument();
      });
    }

    testPlaygroundSection(ButtonPlayground, "Buttons");
    // Call testPlaygroundSection with the component and its section title for more playgrounds
  });
});
