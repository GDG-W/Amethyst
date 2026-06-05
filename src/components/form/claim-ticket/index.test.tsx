import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ExperienceLevelOptions, GenderOptions, RoleOptions } from "@/constants/options";
import claimTicketService from "@/services/claim-ticket.service";

import { toast } from "../../ui/toast";

import ClaimTicketForm from "./index";

jest.mock("@/services/claim-ticket.service");
jest.mock("../../ui/toast", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

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
    queryClient.clear();
  });

  it("renders all fields and submit button", () => {
    renderWithClient(<ClaimTicketForm token={token} toggleModal={formCallbackFn} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /gender/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /role/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /claim ticket/i })).toBeDisabled();
  });

  it("submits successfully when valid data is provided", async () => {
    (claimTicketService.claimTicket as jest.Mock).mockResolvedValue({ success: true });

    renderWithClient(<ClaimTicketForm token={token} toggleModal={formCallbackFn} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    await fillSelect(/gender/i, GenderOptions[0].label);
    await fillSelect(/role/i, RoleOptions[3].label);
    await fillSelect(/experience/i, ExperienceLevelOptions[0].label);

    const submitBtn = screen.getByRole("button", { name: /claim ticket/i });
    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(claimTicketService.claimTicket).toHaveBeenCalledWith({
        token,
        fullname: "John Doe",
        gender: GenderOptions[0].value,
        role: RoleOptions[3].value,
        experience: ExperienceLevelOptions[0].value,
      });
      expect(formCallbackFn).toHaveBeenCalledWith(true);
    });
  });

  it("shows toast error when claimTicket returns a string", async () => {
    (claimTicketService.claimTicket as jest.Mock).mockResolvedValue({
      success: false,
      message: "Payment not found!",
    });

    renderWithClient(<ClaimTicketForm token={token} toggleModal={formCallbackFn} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Jane Doe" },
    });
    await fillSelect(/gender/i, GenderOptions[1].label);
    await fillSelect(/role/i, RoleOptions[5].label);
    await fillSelect(/experience/i, ExperienceLevelOptions[1].label);

    const submitBtn = screen.getByRole("button", { name: /claim ticket/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(claimTicketService.claimTicket).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Something went wrong!", "Payment not found!");
    });
  });

  it("shows toast error when claimTicket throws", async () => {
    (claimTicketService.claimTicket as jest.Mock).mockRejectedValue(new Error("Network down"));

    renderWithClient(<ClaimTicketForm token={token} toggleModal={formCallbackFn} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Test User" },
    });
    await fillSelect(/gender/i, GenderOptions[0].label);
    await fillSelect(/role/i, RoleOptions[8].label);
    await fillSelect(/experience/i, ExperienceLevelOptions[2].label);

    const submitBtn = screen.getByRole("button", { name: /claim ticket/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(claimTicketService.claimTicket).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Something went wrong!", "Unexpected network error");
    });
  });
});
