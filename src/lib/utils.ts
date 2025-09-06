import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Ticket } from "@/types/ticket";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isPlainObject = (o: unknown): o is Record<string, unknown> =>
  o?.constructor === Object;

export const isoDay = (date: string | undefined | null): string | null => {
  if (!date) return null;
  return date.split("T")[0];
};

export const indexTicketsByIsoDate = (tickets: Ticket[]) => {
  const map = new Map<string, Ticket>();
  for (const t of tickets) {
    if (!t.date) continue;
    const iso = isoDay(t.date);
    if (iso) {
      map.set(iso, t);
    }
  }
  return map;
};
