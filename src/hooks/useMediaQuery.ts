import { useEffect, useState } from "react";

export function useMediaQuery(px: number, type: "min" | "max" = "max"): boolean {
  const query = type === "max" ? `(max-width: ${px}px)` : `(min-width: ${px}px)`;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
