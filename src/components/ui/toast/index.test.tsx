import React from "react";
import { render, screen, act } from "@testing-library/react";

import * as sonner from "sonner";

import Toaster, { toast } from "./index";

jest.mock("@/components/icons/alert", () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="alert-icon" {...props} />,
}));

describe("Custom Toaster", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Toaster component", () => {
    render(<Toaster />);
    expect(true).toBe(true);
  });

  it("renders a custom error toast with correct title and message", async () => {
    render(<Toaster />);

    act(() => {
      toast.error("Test Error", "Something went wrong");
    });

    expect(await screen.findByText("Test Error", { exact: false })).toBeInTheDocument();

    expect(screen.getByText("Something went wrong", { exact: false })).toBeInTheDocument();

    expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
  });

  it("uses sonner.toast.custom internally", () => {
    const spy = jest.spyOn(sonner.toast, "custom");
    render(<Toaster />);

    act(() => {
      toast.error("Spy Test", "With spy");
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const callArg = spy.mock.calls[0][0];
    expect(typeof callArg).toBe("function");
  });
});
