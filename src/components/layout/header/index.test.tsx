import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { usePathname } from "next/navigation";

import { useGetuser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useAuth";

import Header from ".";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/hooks/useUser", () => ({
  useGetuser: jest.fn(),
}));

jest.mock("@/hooks/useAuth", () => ({
  useLogout: jest.fn(),
}));

jest.mock(
  "@/components/icons/logo",
  () =>
    function MockLogo() {
      return <div data-testid="logo">Logo</div>;
    }
);

const mockedUsePathname = usePathname as jest.Mock;
const mockedUseGetUser = useGetuser as jest.Mock;
const mockedUseLogout = useLogout as jest.Mock;

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseGetUser.mockReturnValue({ user_id: null });
    mockedUseLogout.mockReturnValue(jest.fn());
  });

  it("renders the header container", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the logo", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<Header />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the 'Login' link when on the buy page and user is not logged in", () => {
    mockedUsePathname.mockReturnValue("/buy");
    mockedUseGetUser.mockReturnValue({ user_id: null });
    render(<Header />);
    const link = screen.getByRole("link", { name: /login/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });

  it("renders the 'Logout' button when on the buy page and user is logged in", () => {
    mockedUsePathname.mockReturnValue("/buy");
    mockedUseGetUser.mockReturnValue({ user_id: "user-123" });
    render(<Header />);
    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toBeInTheDocument();
  });

  it("renders the 'Buy Tickets!' button on the login page", () => {
    mockedUsePathname.mockReturnValue("/login");
    render(<Header />);
    const link = screen.getByRole("link", { name: /buy tickets/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/buy");
  });

  it("renders the 'Buy Tickets!' button on the upgrade page", () => {
    mockedUsePathname.mockReturnValue("/upgrade");
    render(<Header />);
    const link = screen.getByRole("link", { name: /buy tickets/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/buy");
  });

  it("renders the 'Logout' button on the dashboard page", () => {
    mockedUsePathname.mockReturnValue("/dashboard");
    render(<Header />);
    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toBeInTheDocument();
  });

  it("does not render action buttons on other pages", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<Header />);
    const loginLink = screen.queryByRole("link", { name: /login/i });
    const logoutBtn = screen.queryByRole("button", { name: /logout/i });
    const buyLink = screen.queryByRole("link", { name: /buy tickets/i });
    expect(loginLink).not.toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
    expect(buyLink).not.toBeInTheDocument();
  });
});
