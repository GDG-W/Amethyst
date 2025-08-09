import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

import SelectField from ".";

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "radix-portal");
  document.body.appendChild(portalRoot);
});

const options = [
  { label: "Option 1", value: "option_1" },
  { label: "Option 2", value: "option_2" },
];

describe("SelectField", () => {
  it("renders the placeholder", () => {
    render(<SelectField options={options} value="" onChange={() => {}} placeholder="Choose one" />);
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });

  it("renders label and extra label", () => {
    render(
      <SelectField
        label="Main Label"
        extraLabel="Extra Info"
        options={options}
        value=""
        onChange={() => {}}
        placeholder="Choose one"
      />
    );
    expect(screen.getByText("Main Label")).toBeInTheDocument();
    expect(screen.getByText("Extra Info")).toBeInTheDocument();
  });

  it("displays dropdown options when trigger is clicked", async () => {
    render(<SelectField options={options} value="" onChange={() => {}} placeholder="Choose one" />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  it("calls onChange when an item is selected", async () => {
    const handleChange = jest.fn();

    render(
      <SelectField options={options} value="" onChange={handleChange} placeholder="Choose one" />
    );

    fireEvent.click(screen.getByRole("combobox"));

    const option = await screen.findByText("Option 2");
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith("option_2");
  });

  it("displays the error message", () => {
    render(
      <SelectField
        options={options}
        value=""
        onChange={() => {}}
        placeholder="Choose one"
        error="This field is required"
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
