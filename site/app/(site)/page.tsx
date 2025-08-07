"use client";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Card, Chip } from "@/components/ui/Card";
import Reveal from "@/components/ux/Reveal";
import { getProfile } from "@/lib/data";

export default function HomePage() {
  const profile = getProfile();
  const counterRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    type AnimeFn = ((params: Record<string, unknown>) => unknown) & {
      stagger: (value: number) => unknown;
    };
    (async () => {
      const mod = await import("animejs");
      const anime = ((mod as unknown as { default?: AnimeFn }).default ??
        (mod as unknown as AnimeFn)) as AnimeFn;
      anime({
        targets: ".reveal",
        translateY: [8, 0],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
        delay: anime.stagger(60) as number,
      });
      const values = [128, 42, 12];
      values.forEach((val, idx) => {
        anime({
          targets: counterRef.current[idx] as unknown as Element,
          innerHTML: [0, val],
          round: 1,
          duration: 400,
          easing: "easeOutQuad",
          delay: 200 + idx * 120,
        });
      });
    })();
  }, []);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Reveal>
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{profile.name}</h1>
            <p className="text-lg opacity-80">{profile.tagline}</p>
            <div className="flex gap-3">
              <ButtonLink href="/resume.pdf">Resume</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact
              </ButtonLink>
            </div>
          </div>
          </Reveal>
          <Reveal delay={100}>
          <div className="grid grid-cols-3 gap-4 text-center">
            {["KPI A", "KPI B", "KPI C"].map((label, idx) => (
              <Card key={label} className="py-6">
                <div className="text-3xl font-semibold">
                  <span ref={(el) => { counterRef.current[idx] = el; }}>0</span>
                </div>
                <div className="text-xs opacity-70 mt-1">{label}</div>
              </Card>
            ))}
          </div>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {["Analytics", "Visualization", "Automation"].map((h) => (
            <Card key={h}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{h}</h3>
                <Chip>Focus</Chip>
              </div>
              <p className="text-sm opacity-80">Placeholder description</p>
            </Card>
          ))}
        </div>
        </Reveal>
      </section>
    </div>
  );
}
