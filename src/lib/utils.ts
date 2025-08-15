import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isPlainObject = (o: unknown): o is Record<string, unknown> =>
  o?.constructor === Object;
