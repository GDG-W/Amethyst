"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen = true,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.querySelector("#modal-root")!.classList.add(`-top-[${scrollY}px]`);
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.querySelector("#modal-root")!.classList.remove(`-top-[${scrollY}px]`);
      window.scrollTo(0, scrollY);
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!mounted || !document || !window || !isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-(--bg-overlay) px-9 py-15`}
      aria-hidden={isOpen}
    >
      {children}
    </div>,
    document.getElementById("modal-root") as Element,
  );
}
