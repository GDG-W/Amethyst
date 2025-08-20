import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import Modal from "./modal-overlay";

beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
  document.documentElement.className = "";
  document.getElementById("modal-root")!.className = "";
});

describe("Modal component", () => {
  test("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false}>
        <div>Hidden content</div>
      </Modal>
    );
    expect(screen.queryByText(/Hidden content/i)).not.toBeInTheDocument();
  });

  test("renders children inside #modal-root when isOpen is true", () => {
    render(
      <Modal isOpen={true}>
        <div>Visible content</div>
      </Modal>
    );
    const modalRoot = document.getElementById("modal-root");
    expect(modalRoot).toHaveTextContent("Visible content");
  });

  test("locks scroll when open", () => {
    render(
      <Modal isOpen={true}>
        <div>Scroll locked</div>
      </Modal>
    );
    expect(document.documentElement.classList.contains("overflow-hidden")).toBe(true);
  });

  test("removes scroll lock when closed", () => {
    const { rerender } = render(
      <Modal isOpen={true}>
        <div>Closing soon</div>
      </Modal>
    );
    rerender(
      <Modal isOpen={false}>
        <div>Closing soon</div>
      </Modal>
    );
    expect(document.documentElement.classList.contains("overflow-hidden")).toBe(false);
  });
});
