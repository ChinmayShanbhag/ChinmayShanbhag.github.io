"use client";
import { useEffect, useRef } from "react";

export default function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (async () => {
            const mod = await import("animejs");
            const anime = ((mod as unknown as { default?: (p: Record<string, unknown>) => unknown }).default ??
              (mod as unknown as (p: Record<string, unknown>) => unknown)) as (p: Record<string, unknown>) => unknown;
            anime({ targets: entry.target, translateY: [8, 0], opacity: [0, 1], duration: 300, delay, easing: "easeOutQuad" });
          })();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
}

