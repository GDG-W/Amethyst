import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

import SuccessCard from ".";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SuccessCard", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders title and summary", () => {
    render(
      <SuccessCard
        title='Payment Successful!'
        summary='You have successfully paid for your ticket.'
      />,
    );

    expect(screen.getByText(/payment successful!/i)).toBeInTheDocument();
    expect(screen.getByText(/you have successfully paid/i)).toBeInTheDocument();
  });

  it("renders title only when summary is not provided", () => {
    render(<SuccessCard title='Email Verified!' />);

    expect(screen.getByText(/email verified!/i)).toBeInTheDocument();
    expect(screen.queryByText(/you have successfully/i)).not.toBeInTheDocument();
  });

  it("renders buttons with correct text", () => {
    render(<SuccessCard title='Success!' />);

    expect(screen.getByRole("button", { name: /Buy more tickets/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go to dashboard/i })).toBeInTheDocument();
  });

  it("renders buttons with correct text - when links are defined", () => {
    render(
      <SuccessCard
        title='Success!'
        links={[
          { id: "home", type: "primary", href: "/", text: "go home" },
          { id: "buy", type: "secondary", href: "/buy", text: "buy more" },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: /go home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buy more/i })).toBeInTheDocument();
  });

  it('calls router.push("/") when "go home" is clicked', () => {
    render(
      <SuccessCard
        title='Success!'
        links={[
          { id: "home", type: "primary", href: "/", text: "go home" },
          { id: "buy", type: "secondary", href: "/buy", text: "buy more" },
        ]}
      />,
    );

    const goHomeButton = screen.getByRole("button", { name: /go home/i });
    goHomeButton.click();

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
