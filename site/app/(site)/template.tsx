"use client";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }): React.ReactNode {
  useEffect(() => {
    (async () => {
      const mod = await import("animejs");
      const anime = ((mod as unknown as { default?: (p: Record<string, unknown>) => unknown }).default ??
        (mod as unknown as (p: Record<string, unknown>) => unknown)) as (p: Record<string, unknown>) => unknown;
      anime({ targets: "main", opacity: [0, 1], translateY: [8, 0], duration: 300, easing: "easeOutQuad" });
    })();
  }, []);
  return children;
}
