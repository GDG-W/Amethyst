import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import claimTicket from "@/services/claim-ticket.service";

import { toast } from "../../ui/toast";

import ClaimTicketForm from "./index";

jest.mock("@/services/claim-ticket.service");
jest.mock("../../ui/toast", () => ({
  toast: {
    error: jest.fn(),
  },
}));

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "radix-portal");
  document.body.appendChild(portalRoot);
});

const fillSelect = async (label: string | RegExp, optionLabel: string) => {
  const trigger = screen.getByRole("combobox", { name: label });
  fireEvent.click(trigger);

  const option = await screen.findByRole("option", { name: optionLabel });
  fireEvent.click(option);
};

describe("ClaimTicketForm", () => {
  const formCallbackFn = jest.fn().mockResolvedValue(undefined);
  const token = "fake_token";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all fields and submit button", () => {
    render(<ClaimTicketForm token={token} formCallbackFn={formCallbackFn} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /gender/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /role/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /claim ticket/i })).toBeDisabled();
  });

  it("submits successfully when valid data is provided", async () => {
    (claimTicket as jest.Mock).mockResolvedValue(true);

    render(<ClaimTicketForm token={token} formCallbackFn={formCallbackFn} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    await fillSelect(/gender/i, "Female");
    await fillSelect(/role/i, "Frontend Engineer");
    await fillSelect(/experience/i, "Beginner - 0-1 year experience, just starting out");

    const submitBtn = screen.getByRole("button", { name: /claim ticket/i });
    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(claimTicket).toHaveBeenCalledWith({
        token,
        fullname: "John Doe",
        gender: "female",
        role: "frontend engineer",
        experience: "Beginner - 0-1 year experience, just starting out",
      });
      expect(formCallbackFn).toHaveBeenCalled();
    });
  });

  it("shows toast error when claimTicket returns a string", async () => {
    (claimTicket as jest.Mock).mockResolvedValue("Payment not found!");

    render(<ClaimTicketForm token={token} formCallbackFn={formCallbackFn} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Jane Doe" },
    });
    await fillSelect(/gender/i, "Female");
    await fillSelect(/role/i, "Backend Engineer");
    await fillSelect(/experience/i, "Beginner - 0-1 year experience, just starting out");

    const submitBtn = screen.getByRole("button", { name: /claim ticket/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(claimTicket).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Something went wrong!", "Payment not found!");
    });
  });

  it("shows toast error when claimTicket throws", async () => {
    (claimTicket as jest.Mock).mockRejectedValue(new Error("Network down"));

    render(<ClaimTicketForm token={token} formCallbackFn={formCallbackFn} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Test User" },
    });
    await fillSelect(/gender/i, "Male");
    await fillSelect(/role/i, "Frontend Engineer");
    await fillSelect(/experience/i, "Beginner - 0-1 year experience, just starting out");

    const submitBtn = screen.getByRole("button", { name: /claim ticket/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(claimTicket).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Something went wrong!", "Network down");
    });
  });
});
