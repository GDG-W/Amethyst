import React from "react";
import { render, screen } from "@testing-library/react";

import ButtonPlayground from "./button.playground";
import InputPlayground from "./input.playground";
import { ComponentSection } from "./component.section";
import { ComponentSubSection } from "./component.sub.section";

describe("Playground Components", () => {
  describe("ButtonPlayground", () => {
    it("renders the Buttons section", () => {
      render(<ButtonPlayground />);
      expect(screen.getByText("Buttons")).toBeInTheDocument();
      expect(screen.getByText("Primary Buttons")).toBeInTheDocument();
      expect(screen.getByText("Outline & Danger Buttons")).toBeInTheDocument();
      expect(screen.getByText("Other Variants")).toBeInTheDocument();
    });
    it("renders loading spinner in Primary Buttons", () => {
      render(<ButtonPlayground />);
      expect(screen.getByText("Loading")).toBeInTheDocument();
      const buttons = screen.getAllByRole("button");
      expect(buttons[0].querySelector(".animate-spin")).toBeInTheDocument();
    });
    it("renders Outline and Danger button text", () => {
      render(<ButtonPlayground />);
      expect(screen.getByText("Export Selected Orders")).toBeInTheDocument();
      expect(screen.getByText("Delete Selected Items")).toBeInTheDocument();
    });
  });

  describe("InputPlayground", () => {
    it("renders the Inputs section", () => {
      render(<InputPlayground />);
      expect(screen.getByText("Inputs")).toBeInTheDocument();
      expect(screen.getByText("Basic Inputs")).toBeInTheDocument();
      expect(screen.getByText("Input States")).toBeInTheDocument();
      expect(screen.getByText("Textarea, Password & Select")).toBeInTheDocument();
    });
    it("renders disabled input and error state", () => {
      render(<InputPlayground />);
      expect(screen.getByPlaceholderText("0.00")).toBeDisabled();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
    it("renders textarea and select", () => {
      render(<InputPlayground />);
      expect(screen.getByPlaceholderText("Enter description here")).toBeInTheDocument();
      expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
      expect(screen.getByText("Select field")).toBeInTheDocument();
    });
  });

  describe("ComponentSection", () => {
    it("renders section title and children", () => {
      render(
        <ComponentSection title='Test Section'>
          <div>Child Content</div>
        </ComponentSection>,
      );
      expect(screen.getByText("Test Section")).toBeInTheDocument();
      expect(screen.getByText("Child Content")).toBeInTheDocument();
    });
  });

  describe("ComponentSubSection", () => {
    it("renders subsection title and children", () => {
      render(
        <ComponentSubSection title='SubSection'>
          <div>Sub Content</div>
        </ComponentSubSection>,
      );
      expect(screen.getByText("SubSection")).toBeInTheDocument();
      expect(screen.getByText("Sub Content")).toBeInTheDocument();
    });
  });
});
